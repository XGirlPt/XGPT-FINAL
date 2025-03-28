'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProfiles } from '@/backend/services/profileService';
import { FaMapMarkerAlt, FaPlayCircle } from 'react-icons/fa';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Variantes de animação para fade-in
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Variantes para animação em sequência
const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Variantes para as cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

interface Profile {
  nome: string;
  cidade?: string;
  stories?: string[];
  photos?: string[];
}

export function RecentStories() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProfiles: Profile[] = await fetchProfiles();
        const profilesWithStories = fetchedProfiles
          .filter((p) => p.stories && p.stories.length > 0)
          .slice(0, 4); // Pegar apenas os 4 primeiros perfis com stories
        setProfiles(profilesWithStories);
      } catch (error) {
        console.error('Erro ao buscar perfis:', error);
      }
    }
    fetchData();
  }, []);

  const openStory = (story: string) => setSelectedStory(story);
  const closeStory = () => setSelectedStory(null);

  return (
    <section className="relative py-12 px-4 bg-[#f2ebee] dark:bg-[#100007]">
      <motion.div
        className="container mx-auto"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        {/* Cabeçalho com título e botão "Ver Todos" */}
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white"
            variants={fadeInUp}
          >
            Stories Recentes
          </motion.h2>
          <Link href="/stories" passHref>
            <Button
              className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-2 font-body"
            >
              Ver Todos
            </Button>
          </Link>
        </div>

        {/* Grid de 4 cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          variants={staggerChildren}
        >
          {profiles.map((profile, index) => (
            profile.stories && profile.stories.length > 0 && (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative bg-pink-100 dark:bg-[#300d1b] rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => openStory(profile.stories[0])}
              >
                {/* Vídeo do Story */}
                <div className="relative w-full h-80">
                  <video
                    src={profile.stories[0]}
                    className="w-full h-full object-cover rounded-2xl"
                    autoPlay
                    loop
                    muted
                  />
                  {/* Gradiente na base */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl" />

                  {/* Avatar, Nome e Cidade no canto superior esquerdo */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500">
                      <Image
                        src={profile.photos?.[0] || '/logo.webp'}
                        alt={profile.nome}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="text-white">
                      <p className="text-sm font-semibold">{profile.nome}</p>
                      <p className="text-xs flex items-center gap-1">
                        <FaMapMarkerAlt className="text-pink-500" />
                        {profile.cidade || 'Desconhecida'}
                      </p>
                    </div>
                  </div>

                  {/* Ícone de Play no hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <FaPlayCircle className="text-white/80" size={50} />
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </motion.div>
      </motion.div>

      {/* Modal para exibir o story selecionado */}
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
            className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full"
          >
            <X size={32} />
          </button>
        </motion.div>
      )}
    </section>
  );
}

export default RecentStories;