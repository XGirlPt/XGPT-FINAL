"use client";

import { Metadata } from "next";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fetchProfiles } from "@/backend/services/profileService";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { FaVideo, FaCrown, FaClock, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { Profile } from "@/backend/types";
import { X } from "lucide-react";
import CaroselRound from "@/components/ui/carosel-round";
import { setAppliedFilters } from "@/backend/reducers/profileSlice";

export const metadata: Metadata = {
  title: "XGirl - Acompanhantes",
  description: "Bem-vindo a XGirl, o melhor site de classificados eróticos, Acompanhantes e Escort em Portugal.",
  keywords:
    "Acompanhantes, Acompanhantes Luxo, Escort, Escort Portugal, Escort Lisboa, Escort Porto, Escort Faro, Escort Lisboa, Acompanhantes, Anuncios Eróticos, massagistas Eróticas, anúncios, Portugal, serviços",
  authors: [{ name: "Xgirl" }],
  openGraph: {
    title: "Acompanhantes de luxo e Escort Eróticas em Portugal",
    description: "Encontre as melhores acompanhantes e massagistas eróticas em Portugal. Consulte os nossos anúncios e as novidades.",
    url: "https://xgirl.pt",
    type: "website",
    images: ["/public/photos/logo.webp"],
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)", transition: { duration: 0.2 } },
};

const timeAgo = (timestamp: string | Date) => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true, locale: pt });
};

const applyFilters = (profiles: Profile[], filters: any) => {
  return profiles.filter((profile) => {
    if (filters.idade && (profile.idade < filters.idade[0] || profile.idade > filters.idade[1])) return false;
    if (filters.tarifa && (profile.tarifa < filters.tarifa[0] || profile.tarifa > filters.tarifa[1])) return false;
    if (filters.lingua && !filters.lingua.some((lang: string) => profile.lingua?.includes(lang))) return false;
    if (filters.altura && profile.altura !== filters.altura) return false;
    if (filters.distrito && filters.distrito !== profile.distrito) return false;
    if (filters.origem && filters.origem !== profile.origem) return false;
    if (filters.olhos && filters.olhos !== profile.olhos) return false;
    if (filters.seios && filters.seios !== profile.seios) return false;
    if (filters.mamas && filters.mamas !== profile.mamas) return false;
    if (filters.pelos !== undefined && filters.pelos !== (profile.pelos === "Sim")) return false;
    if (filters.tatuagem !== undefined && filters.tatuagem !== (profile.tatuagem === "Sim")) return false;
    if (filters.certificado !== undefined && filters.certificado !== profile.certificado) return false;
    return true;
  });
};

export default function PagePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedStory, setSelectedStory] = useState<{ profile: Profile; story: string } | null>(null);
  const [searchDistrict, setSearchDistrict] = useState("");
  const [loading, setLoading] = useState(true); // Adicionado estado de carregamento
  const appliedFilters = useSelector((state: any) => state.profile.appliedFilters || {});

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setLoading(true);
        const fetchedProfiles = await fetchProfiles();
        console.log("[PagePage] Perfis carregados:", fetchedProfiles);
        const filtered = applyFilters(fetchedProfiles, appliedFilters);
        const sortedProfiles = filtered
          .filter((profile) => profile.tag && profile.tag.trim() !== "")
          .sort((a, b) => {
            if (a.premium && !b.premium) return -1;
            if (!a.premium && b.premium) return 1;
            return new Date(b.tagtimestamp ?? 0).getTime() - new Date(a.tagtimestamp ?? 0).getTime();
          });
        setProfiles(sortedProfiles);
      } catch (error) {
        console.error("[PagePage] Erro ao carregar perfis:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfiles();
  }, [appliedFilters]);

  const openStory = (profile: Profile, story: string) => {
    setSelectedStory({ profile, story });
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  const filteredProfiles = profiles.filter((profile) =>
    searchDistrict ? profile.distrito?.toLowerCase() === searchDistrict.toLowerCase() : true
  );

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
      <section className="container mx-auto px-4 py-8 relative">
        <div
          className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415]"
          style={{
            height: "500px",
            width: "500px",
            borderRadius: "250px",
            top: "-100px",
            left: "-100px",
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />

        <CaroselRound profiles={profiles} />

        <motion.div
          className="text-center mb-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-[#f1c0d3] text-pink-600 px-4 py-1 rounded-full text-xs font-medium">
            ESCORTS EM PORTUGAL
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4">
            Acompanhantes e Massagistas Eróticas
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-2">
            {t("dashboard.meta_description")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {filteredProfiles.map((profile) =>
            Array.isArray(profile.photos) && profile.photos.length > 0 && profile.photos[0] ? (
              <Link key={profile.nome} href={`/escort/${profile.nome}`} passHref>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
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
                        <span className="text-xs">Live Cam</span>
                      </div>
                    )}
                    {Array.isArray(profile.stories) && profile.stories.length > 0 && (
                      <div
                        className="absolute top-10 right-2 md:right-3 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-50 flex items-center cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          openStory(profile, profile.stories[0]);
                        }}
                      >
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
                        “{profile.tag}“
                      </span>
                      <FaCommentDots className="text-yellow-600 text-md min-w-[18px] min-h-[18px] flex-shrink-0" />
                    </div>
                    <div className="text-xs font-arial text-black dark:text-gray-200 flex items-center gap-1 mt-2">
                      <FaClock className="text-yellow-500 h-4 w-4 font-normal" />
                      {timeAgo(profile.tagtimestamp ?? new Date())}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : null
          )}
        </motion.div>

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

        <div
          className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415]"
          style={{
            height: "400px",
            width: "400px",
            borderRadius: "200px",
            bottom: "-100px",
            right: "-100px",
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />
      </section>
    </main>
  );
}