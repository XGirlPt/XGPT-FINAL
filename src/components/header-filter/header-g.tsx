import {IoIosArrowRoundBack, IoIosArrowRoundForward} from "react-icons/io";
import {SetStateAction, Dispatch} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Profile} from "@/types";
import {useTranslation} from "react-i18next";

interface HeaderGProps {
	currentProfileIndex: number;
	setCurrentProfileIndex: Dispatch<SetStateAction<number>>;
	profiles: Profile[];
}

const HeaderG: React.FC<HeaderGProps> = ({currentProfileIndex, setCurrentProfileIndex, profiles}) => {
	const router = useRouter();
	const {t, i18n} = useTranslation();


	const handleDistrictClick = (district: string) => {
		router.push(`/escort?distrito=${encodeURIComponent(district)}`);
	};

	const handleNextProfile = () => {
		// Verifica se há um próximo perfil válido
		const nextIndex = (currentProfileIndex + 1) % profiles.length;
		const nextProfile = profiles[nextIndex];

		if (nextProfile) {
			setCurrentProfileIndex(nextIndex);
			router.push(`/escort/${nextProfile.nome}`);
		}
	};

	const handlePrevProfile = () => {
		// Verifica se há um perfil anterior válido
		const prevIndex = (currentProfileIndex - 1 + profiles.length) % profiles.length;
		const prevProfile = profiles[prevIndex];

		if (prevProfile) {
			setCurrentProfileIndex(prevIndex);
			router.push(`/escort/${prevProfile.nome}`);
		}
	};

	const currentProfile = profiles[currentProfileIndex];

	return (
		<div className='w-full fixed z-10 bg-gray-100/20 dark:bg-gray-800/40 backdrop-blur-sm'>
			<div className='flex justify-between items-center px-4 h-14 bg-gray-100/80 dark:bg-gray-700/70 backdrop-blur-md'>

				{/* Botão Perfil Anterior */}
				<button
					className='flex items-center px-4 py-1  border-pink-500 text-sm rounded-md text-white bg-pink-500 hover:bg-pink-900 hover:text-zinc-300 transition duration-300 ease-in-out transform'
					onClick={handlePrevProfile}
				>
					<IoIosArrowRoundBack size={20} className='mr-1' />
					<span className='hidden sm:inline'>{t('buttonHG.previous')}</span>
				</button>

				{/* Informações do Perfil */}
				{currentProfile && currentProfile.distrito && (
					<div className='flex items-center text-center text-sm space-x-2'>
						<p className='text-zinc-400'>Escort</p>
						<p className='text-zinc-400'>/</p>
						<Link href={`/escort?distrito=${encodeURIComponent(currentProfile.distrito)}`} className='text-zinc-400 cursor-pointer hover:text-pink-600'>
							{currentProfile.distrito}
						</Link>
						<p className='text-zinc-400'>/</p>
						<p className='text-pink-500 hover:text-pink-600 cursor-pointer'>{currentProfile.nome}</p>
					</div>
				)}

				{/* Botão Próximo Perfil */}
				<button
					className='flex items-center px-4 py-1 border border-pink-500 text-sm rounded-md text-white bg-pink-500 hover:bg-pink-600 hover:text-zinc-300 transition duration-300 ease-in-out transform'
					onClick={handleNextProfile}
				>
					<span className='hidden sm:inline'>{t('buttonHG.next')}</span>
					<IoIosArrowRoundForward size={20} className='ml-1' />
				</button>
			</div>
		</div>
	);
};

export default HeaderG;
