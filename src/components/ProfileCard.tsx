'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaVideo, FaCrown, FaClock, FaCommentDots, FaMapMarkerAlt } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';

// Interface para os dados do perfil
export interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  stories?: string[];
  tag?: string;
  tagtimestamp: string;
  certificado: boolean;
  live: boolean | string;
  premium?: boolean | string;
  distrito?: string; // Opcional, para compatibilidade com GirlsPage
}

// Variantes de animação para a card
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  hover: { scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.2)', transition: { duration: 0.2 } },
};

// Função para formatar o tempo decorrido
const timeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true, locale: pt });
};

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  // Verificações de segurança para os dados
  const hasPhotos = profile.photos && profile.photos.length > 0 && profile.photos[0];
  const hasStories = profile.stories && profile.stories.length > 0;
  const hasTag = profile.tag && profile.tag.trim() !== '';

  // Log para depuração
  console.log('[ProfileCard] Dados do perfil:', profile);

  if (!hasPhotos) {
    console.warn('[ProfileCard] Perfil sem foto válida:', profile.nome);
    return null; // Não renderiza se não houver foto
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative bg-pink-100 dark:bg-[#300d1b] rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all flex flex-col w-full h-full"
    >
      <Link href={`/escort/${profile.nome}`} passHref>
        <motion.div className="relative w-full h-[100%] rounded-xl overflow-hidden">
          <Image
            src={profile.photos[0]}
            alt={profile.nome}
            fill
            className="object-cover w-full h-full"
            onError={(e) => console.error('[ProfileCard] Erro ao carregar imagem:', profile.photos[0], e)}
          />
          {profile.premium && (
            <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 flex items-center shadow-md">
              <FaCrown className="text-white mr-1" />
              <span className="text-xs">Premium</span>
            </div>
          )}
          {profile.live && (
            <div className="absolute top-2 left-2 bg-red-700 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 animate-pulse flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
              <span className="text-xs">Live Cam</span>
            </div>
          )}
          {hasStories && (
            <div className="absolute top-10 right-2 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-50 flex items-center">
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
            &ldquo;{hasTag ? profile.tag : 'Sem tag disponível'}&ldquo;
            </span>
            <FaCommentDots className="text-yellow-600 text-md min-w-[18px] min-h-[18px] flex-shrink-0" />
          </div>
          <div className="text-xs font-arial text-black dark:text-gray-200 flex items-center gap-1 mt-2">
            <FaClock className="text-yellow-500 h-4 w-4 font-normal" />
            {timeAgo(profile.tagtimestamp)}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProfileCard;