"use client";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {FaMapMarkerAlt, FaUser, FaCamera} from "react-icons/fa";
import supabase from "@/database/supabase";
import ModificarPerfil from "./_ui/ModificarPerfil";
import ModificarContacto from "./_ui/ModificarContacto";
import ModificarFotos from "./_ui/ModificarFotos";
import ModificarStories from "./_ui/ModificarStories";
import {useDispatch} from "react-redux";
import {updateTag} from "@/actions/ProfileActions";
import Definicoes from "./_ui/Definicoes";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarConta from "./_ui/BarConta";
import { BlurImage } from "@/components/ui/blur-image";

interface MinhaContaProps {}

const MinhaConta: React.FC<MinhaContaProps> = () => {
	const [showModificar, setShowModificar] = useState(false);
	const [showContacto, setShowContacto] = useState(false);
	const [showFotos, setShowFotos] = useState(false);
	const [showStories, setShowStories] = useState(false);
	const [showNotification, setShowNotification] = useState(true);

	const [notificationVisible, setNotificationVisible] = useState(true);
	const [BarOpen, setBarOpen] = useState(false);
	const [newTag, setNewTag] = useState<string>("");
	const [certificado, setCertificado] = useState<boolean | null>(null); // Guardar o estado do certificado

	const emailRedux = useSelector((state: any) => state.profile?.user?.user?.email);
	const tagRedux = useSelector((state: any) => state.profile?.profile?.tag);
	const cidadeRedux = useSelector((state: any) => state.profile?.profile?.cidade);
	const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);
	const photoURLsRedux = useSelector((state: any) => state.profile?.profile?.photos);
	const vphotoURLsRedux = useSelector((state: any) => state.profile?.profile?.vphotos);

	const dispatch = useDispatch(); // Instanciar o dispatch

	const [nome, setNome] = useState<string | undefined>(nomeRedux);

	useEffect(() => {
		setNome(nomeRedux);
	}, [nomeRedux]);

	const handleVoltar = () => {
		setShowModificar(false);
		setShowContacto(false);
		setShowFotos(false);
		setShowStories(false);
	};

	const [activeContent, setActiveContent] = useState("minhaConta");

	// New function to handle updating the tag
	const handleAtualizarEstado = async () => {
		const {
			data: {session},
			error: sessionError,
		} = await supabase.auth.getSession();
		if (sessionError || !session) {
			console.error("Erro ao obter sessão:", sessionError);
			return;
		}

		const userUID = session.user.id; // Use o ID do usuário da sessão
		console.log("userId:", userUID); // Verifique se isso é o que você espera

		const {data, error} = await supabase
			.from("ProfilesData") // Certifique-se de que 'profiles' é o nome correto da sua tabela
			.update({tag: newTag}) // Atualiza a coluna 'tag' com o novo valor
			.eq("userUID", userUID);

		if (error) {
			console.error("Erro ao atualizar o estado:", error.message || error);
		} else {
			console.log("Estado atualizado com sucesso:", data);
			dispatch(updateTag(newTag)); // Atualizar a tag no Redux

			setNewTag(""); // Limpa o campo após a atualização
			toast.success("Nova tag foi alterada com sucesso!");
		}
	};

	useEffect(() => {
		const fetchCertificado = async () => {
		  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
		  if (sessionError || !session) {
			console.error("Erro ao obter sessão:", sessionError);
			return;
		  }
	  
		  const userUID = session.user.id;
		  const { data, error } = await supabase
			.from("ProfilesData")
			.select("certificado")
			.eq("userUID", userUID)
			.single();
	  
		  if (error) {
			console.error("Erro ao buscar certificado:", error.message);
			return;
		  }
	  
		  if (data?.certificado !== certificado) { // Apenas atualize se o valor mudou
			setCertificado(data.certificado);
		  }
		};
	  
		fetchCertificado();
	  }, [certificado]); 

	// Função para determinar a cor e mensagem da notificação com base no valor de "certificado"
	const renderNotification = () => {
		if (!showNotification) return null; // Não renderiza nada se a notificação não estiver visível

		if (certificado === true) {
			return (
				<div className='bg-green-600 text-white px-4 py-3 flex justify-between items-center'>
					<span>✅ O teu perfil está certificado.</span>
					<button
						onClick={() => {
							setCertificado(false); // Altera o estado do certificado
							setShowNotification(false); // Esconde a notificação
						}}
						className='text-lg'
					>
						&times;
					</button>
				</div>
			);
		} else if (certificado === null) {
			return (
				<div className='bg-yellow-600 text-white px-4 py-3 flex justify-between items-center'>
					<span>⚠️ O teu perfil aguarda verificação da nossa equipa.</span>
					<button
						onClick={() => {
							setShowNotification(false); // Esconde a notificação
						}}
						className='text-lg'
					>
						&times;
					</button>
				</div>
			);
		} else if (certificado === false) {
			return (
				<div className='bg-red-600 text-white px-4 py-3 flex justify-between items-center'>
					<span>❌ O teu perfil não está certificado. Clica Aqui para adicionar uma foto de verificação para certificar o teu perfil.</span>
					<button
						onClick={() => {
							setShowNotification(false); // Esconde a notificação
						}}
						className='text-lg'
					>
						&times;
					</button>
				</div>
			);
		}

		return null;
	};

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

	console.log("vphotoURLsRedux", vphotoURLsRedux);
	console.log("photoURLsRedux", photoURLsRedux);

	return (
		<div className='bg-gray-900 text-gray-100 min-h-screen flex flex-col'>
			<ToastContainer />
			{/* Notification Bar */}
			{renderNotification()}

			<div className='flex flex-grow'>
				{/* Sidebar */}
				<BarConta
					BarOpen={BarOpen}
					handleModificar={() => setShowModificar(true)}
					showModificar={showModificar}
					handleContacto={() => setShowContacto(true)}
					showContacto={showContacto}
					handleFotos={() => setShowFotos(true)}
					showFotos={showFotos}
					handleVerPerfil={() => {}}
					handleStories={() => setShowStories(true)}
					showStories={showStories}
				/>

				{/* Main Content */}
				<main className={`flex-1 pb-10 transition-all duration-300 ${BarOpen ? "ml-64" : ""}`} style={{marginTop: "80px"}}>
					{activeContent === "definicoes" ? (
						<Definicoes />
					) : (
						<div className='flex flex-col items-center space-y-6'>
							{/* Profile Header */}
							<div className='w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg p-6'>
								<div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6'>
									<div className='relative w-32 h-32'>
										{photoURLsRedux?.length > 0 ? (
											<BlurImage src={photoURLsRedux[0]} alt={`Foto de ${nomeRedux}`} className='w-full h-full rounded-full object-cover shadow-lg' />
										) : (
											<div className='w-full h-full rounded-full bg-gray-700 flex items-center justify-center'>
												<FaUser className='text-5xl text-gray-400' />
											</div>
										)}
										<button
											className='absolute bottom-2 right-2 bg-pink-600 text-white p-2 rounded-full shadow-md hover:bg-pink-700 transition-colors'
											aria-label='Alterar foto de perfil'
										>
											<FaCamera />
										</button>
									</div>
									<div className='text-center md:text-left'>
										<h1 className='text-3xl font-bold text-gray-200'>{nomeRedux}</h1>
										<p className='flex items-center justify-center md:justify-start text-pink-500 mt-2'>
											<FaMapMarkerAlt className='mr-2' />
											{cidadeRedux}
										</p>
										<p className='text-gray-400 mt-1'>{tagRedux}</p>
										<p className='text-gray-300 mt-2'>Visualizações do perfil: 1212</p>
									</div>
								</div>
							</div>

							{/* Status Update */}
							<div className='w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg p-6 space-y-6'>
								<div>
									<h2 className='text-xl font-semibold text-gray-200 mb-4'>Estado Atual</h2>
									<p className='text-gray-400 mb-4'>{tagRedux || "Sem estado definido"}</p>
								</div>

								<div>
									<h2 className='text-xl font-semibold text-gray-200 mb-4'>Atualiza o teu Estado</h2>
									<div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
										<input
											type='text'
											className='flex-1 p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500'
											value={newTag}
											onChange={e => setNewTag(e.target.value)}
											placeholder='Escreva o novo estado'
										/>
										<button onClick={handleAtualizarEstado} className='px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md transition-colors'>
											Atualizar Estado
										</button>
									</div>
									<p className='text-green-400 mt-4'>Tag atualizada com sucesso!</p>
								</div>
							</div>

							{/* Action Panels */}
							<div className='w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg p-6'>
								{/* {showModificar && <ModificarPerfil handleVoltar={handleVoltar} onOpen={() => setShowModificar(true)} onClose={() => setShowModificar(false)} />}

								{showContacto && <ModificarContacto handleVoltar={handleVoltar} onOpen={() => setShowModificar(true)} onClose={() => setShowContacto(false)} />}

								{showFotos && (
									// <div className='space-y-4'>
									<ModificarFotos handleVoltar={handleVoltar} onOpen={() => setShowModificar(true)} onClose={() => setShowFotos(false)} />
									// 	<div className='flex justify-center gap-4'>
									// 		<button className='px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md transition-colors'>Visualizar Fotos</button>
									// 		<button className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors'>Remover Fotos</button>
									// 	</div>
									// </div>
								)}

								{showStories && <ModificarStories handleVoltar={handleVoltar} onOpen={() => setShowModificar(true)} onClose={() => setShowStories(false)} />} */}
								{showModificar && (
									<ModificarPerfil handleVoltar={handleVoltar} open={showModificar} onClose={() => setShowModificar(false)} onOpenChange={setShowModificar} />
								)}

								{showContacto && (
									<ModificarContacto handleVoltar={handleVoltar} open={showContacto} onClose={() => setShowContacto(false)} onOpenChange={setShowContacto} />
								)}

								{showFotos && (
									<div className='space-y-4'>
										<ModificarFotos handleVoltar={handleVoltar} open={showFotos} onClose={() => setShowFotos(false)} onOpenChange={setShowFotos} />
										<div className='flex justify-center gap-4'>
											<button className='px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md transition-colors'>Visualizar Fotos</button>
											<button className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors'>Remover Fotos</button>
										</div>
									</div>
								)}

								{showStories && (
									<ModificarStories
										handleVoltar={handleVoltar}
										open={showStories}
										onClose={() => setShowStories(false)}
										onOpenChange={setShowStories}
										storyURLs={[]} // Add any story URLs here if needed
									/>
								)}
								{!showModificar && !showContacto && !showFotos && !showStories && (
									<div className='text-center text-gray-400'>Selecione uma opção no menu para modificar as suas informações.</div>
								)}
							</div>
						</div>
					)}
				</main>
			</div>
		</div>
	);
};

export default MinhaConta;
