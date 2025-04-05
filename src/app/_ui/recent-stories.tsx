"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fetchProfiles } from "@/backend/services/profileService";
import { FaMapMarkerAlt, FaPlayCircle, FaFireAlt, FaClock, FaPauseCircle } from "react-icons/fa";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/backend/context/LanguageContext";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3 }, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" },
};

interface Profile {
  nome: string;
  cidade?: string;
  stories?: string[];
  photos?: string[];
  tagtimestamp: string;
}

export function RecentStories() {
  const [stories, setStories] = useState<{ profile: Profile; story: string }[]>([]);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [playing, setPlaying] = useState<Record<number, boolean>>({});

  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProfiles: Profile[] = await fetchProfiles();
        const profilesWithStories = fetchedProfiles.filter(
          (p) => p.stories && p.stories.length > 0
        );
        const allStories = profilesWithStories
          .flatMap((profile) =>
            profile.stories!.map((story) => ({ profile, story }))
          )
          .sort((a, b) => new Date(b.profile.tagtimestamp).getTime() - new Date(a.profile.tagtimestamp).getTime())
          .slice(0, 4);
        setStories(allStories);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    }
    fetchData();
  }, []);

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (playing[index]) {
        video.pause();
      } else {
        video.play();
      }
      setPlaying((prev) => ({ ...prev, [index]: !prev[index] }));
    }
  };

  const openStory = (story: string) => setSelectedStory(story);
  const closeStory = () => setSelectedStory(null);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const timeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: pt });
  };

  return (
    <section className="relative py-12 px-4 bg-[#f2ebee] dark:bg-[#100007]">
      <motion.div className="container mx-auto" initial="initial" animate="animate" variants={staggerChildren}>
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white flex items-center gap-2"
            variants={fadeInUp}
          >
           {t("StoriesComponent.title")}
            <FaFireAlt className="text-yellow-500" />
          </motion.h2>
          <Link href="/stories" passHref>
            <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-2 font-body">
              Ver Todos
            </Button>
          </Link>
        </div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" variants={staggerChildren}>
          {stories.length > 0 ? (
            stories.map(({ profile, story }, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative bg-white dark:bg-[#300d1b] rounded-3xl shadow-lg overflow-hidden cursor-pointer"
              >
                <div className="relative aspect-[4/4] overflow-hidden">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[index] = el;
                    }}
                    src={story}
                    className="w-full h-full object-cover rounded-t-3xl"
                    loop
                    muted
                  />
                  <div className="absolute top-2 left-2 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 flex items-center">
                    <FaFireAlt className="text-yellow-500 mr-1" />
                    Story em Destaque
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-600">
                        <Image
                          src={profile.photos?.[0] || "/logo.webp"}
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
                          {profile.cidade || "Desconhecida"}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 flex items-center gap-1 mt-1">
                      <FaClock className="text-yellow-500" />
                      {timeAgo(profile.tagtimestamp)}
                    </p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => togglePlay(index)}>
                      {playing[index] ? (
                        <FaPauseCircle className="text-white/80" size={60} />
                      ) : (
                        <FaPlayCircle className="text-white/80" size={60} />
                      )}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => openStory(story)}
                  className="absolute top-2 right-2 bg-pink-600 text-white text-xs py-1 px-2 rounded-full z-10 hover:bg-pink-700"
                >
                  Ver Story
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-900 dark:text-white col-span-full text-center">
              Nenhum story recente disponível
            </p>
          )}
        </motion.div>
      </motion.div>

      {selectedStory && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <video
            src={selectedStory}
            className="max-w-[90%] max-h-[90%] rounded-3xl shadow-lg"
            autoPlay
            controls
          />
          <button
            onClick={closeStory}
            className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full hover:bg-black/70"
          >
            <X size={32} />
          </button>
        </motion.div>
      )}
    </section>
  );
}

export default RecentStories;