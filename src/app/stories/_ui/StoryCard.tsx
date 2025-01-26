/* eslint-disable @next/next/no-img-element */
import {FaMapMarkerAlt, FaFireAlt} from "react-icons/fa";
import {VscVerifiedFilled} from "react-icons/vsc";
import {useEffect, useState} from "react";

import {useDispatch} from "react-redux";
import {BiSolidMoviePlay} from "react-icons/bi";
import Image from "next/image";
import StoryBigS from "./storyBigS";

interface Profile {
	nome: string;
	cidade: string;
	photos: string[];
	stories: string[]; // Array de stories
	tag: string;
	tagtimestamp: string;
	certificado: boolean;
	firstPhotos: string;
}

interface StoryCardProps {
	profiles: Profile[];
}

const StoryCard: React.FC<StoryCardProps> = ({profiles}) => {
	const [timeElapsedList, setTimeElapsedList] = useState<string[]>([]);
	const [selectedStory, setSelectedStory] = useState<string | null>(null); // Estado para controlar a história selecionada
	const [showStoryModal, setShowStoryModal] = useState(false);
	const [selectedCidade, setSelectedCidade] = useState<string | null>(null); // Estado para controlar a história selecionada
	const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]); // Alterado para array de strings
	const [selectedNome, setSelectedNome] = useState<string[]>([]); // Alterado para array de strings
	const [selectedPhotoURL, setSelectedPhotoURL] = useState<string>(""); // Alterado para string única

	const dispatch = useDispatch();

	const formatTimeElapsed = (minutesElapsed: number): string => {
		const hoursElapsed = minutesElapsed / 60;

		if (hoursElapsed > 48) {
			return "Há mais de 48 horas";
		} else if (minutesElapsed < 60) {
			return `Há ${minutesElapsed} minuto${minutesElapsed !== 1 ? "s" : ""}`;
		} else {
			const hours = Math.floor(hoursElapsed);
			const minutes = minutesElapsed % 60;
			return `Há ${hours} hora${hours !== 1 ? "s" : ""}${minutes > 0 ? ` ${minutes} minuto${minutes !== 1 ? "s" : ""}` : ""}`;
		}
	};

	useEffect(() => {
		// Define calculateTimeElapsed inside useEffect to avoid dependency issue
		const calculateTimeElapsed = (tagTimestamp: string): string => {
			const timestampDate = new Date(tagTimestamp);
	
			if (isNaN(timestampDate.getTime())) {
				return "Tempo indeterminado";
			}
	
			const currentTime = Date.now();
			const elapsedTime = currentTime - timestampDate.getTime();
			const minutesElapsed = Math.floor(elapsedTime / (1000 * 60));
	
			return formatTimeElapsed(minutesElapsed);
		};
	
		const timeElapsed = profiles.map(profile => calculateTimeElapsed(profile.tagtimestamp));
		setTimeElapsedList(timeElapsed);
	
		const interval = setInterval(() => {
			const updatedTimeElapsed = profiles.map(profile => calculateTimeElapsed(profile.tagtimestamp));
			setTimeElapsedList(updatedTimeElapsed);
		}, 60000);
	
		return () => clearInterval(interval);
	}, [profiles]); 

	// Filtra perfis que possuem stories e mapeia cada story individualmente

	const profilesWithStories = profiles.filter(profile => profile.stories && profile.stories.length > 0);
	console.log("stories dos perfis", profilesWithStories);

	// Extrai a primeira foto de cada perfil
	const firstPhotos = profilesWithStories.map(profile => {
		return profile.photos && profile.photos.length > 0 ? profile.photos[0] : null;
	});

	console.log("Primeiras fotos dos perfis", firstPhotos);

	const handleCardClick = (story: string, profile: Profile) => {
		setSelectedStory(story);
		setShowStoryModal(true);
		setSelectedCidade(profile.cidade);
		setSelectedPhotos(profile.photos);
		setSelectedNome(profile.nome);
		setSelectedPhotoURL(profile.photos[0]); // Passe a primeira foto como string única
	};
	const closeStoryModal = () => {
		setSelectedStory(null);
		setShowStoryModal(false); // Fecha o modal
	};

	return (
		<div className='rounded-xl h-full'>
			{/* Renderiza o StoryBigS se showStoryModal estiver true */}
			{showStoryModal && (
				<StoryBigS story={selectedStory} onClose={closeStoryModal} firstPhotos={selectedPhotoURL} cidade={selectedCidade} nome={selectedNome} />
			)}
			<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-5 xxl:grid-cols- gap-2 md:gap-8 mt-10 pb-16 md:pb-16'>
				{profilesWithStories.map((profile, profileIndex) =>
					profile.stories.map((story, storyIndex) => (
						<button
							key={`${profileIndex}-${storyIndex}`}
							className='relative border border-zinc-800 rounded-2xl overflow-hidden shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl'
							onClick={() => handleCardClick(story, profile, profile.photos, firstPhotos)}
						>
							<div className='relative rounded-lg overflow-hidden h-full group'>
								{/* Banner de destaque no topo */}
								<div className='h-8 md:h-8 w-full bg-pink-800 flex justify-center items-center z-10 absolute top-0 left-0'>
									<div className='flex items-center'>
										<FaFireAlt className='text-yellow-500 mr-2' />
										<p className='text-sm text-white'>Story em destaque</p>
									</div>
								</div>

								{/* Vídeo com efeito de zoom no hover */}
								<div className='relative w-full h-full overflow-hidden'>
									<video
										src={story}
										alt='Thumbnail'
										className='w-full h-full object-cover border border-zinc-500 shadow-md transition-transform duration-500 ease-in-out transform group-hover:scale-110'
									/>
								</div>

								{/* Ícone de play centralizado com efeito de opacidade no hover */}
								<div className='absolute inset-0 flex items-center justify-center text-6xl transition-opacity duration-300 opacity-50 group-hover:opacity-80'>
									<BiSolidMoviePlay className='text-gray-800' />
								</div>

								{/* Nome do perfil, avatar e cidade com hover aprimorado */}
								<div className='absolute bottom-4 left-0 w-full px-4 flex items-center justify-between space-x-2 bg-gradient-to-t from-black/70 to-transparent py-2 group-hover:from-black/90'>
									{/* Avatar com efeito de hover */}
									<div className='w-12 h-12 rounded-full border-2 border-yellow-500 overflow-hidden cursor-pointer transform transition-transform hover:scale-110'>
										<Image
											src={profile.photos[0] || "/logo.webp"}
											alt='Avatar'
											className='w-full h-full object-cover'
											layout='responsive'
											width={100}
											height={100}
										/>
									</div>

									{/* Nome e ícone de verificação */}
									<div className='flex flex-col items-center justify-center text-white'>
										<p className='font-bold text-md md:text-lg flex items-center space-x-2'>
											{profile.nome}
											{profile.certificado && <VscVerifiedFilled className='text-green-400 ml-1' />}
										</p>
										{/* Cidade */}
										<p className='flex items-center text-pink-200 text-xs md:text-sm'>
											<FaMapMarkerAlt className='text-pink-800 mr-1' />
											{profile.cidade}
										</p>
									</div>
								</div>

								{/* Efeito de sobreposição no hover */}
								<div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
							</div>
						</button>
					))
				)}
			</div>
		</div>
	);
};

export default StoryCard;
