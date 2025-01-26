/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";

interface Profile {
	nome: string;
	photos: string[];
}

interface CaroselRoundProps {
	profiles: Profile[];
}

// Função para embaralhar um array
const shuffleArray = (array: Profile[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
	}
	return array;
};

const CaroselRound: React.FC<CaroselRoundProps> = ({profiles}) => {
	// Embaralhar perfis
	const profilesToDisplay = shuffleArray([...profiles]);

	return (
		<div className='flex mx-4 md:mx-28 flex-wrap justify-center gap-4 mt-4 mb-4'>
			{/* Exibir 5 avatares em telas pequenas */}
			<div className='sm:flex md:hidden flex gap-4'>
				{profilesToDisplay.slice(0, 5).map((profile, index) => (
					<Link key={index} href={`/escort/${profile.nome}`} passHref>
						<div className='relative flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105'>
							<div className='relative w-12 md:w-24 h-12 md:h-24 rounded-full overflow-hidden border-2 border-pink-800 transition duration-300 ease-in-out'>
								{profile.photos && profile.photos.length > 0 ? (
									<Image
										src={profile.photos[0] || "/logo.webp"}
										alt={profile.nome}
										className='w-full h-full object-cover rounded-full border-2 border-white'
										loading='lazy'
										width={100}
										height={100}
									/>
								) : (
									<div className='w-full h-full bg-gray-300 rounded-full'></div>
								)}
								<div className='absolute inset-0 hover:bg-pink-800 hover:opacity-40 duration-300'></div>
							</div>
							<p className='text-white text-xs mt-2 whitespace-nowrap'>{profile.nome}</p>
						</div>
					</Link>
				))}
			</div>

			{/* Exibir 10 avatares em telas médias ou grandes */}
			<div className='hidden md:flex'>
				{profilesToDisplay.slice(0, 10).map((profile, index) => (
					<Link key={index} href={`/escort/${profile.nome}`} passHref>
						<div className='relative flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105'>
							<div className='relative w-12 md:w-24 h-12 md:h-24 rounded-full  mx-2 overflow-hidden border-2 border-pink-800 transition duration-300 ease-in-out'>
								{profile.photos && profile.photos.length > 0 ? (
									<Image
										src={profile.photos[0] || "/logo.webp"}
										alt={profile.nome}
										className='w-full h-full object-cover rounded-full border-2 border-white '
										loading='lazy'
										width={100}
										height={100}
									/>
								) : (
									<div className='w-full h-full bg-gray-300 rounded-full'></div>
								)}
								<div className='absolute inset-0 hover:bg-pink-800 hover:opacity-40 duration-300'></div>
							</div>
							<p className='text-white text-xs mt-2 whitespace-nowrap'>{profile.nome}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default CaroselRound;
