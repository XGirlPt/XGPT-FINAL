'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import { MdFiberManualRecord } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../backend/context/LanguageContext';
import { FaVideo, FaCrown, FaClock, FaCommentDots, FaMapMarkerAlt } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { X } from 'lucide-react';

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
      staggerChildren: 0.1,
    },
  },
};

// Variantes para os círculos flutuantes dos stories com pulsação e brilho
const storyCircleVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: [0, -20, 0],
    scale: [1, 1.05, 1],
    transition: {
      y: { repeat: Infinity, repeatType: 'loop', duration: 3, ease: 'easeInOut' },
      scale: { repeat: Infinity, repeatType: 'loop', duration: 1.5, ease: 'easeInOut' },
      opacity: { duration: 0.6 },
    },
  },
  hover: {
    scale: 1.15,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, y: -30, scale: 0.9, transition: { duration: 0.5 } },
};

// Interface para os dados dos perfis
interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  stories: string[];
  tag: string;
  tagtimestamp: string;
  certificado: boolean;
  live: boolean | string;
  premium: boolean | string;
}

// Variantes para os cartões do carrossel
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Função para formatar o tempo decorrido
const timeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true, locale: pt });
};

// Posições predefinidas para os círculos flutuantes
const storyPositions = [
  '-top-12 lg:top-2 left-4 lg:left-24 w-20 h-20',
  '-top-12 lg:top-2 right-4 lg:right-24 w-20 h-20',
  '-bottom-24 lg:bottom-4 left-4 lg:-left-12 w-28 h-28',
  '-bottom-24 lg:bottom-4 right-4 lg:-right-12 w-24 h-24',
];

export function HeroSection({ profiles }: { profiles: Profile[] }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<{ story: string; profile: Profile } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtrar perfis com stories
  const profilesWithStories = profiles.filter(profile => profile.stories && profile.stories.length > 0);

  // Filtrar perfis com tag preenchida para o carrossel
  const profilesWithTag = profiles.filter(profile => profile.tag && profile.tag.trim() !== '');

  // Rotação automática dos stories a cada 5 segundos
  useEffect(() => {
    if (profilesWithStories.length <= 4) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 4) % profilesWithStories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [profilesWithStories]);

  // Selecionar os 4 stories a exibir
  const displayedStories = profilesWithStories.slice(currentIndex, currentIndex + 4);
  if (displayedStories.length < 4 && profilesWithStories.length > 0) {
    const remaining = 4 - displayedStories.length;
    displayedStories.push(...profilesWithStories.slice(0, remaining));
  }

  const openStory = (story: string, profile: Profile) => setSelectedStory({ story, profile });
  const closeStory = () => setSelectedStory(null);

  return (
    <section className="relative md:px-4">
      <motion.div
        className="text-center"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="relative">
          <motion.div className="mb-8" variants={fadeInUp}>
            <span className="bg-[#f1c0d3] text-pink-600 lg:px-4 lg:py-1 px-2 py-1 rounded-full text-xs font-medium">
              BEST ESCORT SERVICES
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-5xl mb-2 text-gray-900 dark:text-white"
            variants={fadeInUp}
          >
            Escort Girls & Erotic
            <br />
            Masseuses In Portugal
          </motion.h1>

          <motion.p
            className="text-xl font-body text-gray-600 dark:text-gray-300 mb-12"
            variants={fadeInUp}
          >
            {t('dashboard.meta_description')}
          </motion.p>

          {/* Círculos flutuantes com stories aprimorados */}
          {displayedStories.map((profile, index) => (
            <motion.div
              key={`${profile.nome}-${index}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={storyCircleVariants}
              whileHover="hover"
              className={`absolute ${storyPositions[index]} cursor-pointer group`}
              onClick={() => openStory(profile.stories[0], profile)}
            >
              <div className="relative rounded-full overflow-hidden w-full h-full">
                {/* Anel de gradiente dinâmico com pulsação */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[3px]"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    scale: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
                    opacity: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
                  }}
                >
                  <div className="bg-white dark:bg-gray-900 rounded-full w-full h-full" />
                </motion.div>
                {/* Vídeo do story */}
                <video
                  src={profile.stories[0]}
                  className="relative object-cover w-full h-full rounded-full z-10"
                  autoPlay
                  loop
                  muted
                />
                {/* Efeito de glow sutil */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                />
              </div>
              {/* Informações do perfil com fundo elegante */}
              <div className="mt-3 text-white text-xs font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 rounded-lg py-1 px-2 shadow-md">
                <p className="text-pink-300">{profile.nome}</p>
                <p className="text-gray-300 flex items-center justify-center gap-1">
                  <FaMapMarkerAlt className="text-pink-500" />
                  {profile.cidade}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carrossel de Perfis */}
        <motion.div variants={fadeInUp} className="w-full pt-20 lg:pt-0">
          <div className="-mx-4 sm:-mx-4 lg:-mx-16 xl:-mx-36">
          <Carousel
  opts={{ align: 'center', loop: true }}
  plugins={[Autoplay({ delay: 2000 })]}
>
<CarouselContent className="flex pb-4" style={{ gap: '1px' }}>
      {profilesWithTag.map((profile) => (
      Array.isArray(profile.photos) && profile.photos.length > 0 && profile.photos[0] && (
<CarouselItem key={profile.nome} className="basis-1/2 md:basis-1/6 ">
          <Link href={`/escort/${profile.nome}`} passHref>
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-pink-100 dark:bg-[#300d1b] rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-2xl flex flex-col w-[200px] md:w-[220px] h-[340px]"
            >
              <motion.div className="relative w-full h-[65%] rounded-xl overflow-hidden">
                <Image
                  src={profile.photos[0]}
                  alt={profile.nome}
                  fill
                  className="object-cover w-full h-full"
                />
                {profile.premium && (
                  <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 flex items-center shadow-md">
                    <FaCrown className="text-white mr-1" />
                    <span className="text-xs">Premium</span>
                  </div>
                )}
                {profile.live && (
                  <div className="absolute top-2 left-2 bg-red-700 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 animate-pulse flex items-center">
                    <MdFiberManualRecord className="text-white mr-1" />
                    <span className="text-xs">Live Cam</span>
                  </div>
                )}
                {Array.isArray(profile.stories) && profile.stories.length > 0 && (
                  <div className="absolute top-10 right-2 md:right-3 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-50 flex items-center">
                    <FaVideo className="text-white mr-1" />
                    <span className="text-xs">Stories</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="text-base md:text-lg font-semibold text-white leading-tight flex items-center gap-1">
                    {profile.nome} {profile.certificado && <MdVerified className="text-green-500" />}
                  </h3>
                  <div className="flex items-center gap-1 text-white text-sm">
                    <FaMapMarkerAlt className="text-pink-600" />
                    {profile.cidade}
                  </div>
                </div>
              </motion.div>
              <div className="bg-pink-100 dark:bg-[#300d1b] text-gray-800 dark:text-gray-300 px-3 py-3 rounded-xl shadow-md mt-2 flex flex-col justify-between flex-1 min-h-[70px] relative">
                <div className="flex items-start justify-between gap-2">
                  <span className="block break-words italic text-xs md:text-base max-h-[70px] overflow-hidden font-arial animate-flash">
                  &quot;{profile.tag}&quot;
                  </span>
                  <FaCommentDots className="text-yellow-600 text-md min-w-[18px] min-h-[18px] flex-shrink-0" />
                </div>
                <div className="text-xs font-arial text-black dark:text-gray-200 flex items-center gap-1 mt-2">
                  <FaClock className="text-yellow-500 h-4 w-4 font-normal" />
                  {timeAgo(profile.tagtimestamp)}
                </div>
              </div>
            </motion.div>
          </Link>
        </CarouselItem>
      )
    ))}
  </CarouselContent>
  <div className="flex justify-center gap-2 mt-2">
    <CarouselPrevious className="static flex translate-x-0 bg-white text-pink-600 dark:text-white dark:bg-black translate-y-0 w-10 h-10 rounded-full" />
    <CarouselNext className="static flex translate-x-0 bg-pink-600 hover:bg-pink-700 text-white translate-y-0 w-10 h-10 rounded-full" />
  </div>
</Carousel>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal de Story com Avatar e Localidade */}
      {selectedStory && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <video
            src={selectedStory.story}
            className="max-w-[90%] max-h-[90%] rounded-lg z-0"
            autoPlay
            controls
          />
          <motion.div
            className="absolute top-4 right-4 flex items-center gap-3 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/escort/${selectedStory.profile.nome}`} passHref>
              <motion.div
                className="w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 border-pink-500 bg-black"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={selectedStory.profile.photos[0]}
                  alt={selectedStory.profile.nome}
                  width={48}
                  height={48}
                  className="object-cover rounded-full"
                />
              </motion.div>
            </Link>
            <div className="text-white">
              <p className="font-semibold text-lg">{selectedStory.profile.nome}</p>
              <p className="text-sm text-gray-300 flex items-center gap-1">
                <FaMapMarkerAlt className="text-pink-600" />
                {selectedStory.profile.cidade}
              </p>
            </div>
          </motion.div>
          <button
            onClick={closeStory}
            className="absolute top-4 left-4 text-white z-50 p-2 bg-black/50 rounded-full"
          >
            <X size={32} />
          </button>
        </motion.div>
      )}
    </section>
  );
}

export default HeroSection;