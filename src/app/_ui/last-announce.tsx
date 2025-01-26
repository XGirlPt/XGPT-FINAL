/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {FaMapMarkerAlt, FaFireAlt, FaVideo} from "react-icons/fa"; // Ícone de "Movie"
import {VscVerifiedFilled} from "react-icons/vsc";
import {RiMessage2Fill} from "react-icons/ri";
import {MdFiberManualRecord} from "react-icons/md"; // Ícone de "Live"
import Image from "next/image";
import {useEffect, useState} from "react";
import { Heart } from 'lucide-react';
import {useLanguage} from "../../context/LanguageContext"; // Importe o contexto de idioma
import {useTranslation} from "react-i18next";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useCallback } from "react";

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

interface LastAnnounceProps {
	profiles: Profile[];
	currentPage: number; // Página atual
	itemsPerPage: number;
	onProfileClick: () => void;
	customClass?: string;
}

const LastAnnounce: React.FC<LastAnnounceProps> = ({profiles, currentPage, itemsPerPage, onProfileClick, a}) => {
	const [timeElapsedList, setTimeElapsedList] = useState<string[]>([]);

	const formatTimeElapsed = (minutesElapsed: number): string => {
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
	};

	const calculateTimeElapsed = useCallback((tagTimestamp: string): string => {
		const timestampDate = new Date(tagTimestamp);
	
		if (isNaN(timestampDate.getTime())) {
		  return "Tempo indeterminado";
		}
	
		const currentTime = Date.now();
		const elapsedTime = currentTime - timestampDate.getTime();
		const minutesElapsed = Math.floor(elapsedTime / (1000 * 60));
	
		return formatTimeElapsed(minutesElapsed);
	  }, []);
	
	  useEffect(() => {
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
	  }, [profiles, calculateTimeElapsed])

	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedProfiles = profiles.slice(startIndex, startIndex + itemsPerPage);

		const {t, i18n} = useTranslation();
		const {language, changeLanguage} = useLanguage();
	
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

          {/* Badges na imagem */}
          {profile.live && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 animate-pulse flex items-center">
              <MdFiberManualRecord className="text-white mr-1" />
              <span className="text-xs">Live Cam</span>
            </div>
          )}
          {Array.isArray(profile.stories) && profile.stories.length > 0 && (
            <div className="absolute top-4 right-2 md:right-3 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-50 flex items-center">
              <FaVideo className="text-white mr-1 text-xs" />
              <span className="text-xs">Stories</span>
            </div>
          )}
        </div>

        {/* Legenda abaixo da foto */}
       
      </div>
    ))}
  </div>
</div>



	);
};

export default LastAnnounce;
