"use client";

import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {FaInfoCircle, FaUser, FaCamera, FaCog, FaEye, FaVideo} from "react-icons/fa";
import Image from "next/image";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation"; // Importar useRouter

interface BarContaProps {
	handleModificar: () => void;
	showModificar: boolean;
	handleContacto: () => void;
	showContacto: boolean;
	handleFotos: () => void;
	showFotos: boolean;
	handleStories: () => void;
	showStories: boolean;
	handleDefinicoes: () => void;
	showDefinicoes: boolean;
}

const BarConta: React.FC<BarContaProps> = ({
	handleModificar,
	showModificar,
	handleContacto,
	showContacto,
	handleFotos,
	showFotos,
	handleStories,
	showStories,
}) => {
	const router = useRouter(); // Inicializar useRouter
	const userUID = useSelector((state: any) => state.profile?.profile.userUID); // Capturar UID do usuário
	console.log("user uid", userUID);
	const nomeRedux = useSelector((state: any) => state.profile?.profile.nome);

	const handleVerPerfil = () => {
		// Redirecionar para a página de perfil
		router.push(`/escort/${nomeRedux}`);
	};

	const {t, i18n} = useTranslation();

	return (
		<aside className='bg-gray-800 px-6 mt-10 w-72 shadow-xl flex flex-col'>
			<div className='flex justify-center mb-14'>
				<Image src='/photos/logo1.png' alt='logo' width={160} height={0} className='w-40 h-auto object-contain' />
			</div>

			<nav className='space-y-4'>
				<button
					onClick={handleModificar}
					className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${
						showModificar ? "bg-pink-500" : "bg-gray-800"
					}`}
				>
					<FaInfoCircle className='text-2xl' />
					<span className='ml-4 hidden lg:block'>{t("MyProfileBar.info")}</span>
				</button>

				<button
					onClick={handleContacto}
					className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${
						showContacto ? "bg-pink-500" : "bg-gray-800"
					}`}
				>
					<FaUser className='text-2xl' />
					<span className='ml-4 hidden lg:block'> {t("MyProfileBar.other_info")}</span>
				</button>

				<button
					onClick={handleFotos}
					className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${
						showFotos ? "bg-pink-500" : "bg-gray-800"
					}`}
				>
					<FaCamera className='text-2xl' />
					<span className='ml-4 hidden lg:block'>{t("MyProfileBar.change_photos")}</span>
				</button>

				<button
					onClick={handleStories}
					className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${
						showStories ? "bg-pink-500" : "bg-gray-800"
					}`}
				>
					<FaVideo className='text-2xl' />
					<span className='ml-4 hidden lg:block'>{t("MyProfileBar.my_stories")}</span>
				</button>

				<button className='flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg bg-gray-800'>
					<FaCog className='text-2xl' />
					<span className='ml-4 hidden lg:block'>{t("MyProfileBar.settings")}</span>
				</button>

				{/* Botão para ver o perfil */}
				<button
					onClick={handleVerPerfil} // Redireciona para a página do perfil
					className='flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg bg-gray-800'
				>
					<FaEye className='text-2xl' />
					<span className='ml-4 hidden lg:block'>{t("MyProfileBar.view_profile")}</span>
				</button>
			</nav>
		</aside>
	);
};

export default BarConta;
