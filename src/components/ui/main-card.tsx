import Link from "next/link";
import { FaMapMarkerAlt, FaFireAlt, FaVideo, FaCrown } from "react-icons/fa"; // Ícone de "Movie"
import { VscVerifiedFilled } from "react-icons/vsc";
import { RiMessage2Fill } from "react-icons/ri";
import { MdFiberManualRecord } from "react-icons/md"; // Ícone de "Live"
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Heart } from 'lucide-react';
import { useLanguage } from "../../context/LanguageContext"; // Importe o contexto de idioma
import { useTranslation } from "react-i18next";
import { AiOutlineClockCircle } from "react-icons/ai";

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

interface MainCardProps {
  profiles: Profile[];
  currentPage: number; // Página atual
  itemsPerPage: number;
  onProfileClick: () => void;
  customClass?: string;
}

const MainCard: React.FC<MainCardProps> = ({ profiles, currentPage, itemsPerPage, onProfileClick,  }) => {
  const [timeElapsedList, setTimeElapsedList] = useState<string[]>([]);

  const formatTimeElapsed = useCallback((minutesElapsed: number): string => {
    const hoursElapsed = minutesElapsed / 60;
    if (hoursElapsed > 48) {
      return "Há mais de 48 horas";
    } else if (minutesElapsed < 60) {
      return `Há ${minutesElapsed} minuto${minutesElapsed !== 1 ? "s" : ""}`;
    } else {
      const hours = Math.floor(hoursElapsed);
      const minutes = minutesElapsed % 60;
      return `Há ${hours} hora${hours !== 1 ? "s" : ""}${minutes > 0 ? ` ${minutes} minuto${minutes !== 1 ? "s" : ""}` : ""}`;
    }
  }, []);

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

  useEffect(() => {
    const timeElapsed = profiles.map(profile => calculateTimeElapsed(profile.tagtimestamp));
    setTimeElapsedList(timeElapsed);

    const interval = setInterval(() => {
      const updatedTimeElapsed = profiles.map(profile => calculateTimeElapsed(profile.tagtimestamp));
      setTimeElapsedList(updatedTimeElapsed);
    }, 60000);

    return () => clearInterval(interval);
  }, [profiles, calculateTimeElapsed]);

  // Ordenação dos perfis por tagtimestamp (da mais recente para a mais antiga)
  const sortedProfiles = profiles.sort((a, b) => {
    const dateA = new Date(a.tagtimestamp).getTime();
    const dateB = new Date(b.tagtimestamp).getTime();
    return dateB - dateA; // Ordena do mais recente para o mais antigo
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfiles = sortedProfiles.slice(startIndex, startIndex + itemsPerPage);

  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">
        {t("dashboard.featured_ads")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {paginatedProfiles.map((profile, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative w-full h-64">
              {/* Imagem com tamanho consistente */}
              <Image
                src={profile.photos[0] || "/logo.webp"}
                alt={profile.nome}
                className="object-cover w-full h-full"
                priority
                width={400}
                height={400}
              />

              {/* Degradê preto na parte inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                <p className="text-lg font-bold text-white">{profile.nome}</p>
                <p className="text-sm text-gray-300 flex items-center">
                  <FaMapMarkerAlt className="text-rose-500 mr-1" />
                  {profile.cidade}
                </p>
              </div>
              {/* Premium Badge */}
              <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 flex items-center  shadow-md">
                <FaCrown className="text-white mr-1" />
                <span className=" text-xs">Premium</span>
              </div>
              {/* Badges na imagem */}
              {profile.live && (
                <div className="absolute top-2 left-2 bg-red-700 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 animate-pulse flex items-center">
                  <MdFiberManualRecord className="text-white mr-1" />
                  <span className="text-xs">Live Cam</span>
                </div>
              )}
              {Array.isArray(profile.stories) && profile.stories.length > 0 && (
                <div className="absolute top-10 right-2 md:right-3 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-50 flex items-center">
                  <FaVideo className="text-white mr-1 " />
                  <span className="text-xs">Stories</span>
                </div>
              )}
            </div>

            {/* Legenda abaixo da foto */}
            <div className="py-2 px-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm italic mb-1 text-center flex items-center justify-center">
                `&quot;`{profile.tag} `&quot;`
              </p>
              <div className="flex items-center align-middle justify-center">
                <p className="text-gray-600 dark:text-yellow-500 text-xs italic text-center">
                  {timeElapsedList[index]}
                </p>
                <AiOutlineClockCircle className="mr-2 h-8 text-yellow-500 items-center align-middle ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCard;
