"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { MdVerified } from "react-icons/md";
import { FaCrown, FaMapMarkerAlt, FaVideo, FaClock, FaPen } from "react-icons/fa";
import { MdFiberManualRecord } from "react-icons/md";
import { motion } from "framer-motion";
import { useLanguage } from "../../backend/context/LanguageContext";
import Link from "next/link";
import { supabase } from "@/backend/database/supabase";
import { useTranslation } from 'react-i18next';

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
      type: "spring",
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
      type: "spring",
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
  featured_until?: string;
  userUID?: string;
}

export function FeaturedAds({ profiles, currentPage }: { profiles: Profile[]; currentPage: number }) {
  const [timeElapsedList, setTimeElapsedList] = useState<string[]>([]);
  const [authorBadges, setAuthorBadges] = useState<Record<string, boolean>>({});
  const ITEMS_PER_PAGE = 12;
  const { t, i18n } = useTranslation(); // Única declaração de 't'
  const { language } = useLanguage();

  const formatTimeElapsed = useCallback((minutesElapsed: number): string => {
    const hoursElapsed = minutesElapsed / 60;

    if (hoursElapsed > 48) {
      return t('time_elapsed.more_than_48_hours');
    } else if (minutesElapsed < 60) {
      return `${t('time_elapsed.ago')} ${minutesElapsed} ${t(`time_elapsed.minute${minutesElapsed !== 1 ? 's' : ''}`)}`;
    } else {
      const hours = Math.floor(hoursElapsed);
      const minutes = minutesElapsed % 60;
      return `${t('time_elapsed.ago')} ${hours} ${t(`time_elapsed.hour${hours !== 1 ? 's' : ''}`)}${
        minutes > 0 ? ` ${minutes} ${t(`time_elapsed.minute${minutes !== 1 ? 's' : ''}`)}` : ''
      }`;
    }
  }, [t]);

  const calculateTimeElapsed = useCallback(
    (tagTimestamp: string): string => {
      const timestampDate = new Date(tagTimestamp);
      if (isNaN(timestampDate.getTime())) {
        return "Tempo indeterminado";
      }
      const currentTime = Date.now();
      const elapsedTime = currentTime - timestampDate.getTime();
      const minutesElapsed = Math.floor(elapsedTime / (1000 * 60));
      return formatTimeElapsed(minutesElapsed);
    },
    [formatTimeElapsed]
  );

  // Função para verificar se o usuário tem artigos aprovados
  const checkAuthorBadge = useCallback(async (userUID: string | undefined) => {
    if (!userUID) return false;

    const { data, error } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("author_id", userUID)
      .eq("status", "approved")
      .limit(1);

    if (error) {
      console.error("Erro ao verificar artigos aprovados:", error.message, error.details);
      return false;
    }
    console.log(`Artigos aprovados para userUID ${userUID}:`, data.length > 0);
    return data.length > 0;
  }, []);

  useEffect(() => {
    if (!profiles || profiles.length === 0) return;

    console.log("Perfis recebidos no FeaturedAds:", profiles);

    const timeElapsed = profiles.map((profile) => calculateTimeElapsed(profile.tagtimestamp));
    setTimeElapsedList(timeElapsed);

    // Verifica badges para todos os perfis
    const fetchBadges = async () => {
      const badgeStatus: Record<string, boolean> = {};
      for (const profile of profiles) {
        if (profile.userUID) {
          badgeStatus[profile.userUID] = await checkAuthorBadge(profile.userUID);
        }
      }
      console.log("Badge status:", badgeStatus);
      setAuthorBadges(badgeStatus);
    };
    fetchBadges();

    const interval = setInterval(() => {
      const updatedTimeElapsed = profiles.map((profile) => calculateTimeElapsed(profile.tagtimestamp));
      setTimeElapsedList(updatedTimeElapsed);
    }, 60000);

    return () => clearInterval(interval);
  }, [profiles, calculateTimeElapsed, checkAuthorBadge]);

  const sortedProfiles = profiles
    ? [...profiles].sort((a, b) => {
        const aFeatured = a.featured_until && new Date(a.featured_until) > new Date();
        const bFeatured = b.featured_until && new Date(b.featured_until) > new Date();

        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;

        const dateA = new Date(a.tagtimestamp).getTime();
        const dateB = new Date(b.tagtimestamp).getTime();
        return dateB - dateA;
      })
    : [];

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProfiles = sortedProfiles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="flex items-center justify-between mb-4" variants={itemVariants}>
          <h2 className="lg:text-5xl text-3xl">{t('featuredAds.title')}</h2>
          <Link href="/ads" className="text-sm text-white px-4 py-2 rounded-full bg-pink-600 font-body hidden md:block">
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
                {profile.photos?.[0] ? (
                  <div className="relative rounded-3xl overflow-hidden w-full h-48">
                    <Image
                      src={profile.photos[0] || "/logo.webp"}
                      alt={profile.nome}
                      width={500}
                      height={500}
                      className="object-cover rounded-3xl w-full h-full"
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
                      <h3 className="text-base font-semibold text-white flex items-center gap-1">
                        {profile.nome}
                        {profile.certificado && <MdVerified className="text-green-500" />}
                        {profile.userUID && authorBadges[profile.userUID] && (
                          <span className="ml-2 bg-yellow-200 text-yellow-800 text-xs font-semibold py-0.5 px-1.5 rounded-full flex items-center">
                            <FaPen className="text-yellow-800 mr-1" size={10} />
                            Autora em Blog
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-1 text-white text-sm">
                        <FaMapMarkerAlt className="text-pink-600" />
                        {profile.cidade}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="p-3 flex flex-col gap-2">
                  <motion.p
                    className="text-sm text-gray-700 dark:text-gray-300 italic px-3 py-1 rounded-lg"
                    variants={badgeVariants}
                  >
                    {'"' + profile.tag + '"'}
                  </motion.p>
                  <div className="text-xs flex items-center gap-1">
                    <FaClock className="text-yellow-500 h-4 w-4" /> {timeElapsedList[index]}
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
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          height: "400px",
          width: "400px",
          borderRadius: "200px",
          bottom: "-100px",
          left: "-100px",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default FeaturedAds;