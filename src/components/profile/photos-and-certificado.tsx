import {useState} from "react";
import Image from "next/image";
import {VscVerifiedFilled} from "react-icons/vsc";
import {IoInformationCircle} from "react-icons/io5";

import {useTranslation} from "react-i18next";
import {BlurImage} from "../ui/blur-image";
import React from 'react';

import { motion } from 'framer-motion';


interface PhotosAndCertificadoProps {
	selectedProfile: any;
	loading: boolean;
	isCertified: boolean | null;
	handleCertificadoClick: () => void;
	handlePhotoClick: (index: number) => void;
}

const PhotosAndCertificado: React.FC<PhotosAndCertificadoProps> = ({selectedProfile, loading, isCertified, handleCertificadoClick, handlePhotoClick}) => {
	const {t, i18n} = useTranslation();
	return (
		<motion.div 
		  initial={{ opacity: 0 }}
		  animate={{ opacity: 1 }}
		  transition={{ duration: 0.5 }}
		  className="bg-white dark:bg-gray-800 w-full rounded-xl shadow-lg overflow-hidden"
		>
		  {/* Header Section */}
		  <div className="p-6 border-b dark:border-gray-700">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
			  <h2 className="text-2xl font-bold bg-pink-500 bg-clip-text text-transparent">
				{t("profile.photos_of", {name: selectedProfile?.nome})}
			  </h2>
	
			  {/* Certification Badge */}
			  {loading || isCertified === null ? (
				<div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse">
				  <span className="text-gray-500 dark:text-gray-400">{t("profile.loading")}</span>
				</div>
			  ) : (
				<motion.button
				  whileHover={{ scale: 1.02 }}
				  whileTap={{ scale: 0.98 }}
				  onClick={handleCertificadoClick}
				  className={`
					px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-300
					${isCertified 
					  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
					  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'}
					text-white shadow-lg
				  `}
				>
				  <span className="text-sm font-medium">
					{isCertified ? t("profile.certified") : t("profile.not_certified")}
				  </span>
				  {isCertified ? (
					<VscVerifiedFilled className="w-5 h-5" />
				  ) : (
					<IoInformationCircle className="w-5 h-5" />
				  )}
				</motion.button>
			  )}
			</div>
		  </div>
	
		  {/* Gallery Grid */}
		  <div className="p-6">
			{selectedProfile && selectedProfile.photoURL && selectedProfile.photoURL.length > 0 ? (
			  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{selectedProfile.photoURL.map((media: string, index: number) => {
				  const isVideo = media.endsWith(".mp4") || media.endsWith(".mov") || media.endsWith(".webm");
	
				  return (
					<motion.div
					  key={index}
					  whileHover={{ scale: 1.02 }}
					  className="relative group rounded-xl overflow-hidden shadow-md"
					>
					  {isVideo ? (
						<video
						  autoPlay
						  controlsList="nodownload"
						  className="w-full h-64 object-cover"
						>
						  <source 
							src={media} 
							type={media.endsWith(".mp4") 
							  ? "video/mp4" 
							  : media.endsWith(".webm") 
								? "video/webm" 
								: "video/ogg"
							} 
						  />
						  {t("profile.video_not_supported")}
						</video>
					  ) : (
						<>
						  <Image
							src={media}
							alt={`${selectedProfile.nome} - Photo ${index + 1}`}
							className="w-full h-54 object-cover transition-transform duration-300 group-hover:scale-105"
							onClick={() => handlePhotoClick(index)}
							loading="lazy"
							width={150}
							height={150}
						  />
						  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<div className="absolute bottom-0 left-0 right-0 p-4">
							  <p className="text-white text-sm">
								{t("profile.click_to_expand")}
							  </p>
							</div>
						  </div>
						</>
					  )}
					</motion.div>
				  );
				})}
			  </div>
			) : (
			  <div className="relative rounded-xl overflow-hidden">
				<Image
				  src={selectedProfile?.photoURL?.[0] || "/logo.webp"}
				  alt={selectedProfile?.nome || "Placeholder"}
				  className="w-full h-96 object-cover"
				  loading="lazy"
				  width={150}
				  height={150}

				/>
				<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
				  <p className="text-white text-lg">
					{t("profile.no_photos_available")}
				  </p>
				</div>
			  </div>
			)}
		  </div>
		</motion.div>
	  );
	};

export default PhotosAndCertificado;
