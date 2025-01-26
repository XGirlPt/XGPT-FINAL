/* eslint-disable @next/next/no-img-element */
import {Profile} from "@/types";
import Link from "next/link";
import {FaMapMarkerAlt} from "react-icons/fa";
import {VscVerifiedFilled} from "react-icons/vsc";
import Image from "next/image";

interface CardsGirlProps {
	profiles: Profile[];
}

const CardsGirl: React.FC<CardsGirlProps> = ({profiles}) => {
	console.log("Perfis recebidos:", profiles);

	const shuffledProfiles = profiles.sort(() => Math.random() - 0.5);

	return (
		<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xxl:grid-cols-6 gap-8 mt-10 pb-16 w-full'>
			{shuffledProfiles.map((profile, index) => (
				<Link key={index} href={`/escort/${profile.nome}`} passHref>
					<div className='relative border border-zinc-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 bg-pink-200 hover:bg-pink-800 hover:opacity-50 blur-50'>
						<Image
							src={profile.photos[0] || "/logo.webp"}
							alt={profile.nome}
							className='w-full h-96 object-cover rounded-md blur-2xl'
							width={100}
							height={100}
						/>
						<p className='flex items-center absolute bottom-0 lefd-1/2 transform -translate-x-1/2 pb-2 text-white text-md px-2 rounded'>
							<FaMapMarkerAlt className='text-pink-800 mr-2' />
							{profile.cidade}
						</p>
						<p className='absolute bottom-7 left-1/2 transform -translate-x-1/2 pb-2 text-white font-bold text-xl px-2 rounded whitespace-nowrap flex items-center'>
							{profile.nome}
							<VscVerifiedFilled className='text-green-400 ml-2' />
						</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default CardsGirl;
