// src/app/escort/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProfiles } from '@/backend/services/profileService';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import { FaVideo, FaCrown, FaClock, FaCommentDots, FaMapMarkerAlt, FaFilter } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { Profile } from '@/backend/types';
import { Button } from '@/components/ui/button';
import FiltroDistrito from '@/components/filtros/filtro-distrito';
import Filtro from '@/components/layout/filtro';
import StoryBig from '@/components/profile/story-big';
import { setAppliedFilters } from '@/backend/reducers/profileSlice';

export const metadata = {
  title: 'XGirl - Acompanhantes em Portugal',
  description: 'Encontre as melhores acompanhantes e massagistas eróticas em Portugal. Filtre por localização, idade, tarifa e mais.',
  keywords:
    'Acompanhantes, Escort Portugal, Escort Lisboa, Escort Porto, Massagistas Eróticas, Anúncios Eróticos, Portugal',
  openGraph: {
    title: 'XGirl - Acompanhantes e Escort em Portugal',
    description: 'Descubra acompanhantes de luxo em Lisboa, Porto, Faro e mais. Filtre e encontre o perfil ideal.',
    url: 'https://xgirl.pt/escort',
    type: 'website',
    images: ['/public/photos/logo.webp'],
  },
};

const avatarVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  hover: {
    scale: 1.15,
    transition: { duration: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  hover: { scale: 1.03, boxShadow: '0 8px 16px rgba(0,0,0,0.15)', transition: { duration: 0.2 } },
};

const timeAgo = (timestamp: string | Date) => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true, locale: pt });
};

export default function EscortPage() {
  const dispatch = useDispatch();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedStory, setSelectedStory] = useState<{ profile: Profile; index: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const appliedFilters = useSelector((state: any) => state.profile.appliedFilters || {});
  const [filters, setFilters] = useState({
    distrito: '',
  });

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setLoading(true);
        const fetchedProfiles = await fetchProfiles();
        console.log('[EscortPage] Perfis carregados:', fetchedProfiles);
        const filtered = applyFilters(fetchedProfiles, appliedFilters);
        const sortedProfiles = filtered
          .filter((profile) => profile.tag && profile.tag.trim() !== '')
          .sort((a, b) => {
            if (a.premium && !b.premium) return -1;
            if (!a.premium && b.premium) return 1;
            return new Date(b.tagtimestamp ?? 0).getTime() - new Date(a.tagtimestamp ?? 0).getTime();
          });
        setProfiles(sortedProfiles);
      } catch (error) {
        console.error('[EscortPage] Erro ao carregar perfis:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfiles();
  }, [appliedFilters]);

  const applyFilters = (profiles: Profile[], filters: any) => {
    return profiles.filter((profile) => {
      if (filters.idade && (profile.idade < filters.idade[0] || profile.idade > filters.idade[1])) return false;
      if (filters.tarifa && (profile.tarifa < filters.tarifa[0] || profile.tarifa > filters.tarifa[1])) return false;
      if (filters.distrito && filters.distrito !== profile.distrito) return false;
      if (filters.lingua && !filters.lingua.some((lang: string) => profile.lingua?.includes(lang))) return false;
      if (filters.altura && profile.altura !== filters.altura) return false;
      if (filters.origem && filters.origem !== profile.origem) return false;
      if (filters.olhos && filters.olhos !== profile.olhos) return false;
      if (filters.seIos && filters.seios !== profile.seios) return false;
      if (filters.mamas && filters.mamas !== profile.mamas) return false;
      if (filters.pelos !== undefined && filters.pelos !== (profile.pelos === 'Sim')) return false;
      if (filters.tatuagem !== undefined && filters.tatuagem !== (profile.tatuagem === 'Sim')) return false;
      if (filters.certificado !== undefined && filters.certificado !== profile.certificado) return false;
      return true;
    });
  };

  const handleApplyFilters = (newFilters: any) => {
    dispatch(setAppliedFilters(newFilters));
    setShowMoreFilters(false);
  };

  const handleResetFilters = () => {
    setFilters({ distrito: '' });
    dispatch(setAppliedFilters({}));
  };

  const openStory = (profile: Profile, index: number) => {
    setSelectedStory({ profile, index });
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  if (loading) {
    return (
      <main className="bg-[#f2ebee] dark:bg-[#100007] min-h-screen">
        <section className="container mx-auto px-4 py-8 relative">
          <p className="text-center text-gray-900 dark:text-white text-2xl">Carregando...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#f2ebee] dark:bg-[#100007] min-h-screen">
      <section className="container mx-auto px-4 pt-12 pb-8 relative">
        {/* Gradiente Decorativo */}
        <div
          className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415]"
          style={{
            height: '300px',
            width: '300px',
            borderRadius: '150px',
            top: '-60px',
            left: '-60px',
            filter: 'blur(50px)',
            zIndex: 0,
          }}
        />

        {/* Hero Section: Avatares */}
        <motion.div
          className="relative z-10 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Acompanhantes e Massagistas Eróticas
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">
            Encontre as melhores acompanhantes em Portugal
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {profiles
              .filter((p) => p.premium || p.stories?.length > 0)
              .slice(0, 10)
              .map((profile, index) => (
                <Link key={profile.nome} href={`/escort/${profile.nome}`} passHref>
                  <motion.div
                    variants={avatarVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer group"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[2px]"
                      animate={{ opacity: [0.85, 1, 0.85] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                      <div className="bg-white dark:bg-[#300d1b] rounded-full w-full h-full" />
                    </motion.div>
                    <Image
                      src={profile.photos[0] || '/logo.webp'}
                      alt={profile.nome}
                      fill
                      className="object-cover rounded-full z-10"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-1">
                      <span className="truncate">{profile.nome}</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="relative z-10 bg-white dark:bg-[#1a0a10] rounded-2xl p-4 mb-6 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <FiltroDistrito
                value={filters.distrito}
                onChange={(value: string) => setFilters({ ...filters, distrito: value })}
                bgColor="bg-white dark:bg-[#1a0a10]"
                className="rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-pink-600"
              />
            </div>
            <Button
              className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-4 py-2 flex items-center gap-2"
              onClick={() => setShowMoreFilters(true)}
            >
              <FaFilter size={16} />
              Mais Filtros
            </Button>
          </div>
        </motion.div>

        {/* Grade de Perfis */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {profiles.map((profile) =>
            Array.isArray(profile.photos) && profile.photos.length > 0 && profile.photos[0] ? (
              <Link key={profile.nome} href={`/escort/${profile.nome}`} passHref>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-pink-100 dark:bg-[#300d1b] rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-2xl w-[220px] h-[340px] flex flex-col"
                >
                  <div className="relative w-full h-[65%] rounded-t-2xl overflow-hidden">
                    <Image
                      src={profile.photos[0]}
                      alt={profile.nome}
                      fill
                      className="object-cover w-full h-full"
                    />
                    {profile.premium && (
                      <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 flex items-center shadow-md">
                        <FaCrown className="mr-1" />
                        Premium
                      </div>
                    )}
                    {profile.live && (
                      <div className="absolute top-2 left-2 bg-red-700 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 animate-pulse flex items-center">
                        <span>Live Cam</span>
                      </div>
                    )}
                    {Array.isArray(profile.stories) && profile.stories.length > 0 && (
                      <div
                        className="absolute top-10 right-2 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-50 flex items-center cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          openStory(profile, 0);
                        }}
                      >
                        <FaVideo className="mr-1" />
                        Stories
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <h3 className="text-base font-semibold text-white flex items-center gap-1">
                        {profile.nome} {profile.certificado && <MdVerified className="text-green-500" />}
                      </h3>
                      <div className="flex items-center gap-1 text-white text-sm">
                        <FaMapMarkerAlt className="text-pink-600" />
                        {profile.cidade}
                      </div>
                    </div>
                  </div>
                  <div className="bg-pink-100 dark:bg-[#300d1b] text-gray-800 dark:text-gray-300 px-3 py-1 rounded-b-2xl flex flex-col justify-between flex-1 min-h-[70px]">
                    <div className="flex items-start justify-between gap-2">
                      <span className="block break-words italic text-sm max-h-[70px] overflow-hidden font-arial">
                      &quot;{profile.tag}&quot;
                      </span>
                      <FaCommentDots className="text-yellow-600 text-md min-w-[18px] min-h-[18px] flex-shrink-0" />
                    </div>
                    <div className="text-xs font-arial text-black dark:text-gray-200 flex items-center gap-1 mt-1 mb-1">
                      <FaClock className="text-yellow-500 h-4 w-4" />
                      {timeAgo(profile.tagtimestamp ?? new Date())}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : null
          )}
        </motion.div>

        {/* Modal de Mais Filtros */}
        <Filtro
          open={showMoreFilters}
          onOpenChange={setShowMoreFilters}
          onApplyFilters={handleApplyFilters}
        />

        {/* Modal de Story */}
        {selectedStory && (
          <StoryBig
            selectedProfile={{
              storyURL: selectedStory.profile.stories,
              nome: selectedStory.profile.nome,
              cidade: selectedStory.profile.cidade,
              photos: selectedStory.profile.photos,
            }}
            onClose={closeStory}
            currentIndex={selectedStory.index}
          />
        )}

        {/* Gradiente Inferior */}
        <div
          className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415]"
          style={{
            height: '300px',
            width: '300px',
            borderRadius: '150px',
            bottom: '-60px',
            right: '-60px',
            filter: 'blur(50px)',
            zIndex: 0,
          }}
        />
      </section>
    </main>
  );
}