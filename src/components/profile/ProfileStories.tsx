// import React from 'react';
// import { useState } from 'react';
// import { Profile } from "@/types";
// import { useTranslation } from "react-i18next";



// interface ProfileStoriesProps {
//   selectedProfile: any; // Certifique-se de que o tipo correto seja passado
//   storyURLs: string[];
//   thumbnails: string[];
//   onStoryClick: (index: number) => void;
// }



// const ProfileStories: React.FC<ProfileStoriesProps> = ({selectedProfile, storyURLs, thumbnails, onStoryClick}) => {
//   // Verifique se o storyURLs tem conteúdo
//   if (!storyURLs || storyURLs.length === 0) {
//     return <p>No stories available</p>; // Caso não haja stories, exibe uma mensagem
//   }
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const { t, i18n } = useTranslation();

//   const handleStoryClick = (index: number) => {
//     setShowLargeStory(true);
//     setStoryIndex(index);
//   };


//   return (
//     <div className="flex md:grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-2">
//      {selectedProfile && selectedProfile.storyURL?.length > 0 && (
//                 <div className="flex flex-col ml-8 md:ml-10 md:mr-24">
//                   <p className="text-pink-500 text-2xl mb-4 font-semibold">
//                     {" "}
//                     {t("profile.stories_of", { name: selectedProfile.nome })}
//                   </p>
//                   <div className="flex md:grid grid-cols-1  md:grid-cols-4 gap-6 md:gap-2">
//                     {selectedProfile.storyURL.map((media, index) => {
//                       if (!media) return null;
//                       const isVideo =
//                         media.endsWith(".mp4") ||
//                         media.endsWith(".mov") ||
//                         media.endsWith(".webm");
//                       const thumbnailSrc = thumbnails[index];

//                       return (
//                         <div key={index} className="relative flex">
//                           {isVideo ? (
//                             <div>
//                               <video
//                                 src={thumbnailSrc}
//                                 alt={`Thumbnail ${index + 1}`}
//                                 className="rounded-2xl border border-zinc-500 shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
//                                 onClick={() => handleStoryClick(index)}
//                                 width={300}
//                                 height={200}
//                                 priority={index === 0}
//                               />
//                               <div className="absolute inset-0 flex items-center justify-center">
//                                 <span className="text-white text-3xl">▶️</span>
//                               </div>
//                             </div>
//                           ) : (
//                             <video
//                               src={media}
//                               className="relative w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer object-cover overflow-hidden border-2 border-pink-800 transition duration-300 ease-in-out transform hover:scale-105"
//                               onClick={() => handleStoryClick(index)}
//                               controls={false}
//                               muted
//                               playsInline
//                             />
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//     </div>
//   );
// };

// export default ProfileStories;
