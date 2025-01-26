"use client";
import {useState, useEffect} from "react";
import supabase from "@/database/supabase";
import {IoTrashBin} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {updatePhotos} from "@/actions/ProfileActions";
import Link from "next/link";
import {BlurImage} from "@/components/ui/blur-image";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface ModificarFotosProps {
	handleVoltar: () => void;
	onClose: () => void;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const ModificarFotos: React.FC<ModificarFotosProps> = ({handleVoltar, open, onClose, onOpenChange}) => {
	const dispatch = useDispatch();
	const photoURLsRedux = useSelector((state: any) => state.profile?.profile.photos);
	console.log("fotos redux", photoURLsRedux);

	const userUID = useSelector((state: any) => state.profile?.profile.userUID);

	// Função de upload de fotos
	async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.files && event.target.files.length > 0) {
			const files = Array.from(event.target.files);
			const selected = files.slice(0, 10); // Limitar o número de fotos a 10
			const uploadedPhotoURLs: string[] = [];
	
			const uploadPromises = selected.map(async (file) => {
				const filePath = `${userUID}/${file.name.toLowerCase().replace(/ /g, "_").replace(/\./g, "_")}`;
	
				console.log("filePath", filePath);
				try {
					// Enviar o arquivo diretamente ao Supabase sem usar FileReader
					const { data, error } = await supabase.storage.from("profileFoto").upload(filePath, file);
	
					if (error) {
						console.error("Erro ao fazer upload:", error.message);
						throw new Error(error.message);
					}
	
					// Gerar a URL pública após o upload
					const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
					uploadedPhotoURLs.push(publicURLFoto);
	
					console.log("Foto enviada com sucesso:", publicURLFoto);
				} catch (error: any) {
					console.error("Erro durante o upload:", error.message);
				}
			});
	
			await Promise.all(uploadPromises);
	
			// Verifique se as URLs das fotos foram corretamente armazenadas
			if (uploadedPhotoURLs.length > 0) {
				// Inserir URLs das fotos na tabela profilephoto
				const photoInsertionsProfile = uploadedPhotoURLs.map((photoURL) => ({
					userUID,
					imageurl: photoURL,
				}));
	
				try {
					const { data: photoData, error: photoError } = await supabase.from("profilephoto").insert(photoInsertionsProfile);
	
					if (photoError) {
						console.error("Erro ao inserir URLs das fotos na tabela profilephoto:", photoError.message);
						throw new Error(photoError.message);
					}
	
					console.log("URLs das fotos inseridas com sucesso na tabela profilephoto:", photoData);
	
					// Atualizar o Redux com as novas URLs de fotos
					const newPhotoURLs = [...photoURLsRedux, ...uploadedPhotoURLs];
					dispatch(updatePhotos(newPhotoURLs));  // Atualizar o estado do Redux
				} catch (error: any) {
					console.error("Erro ao inserir URLs na tabela:", error.message);
				}
			} else {
				console.error("Nenhuma URL de foto foi gerada.");
			}
		} else {
			console.error("Nenhum arquivo foi selecionado.");
		}
	}
	

	// Função para excluir foto
	const handleDeletePhoto = async (index: number) => {
		try {
			const updatedPhotosArray = [...photoURLsRedux];

			// Verificar se a foto existe no índice especificado
			if (updatedPhotosArray[index]) {
				const photoURLToDelete = updatedPhotosArray[index];
				const fileName = photoURLToDelete.split("/").pop(); // Extrai o nome do arquivo da URL

				if (!fileName) {
					throw new Error("Nome do arquivo não encontrado no URL.");
				}

				const filePath = `${userUID}/${fileName}`; // Usa o fileName para construir o filePath

				console.log("Tentando deletar do storage com filePath:", filePath);

				// Remover a foto do storage da Supabase
				const {error: storageError} = await supabase.storage.from("profileFoto").remove([filePath]);

				if (storageError) {
					console.error("Erro ao deletar do storage:", storageError.message);
					throw new Error("Erro ao remover foto do storage: " + storageError.message);
				}

				console.log("Foto deletada do storage com sucesso:", fileName);

				// Remover a foto do banco de dados
				const {error: dbError} = await supabase.from("profilephoto").delete().match({imageurl: photoURLToDelete, userUID});

				if (dbError) {
					console.error("Erro ao deletar do banco de dados:", dbError.message);
					throw new Error("Erro ao remover foto da tabela: " + dbError.message);
				}

				console.log("Foto deletada da tabela com sucesso:", photoURLToDelete);

				// Atualizar o estado do Redux com as fotos restantes
				updatedPhotosArray.splice(index, 1);
				dispatch(updatePhotos(updatedPhotosArray));

				console.log("Foto excluída com sucesso do storage e da tabela:", photoURLToDelete);
			} else {
				console.error("A foto não existe no índice especificado.");
			}
		} catch (error: any) {
			console.error("Erro ao excluir foto:", error.message);
		}
	};

	// Função para guardar alterações
	const handleGuardar = () => {
		try {
			// Simula operação de sucesso
			console.log("stories guardadas com sucesso!");

			// Exibe toast de sucesso
			toast.success("Alteração efetuada com sucesso!", {
				position: "top-right",
				autoClose: 1000,
				theme: "light",
			});
		} catch (error) {
			// Em caso de erro, exibe toast de erro
			toast.error("Erro ao guardar as alterações!", {
				position: "top-right",
				autoClose: 3000,
				theme: "light",
			});
			console.error("Erro ao guardar as alterações:", error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='max-w-4xl h-2/3 md:h-4/5 sm:max-h-[80vh] p-0 overflow-hidden'>
				<DialogHeader className='bg-pink-800 py-6'>
					<DialogTitle className='text-3xl font-bold tracking-wide text-center'>Gerir Fotos</DialogTitle>
					<h2 className='text-center text-gray-200 text- md:text-sm mt-2'>Pode adicionar até 10 fotos</h2>
					<ToastContainer />
				</DialogHeader>

				<div className='p-8 space-y-8 overflow-y-auto '>
					<div className='flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4'>
						{/* Botão para adicionar fotos */}
						<label
							htmlFor='upload-photo'
							className='flex items-center justify-center px-6 py-3 bg-green-500 text-white text-sm md:text-base font-medium rounded-full shadow-md hover:bg-green-400 hover:shadow-lg transition duration-300 cursor-pointer'
						>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' className='w-5 h-5 mr-2'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
							</svg>
							<span>Adicionar Fotos</span>
							<input type='file' id='upload-photo' style={{display: "none"}} onChange={handleFileUpload} multiple />
						</label>

						{/* Botão para regras */}
						<Link
							href=''
							className='flex items-center justify-center px-6 py-3 bg-gray-600 text-white text-sm md:text-base font-medium rounded-full shadow-md hover:bg-gray-500 hover:shadow-lg transition duration-300'
						>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' className='w-5 h-5 mr-2'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 6.75h10.5m-10.5 5.25h6.75m-6.75 5.25h10.5' />
							</svg>
							<span>Regras</span>
						</Link>
					</div>

					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
					{Array.isArray(photoURLsRedux) &&
    photoURLsRedux.map((photoURL: string, index: number) => (
        <div key={index} className='relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105'>
            <IoTrashBin
                size={26}
                className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer text-white bg-red-600 rounded-full p-1 transition-opacity duration-300'
                onClick={() => handleDeletePhoto(index)}
            />
            <BlurImage src={photoURL} alt={`Foto ${index}`} className='w-full h-32 object-cover rounded-lg border border-gray-600' />
        </div>
    ))}
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

export default ModificarFotos;
