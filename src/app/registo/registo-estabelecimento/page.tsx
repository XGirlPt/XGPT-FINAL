"use client";
import {useState, useEffect, ChangeEvent} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import supabase from "@/database/supabase";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ListCategoriaBar from "@/components/register/list-categoria-bar";
import FiltroPrice from "@/components/filtros/filtro-tarifa";
import FiltroDistrito from "@/components/filtros/filtro-distrito";
import {updateClubsNome, updateClubsTelefone} from "@/actions/ClubsActions";

const RegistoEstabelecimento: React.FC = () => {
	const [clubEmail, setClubEmail] = useState<string>("");
	const dispatch = useDispatch();

	const nomeRedux = useSelector((state: any) => state.clubs.nome);
	const telefoneRedux = useSelector((state: any) => state.clubs.telefone);
	const userUIDRedux = useSelector((state: any) => state.clubs.userUID);
	const emailRedux = useSelector((state: any) => state.clubs.email);

	useEffect(() => {
		const getSession = async () => {
			const {
				data: {session},
				error,
			} = await supabase.auth.getSession();
			if (error || !session) {
				console.log("Sessão não iniciada ou erro ao verificar a sessão:", error);
			} else {
				console.log("Sessão iniciada:", session);
				console.log("Usuário:", session.user);
			}
		};

		getSession();
	}, []);

	const handleNomeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const novoNome = event.target.value;
		dispatch(updateClubsNome(novoNome));
	};

	const clubEmailRedux = useSelector((state: any) => state.clubs.email);
	console.log("email clubs Redux", clubEmailRedux);

	const handleTelefoneChange = (event: ChangeEvent<HTMLInputElement>) => {
		const novoTelefone = event.target.value;
		dispatch(updateClubsTelefone(novoTelefone));
	};

	const handleSubmit = async () => {
		try {
			const userData = {
				email: clubEmail,
				nome: nomeRedux,
				telefone: telefoneRedux,
			};

			if (userUIDRedux) {
				const {data, error} = await supabase.from("estabelecimentos").insert([
					{
						userUID: userUIDRedux,
						email: emailRedux,
						nome: userData.nome,
						telefone: userData.telefone,
					},
				]);

				if (error) {
					console.error("Erro ao inserir dados:", error.message);
				} else {
					console.log("Dados inseridos com sucesso:", data);
				}
			} else {
				console.error("userUIDRedux está indefinido. Não é possível inserir dados sem userUID.");
			}
		} catch (error: any) {
			console.error("Erro ao processar dados do usuário:", error.message);
		}
	};

	return (
		<div className='text-gray-600 bg-[#1b1b1b]'>
			<div className='h-full bg-[#1b1b1b] px-44'>
				<div className='w-full pt-2 mb-2'>
					<p className='text-pink-800 text-xl mt-36 pb-0 px-6'>Cria o teu Perfil de Anunciante</p>
				</div>

				<div className='bg-[#1E2427] w-full h-12 mb-2 mt-4 border border-zinc-600 flex rounded-sm'>
					<div className='flex justify-around w-full mx-6 items-center'>
						<div className='flex border-b-2 border-pink-800 pt-3'>
							<p className='rounded-full border border-pink-800 mr-2 px-2 mb-2 text-pink-800'>1</p>
							<p className='mb-2 text-pink-800'>Perfil</p>
						</div>

						<div className='flex border-zinc-500 pt-3'>
							<p className='rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500'>2</p>
							<p className='text-zinc-500'>Contacto</p>
						</div>

						<div className='flex border-zinc-500 pt-3'>
							<p className='rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500'>3</p>
							<p className='mb-2 text-zinc-500'>Fotos</p>
						</div>

						<div className='flex border-zinc-500 pt-3'>
							<p className='rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500'>4</p>
							<p className='mb-2 text-zinc-500'>Mensalidade</p>
						</div>
					</div>
				</div>

				<div className='bg-[#1E2427] w-full h-full mb-10 mt-0 border border-zinc-600 rounded-sm'>
					<div className='flex justify-between w-full gap-4'>
						<div className='flex flex-col w-1/2 mx-6 pt-4'>
							<div className='w-full mt-0'>
								<p className='text-pink-800'>Nome*</p>
								<input className='py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm' onChange={handleNomeChange} value={nomeRedux} />
							</div>
							<div className='w-full mt-2'>
								<FiltroDistrito />
							</div>
							<div className='w-full mt-2'>
								<p className='text-pink-800'>Telefone</p>
								<input className='py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm' onChange={handleTelefoneChange} value={telefoneRedux} />
							</div>
						</div>
						<div className='flex flex-col w-1/2 mx-6 pt-4'>
							<div className='w-full mt-2'>
								<ListCategoriaBar />
							</div>
							<div className='w-full mt-2'></div>
							<div className='w-full mt-2'>
								<p className='text-pink-800'>Site</p>
								<input className='py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm' />
							</div>
							<div className='w-full mt-2'>
								<FiltroPrice />
							</div>
						</div>
					</div>

					<div className='flex justify-between w-full mb-6 mt-10 my-10 py-6 px-10'>
						<div className='w-26 mb-6'>
							<Link
								href={{
									pathname: "/register2",
									query: {email: clubEmailRedux, nome: nomeRedux},
								}}
							>
								<p className='text-md text-white bg-zinc-400 px-10 py-2 rounded-md cursor-pointer'>Voltar</p>
							</Link>
						</div>
						<Link href='/'>
							<p
								className='text-md text-white bg-pink-800 px-10 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-600 ease-in-out transform hover:scale-105'
								onClick={handleSubmit}
							>
								Registar
							</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegistoEstabelecimento;
