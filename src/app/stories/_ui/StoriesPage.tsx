 'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProfiles } from '@/backend/services/profileService';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import { FaPlayCircle, FaPauseCircle, FaMapMarkerAlt, FaClock, FaFireAlt } from 'react-icons/fa';
import { Profile } from '@/backend/types';
import { Button } from '@/components/ui/button';
import StoryBig from '@/components/profile/story-big';
import { useTranslation } from 'react-i18next';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';

// Metadata
export const metadata = {
  title: 'XGirl - Stories de Acompanhantes em Portugal',
  description:
    'Descubra as histórias mais recentes das melhores acompanhantes e massagistas eróticas em Portugal.',
  keywords: [
    'acompanhantes de luxo',
    'massagistas eróticas',
    'escorts Portugal',
    'stories acompanhantes',
    'massagens eróticas',
    'luxury escorts Portugal',
  ],
  openGraph: {
    title: 'XGirl - Stories de Acompanhantes e Massagistas Eróticas',
    description:
      'Explore as histórias exclusivas das acompanhantes de luxo em Portugal.',
    type: 'website',
    locale: 'pt_PT',
    url: 'https://xgirl.pt/stories',
    site_name: 'XGirl - Nº1 em Acompanhantes de Luxo em Portugal',
    images: [
      {
        url: 'https://xgirl.pt/public/photos/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Stories de Acompanhantes de Luxo em Portugal',
      },
    ],
  },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3 },
  },
};

// Função para formatar o tempo decorrido
const timeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true, locale: pt });
};

export default function StoriesPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [playing, setPlaying] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  // Carregar perfis com stories
  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedProfiles = await fetchProfiles();
      const profilesWithStories = fetchedProfiles
        .filter((p) => p.stories && p.stories.length > 0 && p.nome && p.photos)
        .sort((a, b) => new Date(b.tagtimestamp ?? 0).getTime() - new Date(a.tagtimestamp ?? 0).getTime());
      setProfiles(profilesWithStories);
    } catch (error) {
      console.error('[StoriesPage] Erro ao carregar perfis:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  // Alternar play/pause do vídeo
  const togglePlay = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (playing[index]) {
        video.pause();
      } else {
        video.play();
      }
      setPlaying((prev) => ({ ...prev, [index]: !prev[index] }));
    }
  }, [playing]);

  // Abrir story
  const openStory = useCallback((profile: Profile, storyIndex: number) => {
    setSelectedProfile({ ...profile, stories: profile.stories });
    setCurrentStoryIndex(storyIndex);
  }, []);

  // Fechar story
  const closeStory = useCallback(() => {
    setSelectedProfile(null);
    setCurrentStoryIndex(0);
  }, []);

  if (loading) {
    return (
      <main className="bg-[#f2ebee] dark:bg-[#100007] min-h-screen flex items-center justify-center">
        <motion.p
          className="text-center text-gray-900 dark:text-white text-2xl font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('common.loading', { defaultValue: 'Carregando...' })}
        </motion.p>
      </main>
    );
  }

  return (
    <main className="bg-[#f2ebee] dark:bg-[#100007] min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        {/* Gradiente Decorativo Superior */}
        <motion.div
          className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          style={{
            height: '400px',
            width: '400px',
            top: '-100px',
            left: '-100px',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />

        {/* Título */}
        <motion.div
          className="relative z-10 text-center mb-12"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-body flex items-center justify-center gap-2">
            {t('stories.title', { defaultValue: 'Stories Exclusivos' })}
            <FaFireAlt className="text-yellow-500" />
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-body">
            {t('stories.subtitle', { defaultValue: 'Descubra as histórias mais recentes das acompanhantes' })}
          </p>
        </motion.div>

        {/* Grade de Stories */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {profiles.length > 0 ? (
            profiles.flatMap((profile, profileIndex) =>
              profile.stories!.map((story, storyIndex) => (
                <motion.div
                  key={`${profile.nome}-${storyIndex}`}
                  variants={cardVariants}
                  whileHover="hover"
                  className="relative bg-white dark:bg-[#300d1b] rounded-3xl shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => openStory(profile, storyIndex)}
                >
                  <div className="relative aspect-[4/4] overflow-hidden">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[profileIndex * 100 + storyIndex] = el;
                      }}
                      src={story}
                      className="w-full h-full object-cover rounded-t-3xl"
                      loop
                      muted
                    />
                    <div className="absolute top-2 left-2 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 flex items-center">
                      <FaFireAlt className="text-yellow-500 mr-1" />
                      {t('stories.featured', { defaultValue: 'Story em Destaque' })}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-600">
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
                            <FaMapMarkerAlt className="text-pink-600" />
                            {profile.cidade || t('stories.unknown', { defaultValue: 'Desconhecida' })}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 flex items-center gap-1 mt-1">
                        <FaClock className="text-yellow-500" />
                        {timeAgo(profile.tagtimestamp)}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay(profileIndex * 100 + storyIndex);
                        }}
                      >
                        {playing[profileIndex * 100 + storyIndex] ? (
                          <FaPauseCircle className="text-white/80" size={60} />
                        ) : (
                          <FaPlayCircle className="text-white/80" size={60} />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )
          ) : (
            <motion.p
              className="text-gray-900 dark:text-white col-span-full text-center font-body"
              variants={sectionVariants}
            >
              {t('stories.empty', { defaultValue: 'Nenhum story disponível no momento' })}
            </motion.p>
          )}
        </motion.div>

        {/* Modal de Story */}
        {selectedProfile && (
          <StoryBig
            selectedProfile={{
              storyURL: selectedProfile.stories || [],
              nome: selectedProfile.nome,
              cidade: selectedProfile.cidade,
              photos: selectedProfile.photos,
            }}
            onClose={closeStory}
            currentIndex={currentStoryIndex}
          />
        )}

        {/* Gradiente Decorativo Inferior */}
        <motion.div
          className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          style={{
            height: '400px',
            width: '400px',
            bottom: '-100px',
            right: '-100px',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />
      </div>
    </main>
  );
}