/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ImCross } from "react-icons/im";

interface StoryBigProps {
  onClose: () => void;
  currentIndex: number;
}

const StoryBig: React.FC<StoryBigProps> = ({ onClose, currentIndex }) => {
  // Acessar o estado de stories no Redux
  const storyURLsRedux = useSelector(
    (state: any) => state.profile?.profile.stories);
  console.log("stories redux from storybifConta", storyURLsRedux);  
  
  const [currentStoryIndex, setCurrentStoryIndex] = useState(currentIndex);

  const totalStories = storyURLsRedux?.length || 0;
  console.log("totalStories", totalStories);

  const nextStory = () => {
    setCurrentStoryIndex((currentStoryIndex + 1) % totalStories);
  };

  const prevStory = () => {
    setCurrentStoryIndex((currentStoryIndex - 1 + totalStories) % totalStories);
  };

  // Função para verificar se a URL é de vídeo ou imagem
  const isVideo = (url?: string) => {
    return url ? url.match(/\.(mp4|webm|ogg|mov)$/i) : false;
  };

  const currentStoryURL = storyURLsRedux?.[currentStoryIndex];
  console.log("currentStoryURL", currentStoryURL);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50 backdrop-blur-md">
      <div className="relative">
      <video
  src={currentStoryURL}
  controls
  autoPlay
  muted
  crossOrigin="anonymous"
  onLoadedData={() => console.log("Video loaded successfully")}
  onError={(e) => console.log("Error loading video", e)}
  className="max-w-[80vw] max-h-[80vh] transition-opacity duration-900 ease-in-out rounded-2xl"
/>
</div>
      <button className="text-bold font-bold" onClick={onClose}>
        <ImCross
          size={16}
          className="absolute top-0 right-10 mt-24 text-white text-xl hover:text-pink-700"
        />
      </button>
      <button
        onClick={prevStory}
        className="absolute top-1/2 px-4 py-2 rounded-full bg-zinc-500 left-0 ml-4 text-white hover:text-zinc-700 text-xxl transform -translate-y-1/2 opacity-65 hover:bg-zinc-300"
      >
        &lt;
      </button>
      <button
        onClick={nextStory}
        className="absolute top-1/2 px-4 py-2 rounded-full bg-zinc-500 right-16 ml-4 text-white hover:text-zinc-700 text-xxl transform -translate-y-1/2 opacity-65 hover:bg-zinc-300"
      >
        &gt;
      </button>
    </div>
  );
};

export default StoryBig;
