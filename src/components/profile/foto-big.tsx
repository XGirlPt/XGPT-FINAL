/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import { ImCross } from 'react-icons/im';

interface FotoBigProps {
  selectedProfile: { 
    photos: string[];
    nome?: string; // Opcional para consistência com outros modais
    cidade?: string; // Opcional
  };
  onClose: () => void;
  currentIndex: number;
}

const FotoBig: React.FC<FotoBigProps> = ({
  selectedProfile,
  onClose,
  currentIndex,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(currentIndex);
  const totalPhotos = selectedProfile?.photos?.length || 0;

  console.log('[FotoBig] totalPhotos:', totalPhotos);
  console.log('[FotoBig] selectedProfile.photos:', selectedProfile.photos);
  console.log('[FotoBig] currentPhotoIndex:', currentPhotoIndex);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % totalPhotos);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + totalPhotos) % totalPhotos);
  };

  const isVideo = (url: string) => {
    return url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm') || url.toLowerCase().endsWith('.ogg');
  };

  const currentMedia = selectedProfile?.photos[currentPhotoIndex];

  if (!currentMedia) {
    console.error('[FotoBig] Nenhuma mídia disponível para o índice:', currentPhotoIndex);
    return (
      <motion.div
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-white">Erro: Nenhuma foto ou vídeo disponível</div>
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-white z-50 p-2 bg-black/50 rounded-full hover:bg-black/70"
        >
          <ImCross size={16} />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-[90%] max-h-[90vh] flex items-center justify-center">
        {isVideo(currentMedia) ? (
          <motion.video
            src={currentMedia}
            className="max-w-full max-h-[90vh] rounded-lg object-contain"
            controls
            autoPlay
            muted
            loop
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={currentMedia || '/logo.webp'}
              alt="Large Photo"
              width={1200} // Aumentado para maior qualidade
              height={800}
              className="max-w-full max-h-[90vh] rounded-lg object-contain"
              priority={true} // Carrega mais rápido no modal
            />
          </motion.div>
        )}
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-white z-50 p-2 bg-black/50 rounded-full hover:bg-black/70"
      >
        <ImCross size={16} />
      </button>

      {totalPhotos > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className="absolute top-1/2 left-4 px-4 py-2 rounded-full bg-zinc-500 text-white hover:bg-zinc-300 hover:text-zinc-700 transform -translate-y-1/2 opacity-75 transition-all duration-200"
          >
            {'<'}
          </button>
          <button
            onClick={nextPhoto}
            className="absolute top-1/2 right-4 px-4 py-2 rounded-full bg-zinc-500 text-white hover:bg-zinc-300 hover:text-zinc-700 transform -translate-y-1/2 opacity-75 transition-all duration-200"
          >
            {'>'}
          </button>
        </>
      )}
    </motion.div>
  );
};

export default FotoBig;