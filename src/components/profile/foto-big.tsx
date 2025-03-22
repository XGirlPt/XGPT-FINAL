/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import Image from 'next/image';

// Interface ajustada para refletir a propriedade correta 'photos'
interface Profile {
  photos: string[]; // Alterado de photoURL para photos
}

interface FotoBigProps {
  selectedProfile: Profile | null; // Permitir null para lidar com carregamento
  onClose: () => void;
  currentIndex: number;
}

const FotoBig: React.FC<FotoBigProps> = ({
  selectedProfile,
  onClose,
  currentIndex,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(currentIndex);
  const totalPhotos = selectedProfile?.photos?.length || 0; // Proteção contra undefined
  console.log('totalPhotos', totalPhotos);
  console.log('selectedProfile.photos', selectedProfile?.photos);
  console.log('currentPhotoIndex', currentPhotoIndex);

  const nextPhoto = () => {
    if (totalPhotos > 0) {
      setCurrentPhotoIndex((currentPhotoIndex + 1) % totalPhotos);
    }
  };

  const prevPhoto = () => {
    if (totalPhotos > 0) {
      setCurrentPhotoIndex((currentPhotoIndex - 1 + totalPhotos) % totalPhotos);
    }
  };

  // Se não houver fotos, usar uma imagem padrão
  const currentPhoto = selectedProfile?.photos?.[currentPhotoIndex] || '/logo.webp';

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50 backdrop-blur-md">
      <div className="relative">
        <Image
          src={currentPhoto}
          alt="Large Photo"
          className="w-screen h-screen bg-gray-800 transition-opacity duration-900 ease-in-out object-contain rounded-2xl"
          loading="lazy"
          layout="responsive"
          width={900}
          height={600}
        />
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
            &lt;
          </button>
          <button
            onClick={nextPhoto}
            className="absolute top-1/2 px-4 py-2 rounded-full bg-zinc-500 right-16 ml-4 text-white hover:text-zinc-700 text-xxl transform -translate-y-1/2 opacity-65 hover:bg-zinc-300"
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default FotoBig;