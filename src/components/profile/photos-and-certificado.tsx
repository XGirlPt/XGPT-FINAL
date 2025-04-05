import Image from 'next/image';
import { Card } from '../ui/card';
import { motion } from 'framer-motion';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { IoInformationCircle } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface PhotosAndCertificadoProps {
  selectedProfile: any;
  loading: boolean;
  isCertified: boolean | null;
  handleCertificadoClick: () => void;
  handlePhotoClick: (index: number) => void;
  handleStoryClick?: (index: number) => void;
}

const PhotosAndCertificado: React.FC<PhotosAndCertificadoProps> = ({
  selectedProfile,
  loading,
  isCertified,
  handleCertificadoClick,
  handlePhotoClick,
  handleStoryClick,
}) => {
  const { t } = useTranslation();

  console.log('[PhotosAndCertificado] selectedProfile:', selectedProfile);
  console.log('[PhotosAndCertificado] photos:', selectedProfile?.photos);
  console.log('[PhotosAndCertificado] storyURL:', selectedProfile?.storyURL);
  console.log('[PhotosAndCertificado] Renderizando seção de stories?', selectedProfile?.storyURL?.length > 0);

  const hasStories = selectedProfile?.storyURL?.length > 0;

  const renderCertBadge = () => {
    if (loading || isCertified === null) {
      return (
        <div className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse">
          <span className="text-gray-500 dark:text-gray-400 text-xs">{t('profile.loading')}</span>
        </div>
      );
    }
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCertificadoClick}
        className={`px-2 py-1 rounded-full flex items-center gap-1 transition-colors duration-300
          ${isCertified ? 'bg-green-600 hover:bg-green-500' : 'bg-red-500 hover:bg-red-600'} text-white shadow-md`}
      >
        <span className="text-xs">
          {isCertified ? t('profile.certified') : t('profile.not_certified')}
        </span>
        {isCertified ? (
          <VscVerifiedFilled className="w-4 h-4" />
        ) : (
          <IoInformationCircle className="w-4 h-4" />
        )}
      </motion.button>
    );
  };

  return (
    <Card className="p-6 bg-[#faf3f6] dark:bg-[#13040b] backdrop-blur-xl rounded-3xl border-none z-10">
      {hasStories && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl md:text-4xl">
              {t('profile.stories_of', { name: selectedProfile?.nome })}
            </h2>
            {renderCertBadge()}
          </div>
          <div className="flex gap-4 pb-2 w-full max-w-[600px]">
            {Array.from({ length: 5 }).map((_, slotIndex) => (
              <div key={slotIndex} className="w-24 h-24 flex-shrink-0">
                {slotIndex < selectedProfile.storyURL.length && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-full h-full relative rounded-full overflow-hidden cursor-pointer border-2 border-pink-600"
                    onClick={() => {
                      console.log('[PhotosAndCertificado] Story clicado, índice:', slotIndex, 'URL:', selectedProfile.storyURL[slotIndex]);
                      if (handleStoryClick) handleStoryClick(slotIndex);
                    }}
                  >
                    <video
                      src={selectedProfile.storyURL[slotIndex]}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onError={(e) => console.error('[PhotosAndCertificado] Erro ao carregar vídeo no círculo:', e)}
                    />
                    <motion.div className="absolute inset-0 bg-pink-600 opacity-0 hover:opacity-30 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white opacity-70 hover:opacity-100 transition-opacity duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-3xl md:text-4xl">
            {t('profile.photos_of', { name: selectedProfile?.nome })}
          </h2>
          {!hasStories && renderCertBadge()}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {selectedProfile?.photos?.length > 0 ? (
          selectedProfile.photos.map((media: string, index: number) => (
            <div
              key={index}
              className="aspect-square relative rounded-3xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handlePhotoClick(index)}
            >
              <Image
                src={media || '/logo.webp'}
                alt={`${selectedProfile?.nome || 'Profile'} - Photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 300px) 100vw, 300px"
              />
            </div>
          ))
        ) : (
          <div className="relative rounded-xl overflow-hidden w-full h-96 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-400">{t('profile.no_photos_available')}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PhotosAndCertificado;