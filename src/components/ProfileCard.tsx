'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaVideo, FaCrown, FaClock, FaCommentDots, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { MdFiberManualRecord } from 'react-icons/md';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';

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

const timeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true, locale: pt });
};

export function ProfileCard({ profile }: { profile: Profile }) {
  // Só renderiza se houver fotos válidas
  if (!Array.isArray(profile.photos) || profile.photos.length === 0 || !profile.photos[0]) {
    return null;
  }

  return (
    <Link href={`/escort/${profile.nome}`} passHref>
      <motion.div
        variants={cardVariants}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
        className="relative bg-pink-100 dark:bg-[#300d1b] rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-2xl flex flex-col w-[200px] md:w-[220px] h-[340px]"
      >
        {/* Foto de perfil com Nome e Localidade sobrepostos */}
        <motion.div className="relative w-full h-[65%] rounded-xl overflow-hidden">
          <Image
            src={profile.photos[0]}
            alt={profile.nome}
            fill
            className="object-cover w-full h-full"
          />
          {/* Premium Badge */}
          {profile.premium && (
            <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 flex items-center shadow-md">
              <FaCrown className="text-white mr-1" />
              <span className="text-xs">Premium</span>
            </div>
          )}
          {/* Badges na imagem */}
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
          {/* Gradiente e Nome + Localidade */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <h3 className="text-base md:text-lg font-semibold text-white leading-tight flex items-center gap-1">
              {profile.nome} {profile.certificado && <FaCheckCircle className="text-green-500" />}
            </h3>
            <div className="flex items-center gap-1 text-white text-sm">
              <FaMapMarkerAlt className="text-pink-600" />
              {profile.cidade}
            </div>
          </div>
        </motion.div>

        {/* Tag e Tempo */}
        <div className="bg-pink-100 dark:bg-[#3a1a2a] text-gray-800 dark:text-gray-200 px-3 py-3 rounded-xl shadow-md mt-2 flex flex-col justify-between flex-1 min-h-[70px] relative">
          <div className="flex items-start justify-between gap-2">
            <span className="block break-words italic text-xs md:text-lg leading-tight max-h-[60px] overflow-hidden font-arial animate-flash">
              "{profile.tag}"
            </span>
            <FaCommentDots className="text-yellow-600 text-md min-w-[18px] min-h-[18px] flex-shrink-0" />
          </div>
          <div className="text-xs font-arial text-black dark:text-gray-100 flex items-center gap-1 mt-2">
            <FaClock className="text-yellow-500 h-4 w-4 font-normal" />
            {timeAgo(profile.tagtimestamp)}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}