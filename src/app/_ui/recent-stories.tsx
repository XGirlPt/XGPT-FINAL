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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.1, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' },
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

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {profiles.map((profile, index) => (
          profile.stories && profile.stories.length > 0 && (
            <motion.div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 p-1"
              variants={cardVariants}
              whileHover="hover"
              onClick={() => openStory(profile.stories[0])}
            >
              <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                <video
                  src={profile.stories[0]}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  autoPlay
                  loop
                  muted
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-2xl">
                  <p className="font-semibold text-lg">{profile.nome}</p>
                  <p className="text-sm opacity-80">{profile.cidade}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <PlayCircle className="text-white/80" size={50} />
                </div>
              </div>
            </motion.div>
          )
        ))}
      </motion.div>

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
    </section>
  );
}

export default RecentStories;
