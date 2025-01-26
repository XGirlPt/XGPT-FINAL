"use client";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateServico, updateLingua, updatePagamento, updateDescription, updateTarifa} from "@/actions/ProfileActions";

import FiltroTarifa from "@/components/filtros/filtro-tarifa";
import {updateProfileData} from "@/services/profileService";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Field, Label, Textarea} from "@headlessui/react";
import clsx from "clsx";
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import {FaSmile} from "react-icons/fa"; // Importa um ícone de emoji

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";

import CheckPagamento from "@/components/register/check-pagamento";
import CheckLinguas from "@/components/register/check-linguas";
import CheckServico from "@/components/register/check-servico";
import {Button} from "@/components/ui/button";

interface ModificarContactoProps {
	handleVoltar: () => void;
	onClose: () => void;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const ModificarContacto: React.FC<ModificarContactoProps> = ({handleVoltar, onClose, open, onOpenChange}) => {
	const dispatch = useDispatch();

	const userUID = useSelector((state: any) => state.profile?.profile?.userUID);
	const pagamentoRedux = useSelector((state: any) => state.profile?.profile?.pagamento);
	const linguaRedux = useSelector((state: any) => state.profile?.profile?.lingua);

	const tarifaRedux = useSelector((state: any) => state.profile?.profile?.tarifa);

	const servicoRedux = useSelector((state: any) => state.profile?.profile?.servico);
	const descriptionRedux = useSelector((state: any) => state.profile?.profile?.description);

	const [selectedPagamento, setSelectedPagamento] = useState<string[]>(pagamentoRedux || []);
	const [selectedLingua, setSelectedLingua] = useState<string[]>(linguaRedux || []);

	const [selectedTarifa, setSelectedTarifa] = useState<string[]>(tarifaRedux || []);

	const [selectedServico, setSelectedServico] = useState<string[]>(servicoRedux || []);
	const [description, setDescription] = useState<string>(descriptionRedux || "");
	const [editorState, setEditorState] = useState<string>("");

	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	useEffect(() => {
		if (pagamentoRedux) {
			setSelectedPagamento(pagamentoRedux);
		}
	}, [pagamentoRedux]);

	useEffect(() => {
		if (descriptionRedux) {
			setDescription(descriptionRedux);
		}
	}, [descriptionRedux]);

	useEffect(() => {
		if (linguaRedux) {
			setSelectedLingua(linguaRedux);
		}
	}, [linguaRedux]);

	useEffect(() => {
		if (servicoRedux) {
			setSelectedServico(servicoRedux);
		}
	}, [servicoRedux]);

	const handlePaymentChange = (updatedPagamento: string[]) => {
		dispatch(updatePagamento(updatedPagamento));
		setSelectedPagamento(updatedPagamento);
	};

	const handleDescriptionChange = (content: string) => {
		setDescription(content);
		dispatch(updateDescription(content));
	};

	const onEmojiClick = (emojiObject: EmojiClickData) => {
		setDescription(description + emojiObject.emoji);
	};

	const handleLinguaChange = (updatedLingua: string[]) => {
		dispatch(updateLingua(updatedLingua));
		setSelectedLingua(updatedLingua);
	};

	const handleTarifaChange = (updatedTarifa: string[]) => {
		dispatch(updateTarifa(updatedTarifa));
		setSelectedTarifa(updatedTarifa);
	};

	const handleServicoChange = (updatedServico: string[]) => {
		dispatch(updateServico(updatedServico));
		setSelectedServico(updatedServico);
	};

	const handleGuardar = async () => {
		const dataToUpdate = {
			pagamento: selectedPagamento.length > 0 ? selectedPagamento : null,
			lingua: selectedLingua.length > 0 ? selectedLingua : null,
			servico: selectedServico.length > 0 ? selectedServico : null,
			tarifa: selectedTarifa.length > 0 ? selectedTarifa : null,
			description: descriptionRedux || null,
		};
		console.log("Dados a serem atualizados:", dataToUpdate);

		try {
			const response = await updateProfileData(dataToUpdate, userUID);
			toast.success("Alteração efetuada com sucesso!", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			console.log("Resposta da base de dados:", response);
			dispatch(updatePagamento(selectedPagamento));
			dispatch(updateLingua(selectedLingua));
			dispatch(updateServico(selectedServico));
			dispatch(updateDescription(description));
			dispatch(updateTarifa(selectedTarifa));

			console.log("Informações de contato atualizadas com sucesso na base de dados!");
		} catch (error: any) {
			console.error("Erro ao atualizar perfil na base de dados:" + error);
			toast.error("Erro ao atualizar perfil na base de dados: " + error, {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			
			<DialogContent className='max-w-4xl w-full  h-2/3 md:h-4/5 sm:max-h-[80vh] p-0  overflow-hidden'>
				<DialogHeader className='bg-pink-800 py-6 px-4 md:px-10'>
					<DialogTitle className='text-xl md:text-3xl font-bold tracking-wide text-center'>Dados Gerais</DialogTitle>
					<p className='text-center text-gray-200 text- md:text-sm mt-2'>Altere os seus dados sempre que quiser</p>
				</DialogHeader>
				<div className='p-8 space-y-8 overflow-y-auto '>
					<div className='grid grid-cols-1 lg:grid-cols-1 gap-8'>
						<div className='w-44 mb-6'>
							<FiltroTarifa />
						</div>

						<div className='w-full mt-2'>
							<p className='text-lg text-pink-800 font-semibold mb-2'>Meios de Pagamento</p>
							<CheckPagamento />
						</div>

						<div className='w-full mt-4'>
							<p className='text-lg text-pink-800 font-semibold mb-2'>Línguas</p>
							<CheckLinguas />
						</div>

						<div className='w-full mt-4'>
							<p className='text-lg text-pink-800 font-semibold mb-2'>Serviços</p>
							<CheckServico selectedServico={selectedServico} setSelectedServico={setSelectedServico} />
						</div>

						<div className='w-full mt-6 relative'>
							<Field>
								<Label className='text-lg text-pink-800 font-semibold mb-2'>Descrição</Label>

								<div className='relative'>
									<Textarea
										name='description'
										value={description}
										onChange={e => handleDescriptionChange(e.target.value)}
										className={clsx(
											"w-full h-32 p-4 pr-10 border rounded-lg",
											"data-[hover]:shadow-lg data-[focus]:bg-gray-300",
											"focus:outline-none focus:ring-2 focus:ring-pink-800 text-gray-700"
										)}
										placeholder='Escreva a descrição aqui...'
									/>

									{/* Ícone de Emoji dentro da área de texto */}
									<FaSmile className='absolute top-4 right-4 text-pink-600 cursor-pointer' onClick={() => setShowEmojiPicker(prev => !prev)} size={24} />

									{/* Picker de Emoji */}
									{showEmojiPicker && (
										<div className='absolute bottom-full right-0 mb-2 z-50'>
											<EmojiPicker onEmojiClick={onEmojiClick} />
										</div>
									)}
								</div>
							</Field>
						</div>
					</div>
				</div>
				<DialogFooter className='bg-gray-800 border-t border-gray-700 p-4'>
					<div className='flex justify-between w-full'>
						<Button variant='voltar' onClick={handleVoltar}>
							Voltar
						</Button>

						<Button variant='guarder' onClick={handleGuardar}>
							Guardar
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ModificarContacto;
