/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';

interface StoryBigProps {
  selectedProfile: { storyURL: string[] };
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
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50 backdrop-blur-md">
        <div className="text-white">Erro: Nenhum story disponível</div>
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-pink-700">
          <ImCross size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50 backdrop-blur-md">
      <div className="relative w-full max-w-[80vw] max-h-[80vh]">
        <video
          src={currentStoryURL}
          controls
          autoPlay
          muted
          className="w-full h-full object-contain rounded-2xl"
          onLoadedData={() => console.log('[StoryBig] Vídeo carregado com sucesso')}
          onError={(e) => {
            const videoElement = e.target as HTMLVideoElement;
            console.error('[StoryBig] Erro ao carregar vídeo:', videoElement.error?.message || e);
          }}
        />
      </div>
      <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-pink-700">
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
    </div>
  );
};

export default StoryBig;