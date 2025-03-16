'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchProfiles } from '@/backend/services/profileService';
import { PlayCircle, X } from 'lucide-react';

interface Profile {
  nome: string;
  stories?: string[];
  cidade?: string;
}

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' },
};

export function RecentStories() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProfiles: Profile[] = await fetchProfiles();
        setProfiles(fetchedProfiles.filter((p) => p.stories && p.stories.length > 0));
      } catch (error) {
        console.error('Erro ao buscar perfis:', error);
      }
    }
    fetchData();
  }, []);

  const openStory = (story: string) => setSelectedStory(story);
  const closeStory = () => setSelectedStory(null);

  return (
    <section className="relative py-12 px-4">
      <h2 className="lg:text-4xl text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
        Stories Recentes
      </h2>

      {/* Carrossel de Stories */}
      <motion.div
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {profiles.map((profile, index) => (
          profile.stories && profile.stories.length > 0 && (
            <motion.div
              key={index}
              className="flex-shrink-0 w-64 h-96 rounded-2xl overflow-hidden shadow-md cursor-pointer bg-white dark:bg-[#300d1b]"
              variants={cardVariants}
              whileHover="hover"
              onClick={() => openStory(profile.stories[0])}
            >
              <video
                src={profile.stories[0]}
                className="object-cover w-full h-[70%] rounded-t-2xl"
                autoPlay
                loop
                muted
              />
              <div className="p-4 flex flex-col justify-between h-[30%]">
                <div>
                  <p className="text-gray-900 dark:text-white text-sm font-semibold">{profile.nome}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">{profile.cidade}</p>
                </div>
                <div className="flex justify-end">
                  <PlayCircle className="text-pink-600" size={24} />
                </div>
              </div>
            </motion.div>
          )
        ))}
      </motion.div>

      {/* Modal de Story em Tela Cheia */}
      {selectedStory && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <video
            src={selectedStory}
            className="max-w-[90%] max-h-[90%] rounded-lg"
            autoPlay
            controls
          />
          <button
            onClick={closeStory}
            className="absolute top-4 right-4 text-white"
          >
            <X size={32} />
          </button>
        </motion.div>
      )}

      {/* Fundo Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100/50 to-transparent z-[-1]" />
    </section>
  );
}

export default RecentStories;