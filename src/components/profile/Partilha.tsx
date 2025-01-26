import {useState, useEffect, useRef, useCallback} from "react";
import {MdEmail, MdContentCopy} from "react-icons/md";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useTranslation} from "react-i18next";
import {Dialog, DialogContent, DialogTitle} from "../ui/dialog";

interface PartilhaProps {
	selectedProfile: {
		nome: string;
		Tarifa: number;
		email: string;
	};
	setShowPartilha: (show: boolean) => void;
}

const Partilha: React.FC<PartilhaProps> = ({selectedProfile, setShowPartilha}) => {
	const [mostrarPartilha, setMostrarPartilha] = useState(true);
	const modalRef = useRef<HTMLDivElement>(null); // Referência para o modal
	const [copySuccess, setCopySuccess] = useState(false); // Estado para verificar se o link foi copiado com sucesso
	const {t, i18n} = useTranslation();

	// Função para fechar o modal
	const fecharPartilha = useCallback(() => {
		setMostrarPartilha(false);
		setShowPartilha(false); // Resetar o estado showPartilha no componente Profile
	}, [setShowPartilha]);

	// Função para copiar o link
	const copyToClipboard = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopySuccess(true); // Definir como verdadeiro quando o link for copiado
		toast.success("O link foi copiado com sucesso!", {
			position: "top-right",
			autoClose: 3000, // Tempo em milissegundos para o toast desaparecer
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
	};

	// Fechar o modal se clicar fora dele
	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			fecharPartilha();
		}
	}, [fecharPartilha]);

	// Usando useEffect para adicionar o evento de clique fora do modal
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside); // Adiciona o ouvinte de evento
		return () => {
			document.removeEventListener("mousedown", handleClickOutside); // Remove o ouvinte quando o componente desmontar
		};
	}, [handleClickOutside]);



	return (
		<>
			<ToastContainer />
			{mostrarPartilha && (
				<Dialog open={mostrarPartilha} onOpenChange={open => !open && fecharPartilha()}>
					<DialogContent className='max-w-md w-full'>
						{/* Header */}
						<div className='flex justify-between items-center mb-6'>
							<DialogTitle>{t("profile.share_profile_of", {nome: selectedProfile?.nome})}</DialogTitle>
						</div>

						{/* Separator */}
						<div className='border-t border-gray-700 mb-6'></div>

						{/* URL Display */}
						<div className='flex justify-center my-6'>
							<p className='text-white text-sm break-words'>{window.location.href}</p>
						</div>

						{/* Separator */}
						<div className='border-t border-gray-700 my-6'></div>

						{/* Share Options */}
						<div className='flex flex-col gap-4'>
							{/* Email Sharing */}
							<div className='bg-blue-600 hover:bg-blue-500 py-3 rounded-lg flex items-center justify-center cursor-pointer transition-colors'>
								<a href={`mailto:${selectedProfile?.email}?subject=Assunto do Email&body=Corpo do Email`} className='flex items-center'>
									<MdEmail size={22} className='mr-2 text-white' />
									<span className='text-white font-medium'>{t("profile.share_by_email")}</span>
								</a>
							</div>

							{/* Copy Link */}
							<div
								className='bg-pink-700 hover:bg-pink-600 py-3 rounded-lg flex items-center justify-center cursor-pointer transition-colors'
								onClick={copyToClipboard}
							>
								<MdContentCopy size={22} className='mr-2 text-white' />
								<span className='text-white font-medium'>{t("profile.copy_link")}</span>
							</div>

							{/* Copy Success Message */}
							{copySuccess && (
								<div className='flex justify-center mt-2'>
									<span className='text-green-500 text-sm'>{t("profile.link_copied")}</span>
								</div>
							)}
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

export default Partilha;
