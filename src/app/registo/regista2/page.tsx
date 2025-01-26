"use client";
import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import supabase from "@/database/supabase";

import {registerUser} from "@/actions/ProfileActions";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import FeaturesList from "./_ui/FeaturedList";
import ListRegister from "@/components/register/list-register";
import CommonInput from "@/components/ui/common-input";

const Registre2: React.FC = () => {
	const {t} = useTranslation();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [selectedOption, setSelectedOption] = useState<{
		id: number;
		name: string;
		unavailable: boolean;
	} | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const router = useRouter();
	const dispatch = useDispatch();

	const handleOptionSelect = (option: {id: number; name: string; unavailable: boolean}) => {
		setSelectedOption(option);
	}
	const handleRegister = async () => {
		if (password !== confirmPassword) {
			console.error("Les mots de passe ne correspondent pas");
			return;
		}

		try {
			const {data, error} = await supabase.auth.signUp({
				email,
				password,
			});
			setIsLoggedIn(true);

			if (error) {
				console.error("Erreur lors de l'inscription :", error.message);
			} else {
				console.log("Utilisateur enregistré avec succès :", data.user);
				console.log("ID de l'utilisateur enregistré avec succès :", data.user?.id);

				if (data?.user?.id) {
					dispatch(registerUser(data?.user?.id, email));
				}
				console.log("Email passé au Redux :", email);

				if (selectedOption) {
					switch (selectedOption.id) {
						case 1:
							await supabase.from("ProfilesData").insert([
								{
									userUID: data.user?.id,
									userData: data.user,
								},
							]);

							router.push(`/RegistoEntrada?email=${email}&userUID=${data.user?.id}`);
							break;

						case 2:
							await supabase.from("etablissements").insert([
								{
									userUID: data.user?.id,
									userData: data.user,
								},
							]);
							router.push(`/registre-etablissement?email=${email}&userUID=${data.user?.id}`);

							break;

						case 3:
							router.push("/registre-entrée");
							break;
						default:
							break;
					}
				}
			}
		} catch (error: any) {
			console.error("Erreur lors de l'inscription :", error.message);
		}
	};

	useEffect(() => {
		const checkSession = async () => {
			const session = await supabase.auth.getSession();
			if (!session) {
				router.push("/login");
			}
		};

		checkSession();
	}, [router]);

	return (
			<div className='pb-4 bg-gray-100 dark:bg-gray-900 rounded-md'>
				{/* <Header isLogged={isLoggedIn} /> */}
				<div className=' h-full  dark:bg-gray-900 justify-center md:flex'>
					{/* CÔTÉ GAUCHE */}
					<FeaturesList />

					{/* côté droit */}
					<div className='bg-gray-100 dark:bg-gray-800 mt-10 w-full max-w-lg mx-auto border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8'>
						<h1 className='text-2xl md:text-3xl font-extrabold text-center text-gray-500 dark:text-white mb-6'>{t("RegisterPage.create_account_title")}</h1>

						<form className='space-y-6'>
							<CommonInput
								label={t("RegisterPage.email_label")}
								placeholder={t("RegisterPage.email_placeholder")}
								value={email}
								onChange={e => setEmail(e.target.value)}
								type='email'
								required
							/>

							{/* Option supplémentaire */}
							<div>
								<ListRegister handleOptionSelect={handleOptionSelect} />
							</div>

							<CommonInput
								label={t("RegisterPage.password_label")}
								placeholder={t("RegisterPage.password_placeholder")}
								value={password}
								onChange={e => setPassword(e.target.value)}
								type='password'
								required
							/>

							<CommonInput
								label={t("RegisterPage.confirm_password_label")}
								placeholder={t("RegisterPage.confirm_password_placeholder")}
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								type='password'
								required
								className=""
							/>

							{/* Bouton Créer un compte */}
							<div className='mt-6'>
								<button
									type='button'
									onClick={handleRegister}
									className='w-full py-3 px-6 bg-pink-500 hover:bg-pink-400 text-white text-sm font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300'
								>
									{t("RegisterPage.register_button")}
								</button>
							</div>
						</form>
					</div>
				</div>
		</div>
	);
};

export default Registre2;
