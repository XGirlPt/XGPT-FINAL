/* eslint-disable @next/next/no-img-element */
import React, {useState} from "react";
import {ImCross} from "react-icons/im";
import Image from "next/image";

interface Profile {
	photoURL: string[];
}

interface FotoBigProps {
	selectedProfile: Profile;
	onClose: () => void;
	currentIndex: number;
}

const FotoBig: React.FC<FotoBigProps> = ({selectedProfile, onClose, currentIndex}) => {
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(currentIndex);
	const totalPhotos = selectedProfile?.photoURL.length;
	console.log("totalPhotos", totalPhotos);

	const nextPhoto = () => {
		setCurrentPhotoIndex((currentPhotoIndex + 1) % totalPhotos);
	};

	const prevPhoto = () => {
		setCurrentPhotoIndex((currentPhotoIndex - 1 + totalPhotos) % totalPhotos);
	};

	console.log("selectedProfile", selectedProfile?.photoURL);

	console.log("currentPhotoIndex", currentPhotoIndex);

	return (
		<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50 backdrop-blur-md'>
			<div className='relative'>
				<Image
					src={`${selectedProfile?.photoURL[currentPhotoIndex] || "/logo.webp"}`}
					alt='Large Photo'
					className='max-w-[80vw] max-h-[80vh] bg-gray-800 transition-opacity duration-900 ease-in-out rounded-2xl blur-2xl'
					loading='lazy'
					layout='responsive'
					width={100}
					height={100}
				/>
			</div>
			<button className='text-bold font-bold' onClick={onClose}>
				<ImCross size={16} className='absolute top-0 right-10 mt-24 text-white text-xl hover:text-pink-700' />
			</button>
			<button
				onClick={prevPhoto}
				className='absolute top-1/2 px-4 py-2 rounded-full bg-zinc-500 left-0 ml-4 text-white hover:text-zinc-700 text-xxl transform -translate-y-1/2 opacity-65 hover:bg-zinc-300'
			>
				&lt;
			</button>
			<button
				onClick={nextPhoto}
				className='absolute top-1/2 px-4 py-2 rounded-full bg-zinc-500 right-16 ml-4 text-white hover:text-zinc-700 text-xxl transform -translate-y-1/2 opacity-65 hover:bg-zinc-300'
			>
				&gt;
			</button>
		</div>
	);
};

export default FotoBig;
