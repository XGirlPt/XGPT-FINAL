/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ImCross } from 'react-icons/im';
import { FaMapMarkerAlt } from "react-icons/fa";

interface StoryBigProps {
  selectedProfile: { 
    storyURL: string[];
    nome?: string;
    cidade?: string;
    photos?: string[];
  };
  onClose: () => void;
  currentIndex: number;
}

const StoryBig: React.FC<StoryBigProps> = ({ selectedProfile, onClose, currentIndex }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(currentIndex);
  const totalStories = selectedProfile?.storyURL?.length || 0;

  console.log('[StoryBig] totalStories:', totalStories);
  console.log('[StoryBig] selectedProfile.storyURL:', selectedProfile.storyURL);
  console.log('[StoryBig] currentStoryIndex:', currentStoryIndex);

  const nextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % totalStories);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + totalStories) % totalStories);
  };

  const currentStoryURL = selectedProfile?.storyURL[currentStoryIndex];
  console.log('[StoryBig] currentStoryURL:', currentStoryURL);

  if (!currentStoryURL) {
    console.error('[StoryBig] Nenhuma URL de story disponível para o índice:', currentStoryIndex);
    return (
      <motion.div
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-white">Erro: Nenhum story disponível</div>
        <button onClick={onClose} className="absolute top-4 left-4 text-white z-50 p-2 bg-black/50 rounded-full">
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
      <video
        src={currentStoryURL}
        controls
        autoPlay
        muted
        className="max-w-[90%] max-h-[90%] rounded-lg z-0"
        onLoadedData={() => console.log('[StoryBig] Vídeo carregado com sucesso')}
        onError={(e) => {
          const videoElement = e.target as HTMLVideoElement;
          console.error('[StoryBig] Erro ao carregar vídeo:', videoElement.error?.message || e);
        }}
      />
      {(selectedProfile.nome || selectedProfile.photos) && (
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-3 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedProfile.photos?.[0] && (
            <Link href={`/escort/${selectedProfile.nome || ''}`} passHref>
              <motion.div
                className="w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 border-pink-500 bg-black"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={selectedProfile.photos[0]}
                  alt={selectedProfile.nome || "Perfil"}
                  width={48}
                  height={48}
                  className="object-cover rounded-full"
                />
              </motion.div>
            </Link>
          )}
          {selectedProfile.nome && (
            <div className="text-white">
              <p className="font-semibold text-lg">{selectedProfile.nome}</p>
              {selectedProfile.cidade && (
                <p className="text-sm text-gray-300 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-pink-600" />
                  {selectedProfile.cidade}
                </p>
              )}
            </div>
          )}
        </motion.div>
      )}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-white z-50 p-2 bg-black/50 rounded-full hover:bg-black/70"
      >
        <ImCross size={16} />
      </button>
      {totalStories > 1 && (
        <>
          <button
            onClick={prevStory}
            className="absolute top-1/2 left-4 px-4 py-2 rounded-full bg-zinc-500 text-white hover:text-zinc-700 transform -translate-y-1/2 opacity-65 hover:bg-zinc-300"
          >
            {'<'}
          </button>
          <button
            onClick={nextStory}
            className="absolute top-1/2 right-4 px-4 py-2 rounded-full bg-zinc-500 text-white hover:text-zinc-700 transform -translate-y-1/2 opacity-65 hover:bg-zinc-300"
          >
            {'>'}
          </button>
        </>
      )}
    </motion.div>
  );
};

export default StoryBig;