import Image from 'next/image';
import { Card } from '../../components/ui/card';
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
}

const PhotosAndCertificado: React.FC<PhotosAndCertificadoProps> = ({
  selectedProfile,
  loading,
  isCertified,
  handleCertificadoClick,
  handlePhotoClick,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="p-6 bg-[#faf3f6] dark:bg-[#13040b] backdrop-blur-xl rounded-3xl border-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-3xl md:text-4xl">
          {t('profile.photos_of', { name: selectedProfile?.nome })}
        </h2>
        {loading || isCertified === null ? (
          <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse">
            <span className="text-gray-500 dark:text-gray-400">
              {t('profile.loading')}
            </span>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCertificadoClick}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-300
            ${isCertified ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
            text-white shadow-lg`}
          >
            <span className="text-sm font-medium">
              {isCertified
                ? t('profile.certified')
                : t('profile.not_certified')}
            </span>
            {isCertified ? (
              <VscVerifiedFilled className="w-5 h-5" />
            ) : (
              <IoInformationCircle className="w-5 h-5" />
            )}
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {selectedProfile?.photoURL?.length > 0 ? (
          selectedProfile.photoURL.map((media: string, index: number) => (
            <div
              key={index}
              className="aspect-square relative rounded-3xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handlePhotoClick(index)}
            >
              {media.endsWith('.mp4') ||
              media.endsWith('.mov') ||
              media.endsWith('.webm') ? (
                <video
                  autoPlay
                  controlsList="nodownload"
                  className="w-full h-full object-cover"
                >
                  <source src={media || '/logo.webp'} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={media || '/logo.webp'}
                  alt={`${selectedProfile.nome} - Photo ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))
        ) : (
          <div className="relative rounded-xl overflow-hidden w-full h-96 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              {t('profile.no_photos_available')}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PhotosAndCertificado;
