/* eslint-disable @next/next/no-img-element */
import React from "react";
import {ImCross} from "react-icons/im";
import {useDispatch} from "react-redux";
import {useState} from "react";
import Image from "next/image";

interface Profile {
	nome: string;
	cidade: string;
	photos: string[]; // Array de fotos
	stories: string[]; // Array de stories
	tag: string;
	tagtimestamp: string;
}

interface StoryBigSProps {
	story: string | null;
	cidade: string | null;
	photos: string | null; // Array de fotos
	nome: string | null;
	onClose: () => void;
	profiles: Profile[];
	firstPhotos: string;
}

const StoryBigS: React.FC<StoryBigSProps> = ({cidade, story, firstPhotos, nome, onClose}) => {
	const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
	const dispatch = useDispatch();

	// Função para verificar se a URL é de vídeo ou imagem
	const isVideo = (url?: string) => {
		return url ? url.match(/\.(mp4|webm|ogg|mov)$/i) : false;
	};

	// Logs para depuração
	// console.log("src", story);
	// console.log("cidade", cidade);
	// console.log("photos", photos);
	// console.log("nome", nome);
	console.log("photos bigS", firstPhotos);

	return (
		<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50 backdrop-blur-md'>
			<div className='flex'>
				{/* Exibe a imagem do avatar no canto superior */}
				<div className='absolute top-4 left-4 w-16 h-16 rounded-full border-2 border-yellow-500 overflow-hidden cursor-pointer'>
					<Image
						src={firstPhotos || "/logo.webp"}
						alt='Avatar'
						className='w-full h-16 transition duration-500 ease-in-out transform hover:scale-110 hover:opacity-60 object-cover'
						layout='responsive'
						width={100}
						height={100}
					/>
				</div>

				{/* Nome e cidade e nome ao lado da imagem do avatar */}
				<div className='absolute top-4 left-20 flex flex-col justify-center ml-3'>
					<span className='text-white font-bold'>{nome || "Nome Indisponível"}</span>
					<span className='text-gray-300'>{cidade || "Cidade Indisponível"}</span>
				</div>

				{/* Botão para o perfil */}
			</div>

			<div className='relative'>
				<video
					src={story || ""}
					controls
					autoPlay
					muted
					crossOrigin='anonymous'
					onLoadedData={() => console.log("Vídeo carregado com sucesso")}
					onError={e => console.log("Erro ao carregar o vídeo", e)}
					className='max-w-[80vw] max-h-[80vh] transition-opacity duration-900 ease-in-out rounded-2xl'
				/>
				{/* Botão fixo dentro do vídeo */}
				{/* <button className="absolute bottom-24 right-2 transform -translate-x-1/2 bg-pink-800 text-white font-bold py-2 px-4 rounded">
          Ver Perfil
        </button> */}
			</div>

			<button className='text-bold font-bold' onClick={onClose}>
				<ImCross size={16} className='absolute top-0 right-10 mt-10 text-white text-2xl hover:text-pink-800' />
			</button>
		</div>
	);
};

export default StoryBigS;
