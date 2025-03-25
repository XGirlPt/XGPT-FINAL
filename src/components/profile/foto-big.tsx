/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import Image from 'next/image';

interface FotoBigProps {
  selectedProfile: { photos: string[] }; // Ajustado para 'photos'
  onClose: () => void;
  currentIndex: number;
}

const FotoBig: React.FC<FotoBigProps> = ({
  selectedProfile,
  onClose,
  currentIndex,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(currentIndex);
  const totalPhotos = selectedProfile?.photos.length;
  console.log('[FotoBig] totalPhotos:', totalPhotos);
  console.log('[FotoBig] selectedProfile.photos:', selectedProfile?.photos);
  console.log('[FotoBig] currentPhotoIndex:', currentPhotoIndex);

  const nextPhoto = () => {
    setCurrentPhotoIndex((currentPhotoIndex + 1) % totalPhotos);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((currentPhotoIndex - 1 + totalPhotos) % totalPhotos);
  };

  const isVideo = (url: string) => {
    return url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm') || url.toLowerCase().endsWith('.ogg');
  };

  const currentMedia = selectedProfile?.photos[currentPhotoIndex];

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50 backdrop-blur-md">
      <div className="relative w-full max-w-3xl h-[80vh]">
        {isVideo(currentMedia) ? (
          <video
            src={currentMedia}
            className="w-full h-full object-contain rounded-2xl"
            controls
            autoPlay
            muted
            loop
          />
        ) : (
          <Image
            src={currentMedia || '/logo.webp'}
            alt="Large Photo"
            className="w-full h-full object-contain rounded-2xl"
            width={900}
            height={600}
            layout="responsive"
            loading="lazy"
          />
        )}
      </div>
      <button className="text-bold font-bold" onClick={onClose}>
        <ImCross
          size={16}
          className="absolute top-0 right-10 mt-24 text-white text-xl hover:text-pink-700"
        />
      </button>
      {totalPhotos > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className="absolute top-1/2 px-4 py-2 rounded-full bg-zinc-500 left-0 ml-4 text-white hover:text-zinc-700 text-xxl transform -translate-y-1/2 opacity-65 hover:bg-zinc-300"
          >
            {'<'}
          </button>
          <button
            onClick={nextPhoto}
            className="absolute top-1/2 px-4 py-2 rounded-full bg-zinc-500 right-16 ml-4 text-white hover:text-zinc-700 text-xxl transform -translate-y-1/2 opacity-65 hover:bg-zinc-300"
          >
            {'>'}
          </button>
        </>
      )}
    </div>
  );
};

export default FotoBig;