/* eslint-disable react/no-unescaped-entities */
import {useState, useEffect, useRef, useCallback} from "react";
import {VscVerifiedFilled} from "react-icons/vsc";
import {useTranslation} from "react-i18next";
import {Dialog, DialogContent, DialogTitle} from "../../../components/ui/dialog";

interface CertificadoProps {
	setShowCertificado: (show: boolean) => void;
	selectedProfile?: {
		nome: string;
		Tarifa: number;
		// Add other necessary properties here
	};
}

const Certificado: React.FC<CertificadoProps> = ({setShowCertificado}) => {
	const [mostrarCertificado, setMostrarCertificado] = useState(true);
	const modalRef = useRef<HTMLDivElement>(null); // Referência para o modal
	const {t, i18n} = useTranslation();

	// Função para fechar o modal
	const fecharCertificado = useCallback(() => {
		setMostrarCertificado(false);
		setShowCertificado(false); // Resetar o estado showCertificado no componente Profile
	  }, [setShowCertificado]);

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
		  fecharCertificado();
		}
	  }, [fecharCertificado]); // Include dependencies
	  
	  useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside); // Add event listener
		return () => {
		  document.removeEventListener("mousedown", handleClickOutside); // Cleanup
		};
	  }, [handleClickOutside]); 

	// Usando useEffect para adicionar o evento de clique fora do modal
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside); // Adiciona o ouvinte de evento
		return () => {
			document.removeEventListener("mousedown", handleClickOutside); // Remove o ouvinte quando o componente desmontar
		};
	}, [handleClickOutside]);

	return (
		<>
			{mostrarCertificado && (
				<Dialog open={mostrarCertificado} onOpenChange={(open: any) => !open && fecharCertificado()}>
					<DialogContent className='max-w-md w-full'>
						{/* Header */}
						<div className='flex justify-between items-center mb-6'>
							<DialogTitle>{t("profile.certified_profile")}</DialogTitle>
						</div>

						{/* Separator */}
						<div className='border-t border-gray-700 mb-6'></div>

						{/* Certificado Badge */}
						<div className='flex items-center justify-center bg-green-600 py-2 px-4 rounded-lg mb-6'>
							<span className='text-white font-medium'>{t("profile.certified")}</span>
							<VscVerifiedFilled size={20} className='text-white ml-2' />
						</div>

						{/* Certificado Description */}
						<div className='text-gray-400'>
							<p className='mb-4'>
								{t("profile.certified_description_1", {
									team: <span className='text-pink-500 font-medium'>XGirl</span>,
								})}
							</p>
							<p className='mb-4'>{t("profile.certified_description_2")}</p>
							<p>
								<strong className='text-gray-200'>{t("profile.certified_satisfaction")}</strong>
							</p>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

export default Certificado;
