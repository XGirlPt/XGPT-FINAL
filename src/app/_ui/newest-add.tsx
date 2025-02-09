'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale'; // Importando o locale português

interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  stories: string[]; // Histórias
  tag: string;
  tagtimestamp: string;
  certificado: boolean;
  live: boolean | string;
  // live pode ser booleano ou string
}

interface NewestAddsProps {
  profiles: Profile[];
  currentPage: number; // Página atual
  itemsPerPage: number;
  onProfileClick: () => void;
  customClass?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const NewestAdds: React.FC<NewestAddsProps> = ({
  profiles = [],
  currentPage,
  itemsPerPage,
  onProfileClick,
}) => {
  const sortedProfiles = profiles
    ? [...profiles].sort((a, b) => {
        const dateA = new Date(a.tagtimestamp).getTime();
        const dateB = new Date(b.tagtimestamp).getTime();
        return dateB - dateA; // Ordena do mais recente para o mais antigo
      })
    : [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfiles = sortedProfiles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const timeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true, locale: pt });
  };

  return (
    <motion.div
      className="relative w-full px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full relative z-10"
      >
        <motion.div
          className="flex items-center justify-between mb-4"
          variants={titleVariants}
        >
          <h2 className="lg:text-5xl text-3xl">Newest Adds</h2>
          <div className="flex gap-2">
            <CarouselPrevious className="static h-8 w-8 border-none shadow-none hover:bg-transparent translate-y-0" />
            <CarouselNext className="static h-8 w-8 border-none shadow-none hover:bg-transparent translate-y-0" />
          </div>
        </motion.div>

        <div className="relative w-full">
        <CarouselContent className="-ml-2">
  {profiles.map((profile, index) => (
    <CarouselItem
      key={index}
      className="basis-1/2 md:basis-1/5 gap-4"
    >
      <motion.div
        variants={cardVariants}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
        className="relative bg-white dark:bg-[#300d1b] rounded-3xl p-4 shadow-lg overflow-hidden cursor-pointer transform transition-all hover:shadow-2xl"
      >
        <motion.div
          className="relative aspect-[4/4] rounded-full mb-4"
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2 },
          }}
        >
          <Image
            src={profile.photos[0] || "/logo.webp"}
            alt={profile.nome}
            fill
            className="object-cover rounded-full border-4 border-white"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-xl md:text-2xl text-gray-900 dark:text-white truncate">
              {profile.nome}
            </h3>
            <div className="font-body flex items-center gap-1 text-sm md:text-base text-gray-500 dark:text-gray-300">
              <Image
                src="/icons/location.png"
                alt="Location"
                width={20}
                height={20}
              />
              {profile.cidade}
            </div>
          </div>

          {/* Tag/Status - agora com ícone e itálico */}
          <p className="text-sm md:text-base font-medium text-gray-800 dark:text-white bg-blue-100 dark:bg-[#3a1a2a] px-3 py-1 rounded-full inline-flex items-center gap-2 shadow-md mb-2 italic">
            <Image src="/icons/message.png" alt="Message" width={16} height={16} className="opacity-75" />
            <span>({profile.tag})</span>
          </p>

          {/* Time Ago */}
          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1 font-body">
            <Image
              src="/icons/clock.png"
              alt="Clock"
              width={18}
              height={18}
            />
            {timeAgo(profile.tagtimestamp)} {/* Exibe o tempo passado */}
          </div>
        </motion.div>
      </motion.div>
    </CarouselItem>
  ))}
</CarouselContent>


        </div>
      </Carousel>

      <motion.div
        className="absolute rounded-l-full z-30 bg-[#f2cadb] dark:bg-[#2e0415] hidden md:block"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          height: '400px',
          width: '200px',
          top: '-100px',
          right: '0',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />
    </motion.div>
  );
};

export default NewestAdds;
