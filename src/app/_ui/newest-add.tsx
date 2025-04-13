"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { FaVideo, FaCrown, FaClock, FaCommentDots, FaMapMarkerAlt, FaPen } from "react-icons/fa";
import { MdFiberManualRecord, MdVerified } from "react-icons/md";
import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/backend/database/supabase";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/backend/context/LanguageContext";
import Link from "next/link";


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
  userUID: string;
}

interface NewestAddsProps {
  profiles: Profile[];
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
      ease: "easeOut",
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
      ease: "easeOut",
    },
  },
};

// Função para verificar se o perfil tem um artigo aprovado (memoizada fora do componente)
const checkAuthorBadge = async (userUID: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("status")
    .eq("author_id", userUID)
    .eq("status", "approved")
    .limit(1);

  if (error) {
    console.error("Erro ao verificar artigo aprovado:", error.message);
    return false;
  }

  return data && data.length > 0;
};

const NewestAdds: React.FC<NewestAddsProps> = ({
  profiles = [],
  onProfileClick,
  customClass,
}) => {
  // Memoizar sortedProfiles para evitar recriação desnecessária
  const sortedProfiles = useMemo(
    () =>
      profiles
        ? [...profiles].sort((a, b) => {
            const dateA = new Date(a.tagtimestamp).getTime();
            const dateB = new Date(b.tagtimestamp).getTime();
            return dateB - dateA; // Ordena do mais recente para o mais antigo
          })
        : [],
    [profiles]
  );

  const { t } = useTranslation();
  const { language } = useLanguage();
  // Memoizar displayedProfiles (limite de 15 perfis)
  const displayedProfiles = useMemo(() => sortedProfiles.slice(0, 30), [sortedProfiles]);

  // Função para formatar o tempo decorrido
  const timeAgo = useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true, locale: pt });
  }, []);

  const [authorBadges, setAuthorBadges] = useState<Record<string, boolean>>({});

  // Memoizar a função checkAuthorBadge
  const memoizedCheckAuthorBadge = useCallback(checkAuthorBadge, []);

  // Verificar badges de autora para cada perfil ao carregar
  useEffect(() => {
    const fetchAuthorBadges = async () => {
      const badges: Record<string, boolean> = {};
      for (const profile of displayedProfiles) {
        const hasApprovedArticle = await memoizedCheckAuthorBadge(profile.userUID);
        badges[profile.userUID] = hasApprovedArticle;
      }
      setAuthorBadges(badges);
    };

    fetchAuthorBadges();
  }, [displayedProfiles, memoizedCheckAuthorBadge]);

  return (
    <motion.div
      className={`relative w-full px-4 ${customClass || ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div className="flex items-center justify-between mb-4" variants={titleVariants}>
      <h2 className="lg:text-5xl text-3xl">{t("newestAdds.title")}</h2>
            </motion.div>

      {/* Grid com 3 linhas e 5 colunas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 py-4">
        {displayedProfiles.map((profile, index) => (
                      <Link href={`/escort/${profile.nome}`} passHref key={index}>
          
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-3xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:shadow-2xl flex flex-col justify-between"
            onClick={onProfileClick}
          >
            {/* Foto de perfil com Nome e Cidade sobrepostos */}
            <motion.div
              className="relative aspect-[4/4] rounded-2xl overflow-hidden"
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
            >
              <Image
                src={profile.photos[0] || "/logo.webp"}
                alt={profile.nome}
                fill
                className="object-cover rounded-2xl"
              />
              {/* Badges */}
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
                <div className="absolute top-10 right-2 md:right-3 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 flex items-center">
                  <FaVideo className="text-white mr-1" />
                  <span className="text-xs">Stories</span>
                </div>
              )}
              {/* Gradiente com Nome e Cidade */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex flex-col justify-end">
                <h3 className="text-lg md:text-xl font-semibold text-white flex items-center gap-1">
                  {profile.nome}
                  {profile.certificado && <MdVerified className="text-green-500" />}
                  {authorBadges[profile.userUID] && (
                    <span className="ml-2 bg-yellow-200 text-yellow-800 text-xs font-semibold py-0.5 px-1.5 rounded-full flex items-center">
                      <FaPen className="text-yellow-800 mr-1" size={10} />
                      Autora em Blog
                    </span>
                  )}
                </h3>
                <div className="flex items-center gap-1 text-white text-sm mt-1">
                  <FaMapMarkerAlt className="text-sm text-pink-800" />
                  {profile.cidade}
                </div>
              </div>
            </motion.div>
            {/* Conteúdo da Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col justify-between flex-1 p-4 bg-white dark:bg-[#300d1b]"
            >
              {/* Tag/Status */}
              <div className="flex items-start justify-between gap-2">
                <span className="block break-words italic text-xs md:text-sm max-h-[70px] overflow-hidden font-arial">
                &quot;{profile.tag}&quot;
                </span>
                <FaCommentDots className="text-yellow-600 text-md min-w-[18px] min-h-[18px] flex-shrink-0" />
              </div>
              <div className="text-xs font-arial text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-1">
                <FaClock className="text-yellow-500 h-4 w-4" />
                {timeAgo(profile.tagtimestamp)}
              </div>
            </motion.div>
          </motion.div>
          </Link>

        ))}
      </div>

      {/* Efeito de fundo */}
      <motion.div
        className="absolute rounded-l-full z-0 bg-[#f2cadb] dark:bg-[#2e0415] hidden md:block"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          height: "400px",
          width: "200px",
          top: "-100px",
          right: "0",
          filter: "blur(80px)",
        }}
      />
    </motion.div>
  );
};

export default NewestAdds;