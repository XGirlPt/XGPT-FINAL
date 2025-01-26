import {useState, useEffect, useRef, useCallback} from "react";
import {FiPhone} from "react-icons/fi";
import {FaWhatsapp, FaMoneyBillWave} from "react-icons/fa";
import {useSelector} from "react-redux";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import {Dialog, DialogContent, DialogTitle} from "../ui/dialog";

interface LigaProps {
	selectedProfile: {
		nome: string;
		tarifa: number;
		lingua: string[];
		telefone: string;
	};
	setShowLiga: (show: boolean) => void;
}

const Liga: React.FC<LigaProps> = ({selectedProfile, setShowLiga}) => {
	const [mostrarLiga, setMostrarLiga] = useState(true);
	const modalRef = useRef<HTMLDivElement>(null); // Ref para o modal
	const {t, i18n} = useTranslation();

	const fecharLiga = useCallback(() => {
		setMostrarLiga(false);
		setShowLiga(false); // Resetar o estado showLiga no componente Profile
	}, [setShowLiga]);

	const obterBandeira = (lingua: string): string => {
		switch (lingua) {
			case "Russo":
				return "/Flags/ru.svg";
			case "Alemão":
				return "/Flags/ale.svg";
			case "Português":
				return "/Flags/pt.svg";
			case "Francês":
				return "/Flags/fr.svg";
			case "Inglês":
				return "/Flags/ing.svg";
			case "Italiano":
				return "/Flags/it.svg";
			case "Espanhol":
				return "/Flags/es.svg";
			case "Árabe":
				return "/Flags/ar.png";
			default:
				return ""; // Retorna uma imagem padrão caso não tenha bandeira específica
		}
	};

	const telefoneRedux = useSelector((state: any) => state.profile?.profile?.telefone);
	const linguaRedux = useSelector((state: any) => state.profile?.profile?.lingua);

	// Função para detectar clique fora do modal
	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			fecharLiga(); // Fecha o modal se clicar fora
		}
	}, [fecharLiga]); // No dependencies needed, as the function doesn't depend on any other state

	// Usando useEffect para adicionar o listener do clique fora
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]); 

	return (
		<>
			{mostrarLiga && (
				<Dialog open={mostrarLiga} onOpenChange={open => !open && fecharLiga()}>
					<DialogContent className='max-w-md w-full'>
						{/* Header */}
						<div className='flex justify-between items-center mb-6'>
							<DialogTitle>{t("profile.call_to", {nome: selectedProfile?.nome})} </DialogTitle>
						</div>

						{/* Separator */}
						<div className='border-t border-gray-700 mb-6'></div>

						{/* Contact Options */}
						<div className='flex flex-col gap-4'>
							{/* Phone */}
							<div className='bg-pink-500 hover:bg-pink-600 py-3 rounded-lg flex items-center justify-center transition-colors'>
								<FiPhone size={22} className='mr-2 text-white' />
								<span className='text-white font-medium'>{selectedProfile?.telefone}</span>
							</div>

							{/* WhatsApp */}
							<div
								className='bg-green-600 hover:bg-green-500 py-3 rounded-lg flex items-center justify-center cursor-pointer transition-colors'
								onClick={() => window.open(`https://api.whatsapp.com/send?phone=41${selectedProfile?.telefone}`, "_blank")}
							>
								<FaWhatsapp size={22} className='mr-2 text-white' />
								<span className='text-white font-medium'>WhatsApp</span>
							</div>
						</div>

						{/* Separator */}
						<div className='border-t border-gray-700 my-6'></div>

						{/* Tarifas */}
						<div className='flex items-center justify-center mb-6'>
							<FaMoneyBillWave size={28} className='text-pink-500 mr-3' />
							<p className='text-white text-lg font-medium'>{t("profile.tariffs_starting_from", {tarifa: selectedProfile?.tarifa})}</p>
						</div>

						{/* Separator */}
						<div className='border-t border-gray-700 mb-6'></div>

						{/* Bandeiras */}
						<div className='grid grid-cols-3 gap-4'>
							{linguaRedux &&
								linguaRedux.map((lingua: string, index: number) => (
									<div key={index} className='flex items-center justify-center space-x-3'>
										<Image
											src={obterBandeira(lingua) || "/logo.webp"}
											alt={`${lingua} flag`}
											width={36}
											height={36}
											className='rounded-full object-cover border border-gray-600'
										/>
										<span className='text-sm text-white'>{lingua}</span>
									</div>
								))}
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

export default Liga;
