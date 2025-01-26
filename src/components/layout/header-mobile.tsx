"use client";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../actions/ProfileActions";
import {faHome, faUsers, faSignInAlt, faUserCircle, faCogs, faSearch} from "@fortawesome/free-solid-svg-icons";
import {BiSolidMoviePlay, BiSolidMessageSquareAdd} from "react-icons/bi";
import {FaUserEdit, FaPhotoVideo, FaInfoCircle} from "react-icons/fa";
import ModificarFotos from "@/app/minha-conta/_ui/ModificarFotos";
import ModificarStories from "@/app/minha-conta/_ui/ModificarStories";
import ModificarPerfil from "@/app/minha-conta/_ui/ModificarPerfil";
import ModificarContacto from "@/app/minha-conta/_ui/ModificarContacto";
import ModalAtualizarTagProps from "@/components/layout/modal-atualizar-tag";
import SearchModal from "@/components/ui/search-modal";
import {FaEnvelope, FaKey, FaCreditCard, FaUserCog} from "react-icons/fa";
import MobileModal from "../ui/mobile-modal";

const HeaderMobile: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [menuOpen, setMenuOpen] = useState(false);
	const [accountMenuOpen, setAccountMenuOpen] = useState(false);

	const emailReduxProfile = useSelector((state: any) => state.profile?.profile?.email);
	const photoUID = useSelector((state: any) => state.profile?.profile?.photos?.[0]);
	const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);

	const [showModifyPhoto, setShowModifyPhoto] = useState(false);
	const [showModifyStory, setShowModifyStory] = useState(false);
	const [showModifyPerfil, setShowModifyPerfil] = useState(false);
	const [showModifyContacto, setShowModifyContacto] = useState(false);
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // Controla o modal de busca
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newTag, setNewTag] = useState("");
	const [searchQuery, setSearchQuery] = useState(""); // Adicione este estado ao HeaderMobile
	const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
	const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Novo estado para modal de senha

	const toggleEmailModal = () => {
		setIsEmailModalOpen(prev => !prev);
	};

	const togglePasswordModal = () => {
		setIsPasswordModalOpen(prev => !prev); // Lógica para abrir/fechar o modal de senha
	};

	const toggleSettingsMenu = () => {
		setSettingsMenuOpen(prev => !prev);
	};

	const handleAlterarEmailClick = () => {
		console.log("Alterar Email");
		// Sua lógica aqui
	};

	const handleAlterarPasswordClick = () => {
		console.log("Alterar Palavra Passe");
		// Sua lógica aqui
	};

	const handleSubscricaoClick = () => {
		console.log("Subscrição");
		// Sua lógica aqui
	};

	const handleContaClick = () => {
		console.log("Conta");
		// Sua lógica aqui
	};

	const toggleAccountMenu = () => {
		setAccountMenuOpen(!accountMenuOpen);
	};

	const handleLoginLogout = () => {
		if (emailReduxProfile) {
			dispatch(logout());
			localStorage.removeItem("email");
			localStorage.removeItem("authToken");
			localStorage.removeItem("userUID");
			router.push("/");
		} else {
			router.push("/login");
		}
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
		setAccountMenuOpen(false);
	};

	const handleAlterarFotoClick = () => {
		closeMenu();
		setShowModifyPhoto(true);
	};

	const handleAlterarStoryClick = () => {
		closeMenu();
		setShowModifyStory(true);
	};

	const handleAlterarPerfilClick = () => {
		closeMenu();
		setShowModifyPerfil(true);
	};

	const handleAlterarContactoClick = () => {
		closeMenu();
		setShowModifyContacto(true);
	};

	const handleVoltarFoto = () => {
		setShowModifyPhoto(false);
	};

	const handleVoltarStory = () => {
		setShowModifyStory(false);
	};

	const handleVoltarPerfil = () => {
		setShowModifyPerfil(false);
	};

	const handleVoltarContacto = () => {
		setShowModifyContacto(false);
	};

	const handleSaveTag = (tag: string) => {
		console.log("Nova tag salva:", tag);
		setNewTag(tag);
	};

	return (
		<>
			{/* Banda preta com o logo e avatar no topo */}

			<div className='fixed top-0 left-0 w-full z-50 bg-black opacity-70 flex items-center justify-between h-24 shadow-md px-4 transition-all duration-300'>
			{/* Logo no lado esquerdo */}
  <div className='flex items-center'>
    <Link href='/' aria-label='Ir para a página inicial'>
      <Image
        src='/logo.webp'
        alt='Logo'
        width={160}
        height={160}
        priority
        className='object-contain'
      />
    </Link>
  </div>


				<div className='absolute left-1/2 transform -translate-x-1/2'>
					<Link href='/' aria-label='Ir para a página inicial'>
						<Image src='/logo.webp' alt='Logo' width={150} height={150} priority className='object-contain' />
					</Link>
				</div>
			</div>

			<div className='h-24'></div>

			{/* Renderização Condicional dos Componentes */}
			{showModifyPhoto && <ModificarFotos handleVoltar={handleVoltarFoto} />}
			{showModifyStory && <ModificarStories handleVoltar={handleVoltarStory} />}
			{showModifyPerfil && <ModificarPerfil handleVoltar={handleVoltarPerfil} />}
			{showModifyContacto && <ModificarContacto handleVoltar={handleVoltarContacto} />}
			{/* Menu fixo na parte inferior */}
			<div className='block md:hidden fixed bottom-0 left-0 w-full bg-pink-800 opacity-90 text-white shadow-lg z-50'>
				<div className='flex justify-around items-center h-16'>
					{/* Ícone Home */}
					<Link href='/' aria-label='Ir para Home'>
						<div className='flex flex-col items-center'>
							<FontAwesomeIcon icon={faHome} className='text-xl' />
							<span className='text-xs'></span>
						</div>
					</Link>

					{/* Ícone Acompanhantes */}
					<Link href='/escort' aria-label='Ver Acompanhantes'>
						<div className='flex flex-col items-center'>
							<FontAwesomeIcon icon={faUsers} className='text-xl' />
							<span className='text-xs'></span>
						</div>
					</Link>

					{emailReduxProfile ? (
						<>
							{/* Ícone Add State */}
							<div className='flex flex-col items-center'>
								<button onClick={() => setIsModalOpen(true)} aria-label='Alterar Estado' className='flex flex-col items-center focus:outline-none'>
									<BiSolidMessageSquareAdd className='text-xl' />
								</button>
							</div>

							{/* Ícone Add Stories */}
							<div className='flex flex-col items-center'>
								<button onClick={() => console.log("Adicionar Story")} aria-label='Adicionar Stories' className='flex flex-col items-center focus:outline-none'>
									<BiSolidMoviePlay className='text-xl' />
								</button>
							</div>
						</>
					) : (
						<>
							{/* Ícone Login (aparece apenas se deslogado) */}
							<div className='flex flex-col items-center'>
								<button onClick={handleLoginLogout} aria-label='Login' className='flex flex-col items-center focus:outline-none'>
									<FontAwesomeIcon icon={faSignInAlt} className='text-xl' />
									<span className='text-xs'>Login</span>
								</button>
							</div>

							{/* Ícone Stories (deslogado) */}
							<Link href='/stories' aria-label='Ver Stories'>
								<div className='flex flex-col items-center'>
									<BiSolidMoviePlay className='text-xl' />
									<span className='text-xs'></span>
								</div>
							</Link>
						</>
					)}

					{/* Ícone Procurar */}
					<div className='flex flex-col items-center'>
						<button onClick={() => setIsSearchModalOpen(true)} aria-label='Abrir Busca' className='flex flex-col items-center focus:outline-none'>
							<FontAwesomeIcon icon={faSearch} className='text-xl' />
						</button>
					</div>
				</div>

				{/* Modal "Alterar Estado" */}
				{isModalOpen && <ModalAtualizarTagProps isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveTag} />}

				<MobileModal isOpen={isPasswordModalOpen} onClose={togglePasswordModal} modalType='password' />

				<MobileModal isOpen={isEmailModalOpen} onClose={toggleEmailModal} modalType='email' />

				{/* Modal de busca */}
				{isSearchModalOpen && (
					<SearchModal
						isOpen={isSearchModalOpen}
						onClose={() => setIsSearchModalOpen(false)}
						searchQuery={searchQuery} // Passe a query
						setSearchQuery={setSearchQuery} // Passe a função para atualizar
					/>
				)}
			</div>

			{/* Menu lateral móvel */}
			{menuOpen && (
				<>
					<div className='fixed inset-0 bg-black bg-opacity-50 z-50' onClick={closeMenu}></div>
					<div className='fixed top-0 left-0 w-2/3 h-full bg-gray-800 text-white z-50 shadow-lg'>
						<div className='flex items-center bg-pink-800 py-6 px-4'>
							<div className='w-16 h-16 rounded-full overflow-hidden border-4 border-white mr-4'>
								{photoUID ? (
									<Image src={photoUID || "/logo.webp"} alt='User Avatar' className='w-full h-full object-cover' width={64} height={64} />
								) : (
									<div className='w-full h-full bg-gray-400'></div>
								)}
							</div>
							<div>
								<p className='text-lg font-bold'>{nomeRedux || "Usuário"}</p>
								<p className='text-sm text-gray-200'>{emailReduxProfile}</p>
							</div>
						</div>

						<div className='mt-6 space-y-4 px-4'>
							{/* A Minha Conta */}
							<div className='relative'>
								<button className='flex items-center text-lg hover:bg-pink-800 py-3 px-4 rounded-lg w-full text-left' onClick={toggleAccountMenu}>
									<FontAwesomeIcon icon={faUserCircle} className='mr-3' />A Minha Conta
								</button>
								{accountMenuOpen && (
									<div className='absolute ml-4 top-full pb-4 gap-12 left-0 mt-2 bg-pink-800 rounded-lg shadow-lg z-50'>
										<button className='flex px-10 py-6 text-white hover:bg-pink-700' onClick={handleAlterarPerfilClick}>
											<FaInfoCircle className='mr-2' />
											Dados Basicos
										</button>

										<button className='flex px-10 py-6 text-white hover:bg-pink-700' onClick={handleAlterarContactoClick}>
											<FaInfoCircle className='mr-2' />
											Dados Gerais
										</button>

										<button className='flex px-10 py-6 text-white hover:bg-pink-700' onClick={handleAlterarFotoClick}>
											<FaPhotoVideo className='mr-2' />
											Alterar Foto
										</button>
										<button className='flex px-10 py-6 text-white hover:bg-pink-700' onClick={handleAlterarStoryClick}>
											<FaUserEdit className='mr-2' />
											Alterar Story
										</button>
									</div>
								)}
							</div>

							{/* Definições */}
							<div className='relative'>
								<button className='flex items-center text-lg hover:bg-pink-800 py-3 px-4 rounded-lg w-full text-left' onClick={toggleSettingsMenu}>
									<FontAwesomeIcon icon={faCogs} className='mr-3' />
									Definições
								</button>
								{settingsMenuOpen && (
									<div className='absolute ml-4 top-full pb-4 gap-12 left-0 mt-2 bg-pink-800 rounded-lg shadow-lg z-50'>
										<button
											className='flex px-10 py-6 text-white hover:bg-pink-700'
											onClick={toggleEmailModal} // Use diretamente o toggle
										>
											<FaEnvelope className='mr-2' />
											Email
										</button>

										<button className='flex px-10 py-6 text-white hover:bg-pink-700' onClick={togglePasswordModal}>
											<FaKey className='mr-2' />
											Palavra Passe
										</button>

										<button className='flex px-10 py-6 text-white hover:bg-pink-700' onClick={handleSubscricaoClick}>
											<FaCreditCard className='mr-2' />
											Subscrição
										</button>
										<button className='flex px-10 py-6 text-white hover:bg-pink-700' onClick={handleContaClick}>
											<FaUserCog className='mr-2' />
											Conta
										</button>
									</div>
								)}
							</div>

							<button
								onClick={() => {
									handleLoginLogout();
									closeMenu();
								}}
								className='flex items-center text-lg hover:bg-pink-800 py-3 px-4 rounded-lg w-full text-left'
							>
								<FontAwesomeIcon icon={faSignInAlt} className='mr-3' />
								Logout
							</button>
						</div>
						<MobileModal isOpen={isEmailModalOpen} onClose={toggleEmailModal} />
					</div>
				</>
			)}
		</>
	);
};

export default HeaderMobile;
