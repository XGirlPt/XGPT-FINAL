"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { MdFiberManualRecord, MdVerified } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../backend/context/LanguageContext";
import { FaVideo, FaCrown, FaClock, FaCommentDots, FaMapMarkerAlt, FaPen } from "react-icons/fa";
import { supabase } from "@/backend/database/supabase";
import StoryBig from '@/components/profile/story-big';

// Variantes de animação
const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };
const staggerChildren = { animate: { transition: { staggerChildren: 0.1 } } };
const storyCircleVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: [0, -20, 0],
    scale: [1, 1.05, 1],
    transition: {
      y: { repeat: Infinity, repeatType: "loop", duration: 3, ease: "easeInOut" },
      scale: { repeat: Infinity, repeatType: "loop", duration: 1.5, ease: "easeInOut" },
      opacity: { duration: 0.6 },
    },
  },
  hover: { scale: 1.15, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -30, scale: 0.9, transition: { duration: 0.5 } },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
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
  userUID: string;
}

const timeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true, locale: pt });
};

const storyPositions = [
  "-top-12 lg:top-2 left-4 lg:left-24 w-20 h-20",
  "-top-12 lg:top-2 right-4 lg:right-24 w-20 h-20",
  "-bottom-24 lg:bottom-4 left-4 lg:-left-12 w-28 h-28",
  "-bottom-24 lg:bottom-4 right-4 lg:-right-12 w-24 h-24",
];

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

export function HeroSection({ profiles }: { profiles: Profile[] }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [authorBadges, setAuthorBadges] = useState<Record<string, boolean>>({});

  // Memoizar profilesWithStories e profilesWithTag
  const profilesWithStories = useMemo(
    () => profiles.filter((profile) => profile.stories && profile.stories.length > 0),
    [profiles]
  );
  const profilesWithTag = useMemo(
    () => profiles.filter((profile) => profile.tag && profile.tag.trim() !== ""),
    [profiles]
  );

  // Memoizar checkAuthorBadge
  const memoizedCheckAuthorBadge = useCallback(checkAuthorBadge, []);

  // Verificar badges de autora
  useEffect(() => {
    const fetchAuthorBadges = async () => {
      const badges: Record<string, boolean> = {};
      for (const profile of profilesWithTag) {
        const hasApprovedArticle = await memoizedCheckAuthorBadge(profile.userUID);
        badges[profile.userUID] = hasApprovedArticle;
      }
      setAuthorBadges(badges);
    };

    fetchAuthorBadges();
  }, [profilesWithTag, memoizedCheckAuthorBadge]);

  // Rotação automática dos stories
  useEffect(() => {
    if (profilesWithStories.length <= 4) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 4) % profilesWithStories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [profilesWithStories]);

  const displayedStories = useMemo(() => {
    const sliced = profilesWithStories.slice(currentIndex, currentIndex + 4);
    if (sliced.length < 4 && profilesWithStories.length > 0) {
      const remaining = 4 - sliced.length;
      return [...sliced, ...profilesWithStories.slice(0, remaining)];
    }
    return sliced;
  }, [profilesWithStories, currentIndex]);

  const openStory = (profile: Profile, storyIndex: number) => {
    setSelectedProfile({ ...profile, storyURL: profile.stories });
    setCurrentIndex(storyIndex);
  };

  const closeStory = () => setSelectedProfile(null);

  return (
    <section className="relative md:px-4">
      <motion.div className="text-center" initial="initial" animate="animate" variants={staggerChildren}>
        <div className="relative">
          <motion.div className="mb-8" variants={fadeInUp}>
            <span className="bg-[#f1c0d3] text-pink-600 lg:px-4 lg:py-1 px-2 py-1 rounded-full text-xs font-medium">
              {t('heroSection.badge')}
            </span>
          </motion.div>

          <motion.h1 className="text-5xl md:text-5xl mb-2 text-gray-900 dark:text-white" variants={fadeInUp}>
            {t('heroSection.title.line1')}
            <br />
            {t('heroSection.title.line2')}
          </motion.h1>

          <motion.p className="text-xl font-body text-gray-600 dark:text-gray-300 mb-12" variants={fadeInUp}>
            {t("dashboard.meta_description")}
          </motion.p>

          {displayedStories.map((profile, index) => (
            <motion.div
              key={`${profile.nome}-${index}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={storyCircleVariants}
              whileHover="hover"
              className={`absolute ${storyPositions[index]} cursor-pointer group`}
              onClick={() => openStory(profile, 0)} // Abre o primeiro story do perfil
            >
              <div className="relative rounded-full overflow-hidden w-full h-full">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[3px]"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{
                    scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                    opacity: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                  }}
                >
                  <div className="bg-white dark:bg-gray-900 rounded-full w-full h-full" />
                </motion.div>
                <video
                  src={profile.stories[0]}
                  className="relative object-cover w-full h-full rounded-full z-10"
                  autoPlay
                  loop
                  muted
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              </div>
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

        <motion.div variants={fadeInUp} className="w-full pt-20 lg:pt-0">
          <div className="-mx-4 sm:-mx-4 lg:-mx-16 xl:-mx-36">
            <Carousel opts={{ align: "center", loop: true }} plugins={[Autoplay({ delay: 2000 })]}>
              <CarouselContent className="flex pb-4" style={{ gap: "0px" }}>
                {profilesWithTag.map((profile) =>
                  Array.isArray(profile.photos) && profile.photos.length > 0 && profile.photos[0] ? (
                    <CarouselItem key={profile.nome} className="basis-[45%] md:basis-[15%] pl-0.7">
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
                                {profile.nome}
                                {profile.certificado && <MdVerified className="text-green-500" />}
                                {authorBadges[profile.userUID] && (
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
                          </motion.div>
                          <div className="bg-pink-100 dark:bg-[#300d1b] text-gray-800 dark:text-gray-300 px-3 py-1 rounded-xl shadow-md mt-2 flex flex-col justify-between flex-1 min-h-[70px] relative">
                            <div className="flex items-start justify-between gap-2">
                              <span className="block break-words italic text-xs md:text-sm max-h-[70px] overflow-hidden font-arial animate-flash">
                                "{profile.tag}"
                              </span>
                              <FaCommentDots className="text-yellow-600 text-md min-w-[18px] min-h-[18px] flex-shrink-0" />
                            </div>
                            <div className="text-xs font-arial text-black dark:text-gray-200 flex items-center gap-1 mt-1 mb-1">
                              <FaClock className="text-yellow-500 h-4 w-4 font-normal text-xs" />
                              {timeAgo(profile.tagtimestamp)}
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </CarouselItem>
                  ) : null
                )}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-2">
                <CarouselPrevious className="static flex translate-x-0 bg-white text-pink-600 dark:text-white dark:bg-black translate-y-0 w-10 h-10 rounded-full" />
                <CarouselNext className="static flex translate-x-0 bg-pink-600 hover:bg-pink-700 text-white translate-y-0 w-10 h-10 rounded-full" />
              </div>
            </Carousel>
          </div>
        </motion.div>
      </motion.div>

      {selectedProfile && (
        <StoryBig
          selectedProfile={{
            storyURL: selectedProfile.stories,
            nome: selectedProfile.nome,
            cidade: selectedProfile.cidade,
            photos: selectedProfile.photos,
          }}
          onClose={closeStory}
          currentIndex={currentIndex}
        />
      )}
    </section>
  );
}

export default HeroSection;