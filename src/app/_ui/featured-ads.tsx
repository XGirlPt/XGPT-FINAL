'use client';

import { useState, useEffect, useCallback } from 'react';
import * as React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Video, Share2, Crown } from 'lucide-react';
import { MdVerified } from 'react-icons/md'; // Ícone de certificado
import { FaMapMarkerAlt } from 'react-icons/fa'; // Ícone de localização
import { motion } from 'framer-motion';
import { useLanguage } from '../../backend/context/LanguageContext';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

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

export function FeaturedAds({ profiles, currentPage }: { profiles: Profile[], currentPage: number, itemsPerPage: number }) {
  const [timeElapsedList, setTimeElapsedList] = useState<string[]>([]);

  const ITEMS_PER_PAGE = 12; // Definindo o número fixo de perfis a exibir

  const formatTimeElapsed = useCallback((minutesElapsed: number): string => {
    const hoursElapsed = minutesElapsed / 60;
    if (hoursElapsed > 48) {
      return 'Há mais de 48 horas';
    } else if (minutesElapsed < 60) {
      return `Há ${minutesElapsed} minuto${minutesElapsed !== 1 ? 's' : ''}`;
    } else {
      const hours = Math.floor(hoursElapsed);
      const minutes = minutesElapsed % 60;
      return `Há ${hours} hora${hours !== 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} minuto${minutes !== 1 ? 's' : ''}` : ''}`;
    }
  }, []);

  const calculateTimeElapsed = useCallback(
    (tagTimestamp: string): string => {
      const timestampDate = new Date(tagTimestamp);
      if (isNaN(timestampDate.getTime())) {
        return 'Tempo indeterminado';
      }
      const currentTime = Date.now();
      const elapsedTime = currentTime - timestampDate.getTime();
      const minutesElapsed = Math.floor(elapsedTime / (1000 * 60));
      return formatTimeElapsed(minutesElapsed);
    },
    [formatTimeElapsed]
  );

  useEffect(() => {
    if (!profiles || profiles.length === 0) return;

    const timeElapsed = profiles.map((profile) =>
      calculateTimeElapsed(profile.tagtimestamp)
    );
    setTimeElapsedList(timeElapsed);

    const interval = setInterval(() => {
      const updatedTimeElapsed = profiles.map((profile) =>
        calculateTimeElapsed(profile.tagtimestamp)
      );
      setTimeElapsedList(updatedTimeElapsed);
    }, 60000);

    return () => clearInterval(interval);
  }, [profiles, calculateTimeElapsed]);

  // Ordenação dos perfis por tagtimestamp (da mais recente para a mais antiga)
  const sortedProfiles = profiles
    ? [...profiles].sort((a, b) => {
        const dateA = new Date(a.tagtimestamp).getTime();
        const dateB = new Date(b.tagtimestamp).getTime();
        return dateB - dateA; // Ordena do mais recente para o mais antigo
      })
    : [];

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProfiles = sortedProfiles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const { t } = useTranslation();
  const { language } = useLanguage();

  if (!profiles) {
    return (
      <div className="p-4 mt-2 relative">
        <h2 className="lg:text-5xl text-3xl">Featured Ads</h2>
        <p>Loading profiles...</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="p-4 mt-2 relative">
        <h2 className="lg:text-5xl text-3xl">Featured Ads</h2>
        <p>No profiles available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 mt-2 relative">
      <motion.div
        className="relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.div
          className="flex items-center justify-between mb-4"
          variants={itemVariants}
        >
          <h2 className="lg:text-5xl text-3xl">Featured Ads</h2>
          <Link
            href="/ads"
            className="text-sm text-white px-4 py-2 rounded-full bg-pink-600 font-body hidden md:block"
          >
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
          {paginatedProfiles.map((profile, index) => (
            <Link href={`/escort/${profile.nome}`} passHref key={index}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="relative bg-white dark:bg-[#300d1b] rounded-3xl shadow-lg overflow-hidden cursor-pointer transform transition-all"
              >
                {/* Imagem do perfil com Nome e Localidade sobrepostos */}
                {profile.photos?.[0] ? (
                  <div className="relative rounded-3xl overflow-hidden w-full h-48">
                    <Image
                      src={profile.photos[0] || '/logo.webp'}
                      alt={profile.nome}
                      width={500}
                      height={500}
                      className="object-cover rounded-3xl w-full h-full"
                    />
                    {/* Gradiente e Nome + Localidade */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <h3 className="text-base font-semibold text-white flex items-center gap-1">
                        {profile.nome}
                        {profile.certificado && <MdVerified className="text-green-500" />}
                      </h3>
                      <div className="flex items-center gap-1 text-white text-sm">
                        <FaMapMarkerAlt className="text-pink-600" />
                        {profile.cidade}
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Conteúdo da Card (Tag e Timestamp) */}
                <div className="p-3 flex flex-col gap-2">
                  <motion.p
                    className="text-sm text-gray-700 dark:text-gray-300 italic px-3 py-1 rounded-lg"
                    variants={badgeVariants}
                  >
                    {'"' + profile.tag + '"'}
                  </motion.p>
                  <div className="text-xs flex items-center gap-1">
                    <Clock size={14} /> {timeElapsedList[index]}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <Link
          href="/ads"
          className="text-sm text-white px-4 py-2 rounded-full bg-pink-600 font-body block md:hidden mt-10 text-center"
        >
          View All
        </Link>
      </motion.div>
      <motion.div
        className="absolute rounded-full z-30 bg-[#f2cadb] dark:bg-[#2e0415]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          height: '400px',
          width: '400px',
          borderRadius: '200px',
          bottom: '-100px',
          left: '-100px',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default FeaturedAds;