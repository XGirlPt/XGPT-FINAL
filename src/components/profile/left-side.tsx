import { useEffect, useState, useCallback } from "react";
import { RiMessage2Fill } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";
import { Profile } from "@/types";
import Image from "next/image"; 
// import '../../styles/globals.min.css';
import { useTranslation } from "react-i18next";

interface LeftSideProps {
  selectedProfile: Profile;
  handlePartilhaClick: () => void;
  handleLigaMeClick: () => void;
}

const LeftSide: React.FC<LeftSideProps> = ({
  selectedProfile,
  handlePartilhaClick,
  handleLigaMeClick,
}) => {
  const [timeElapsed, setTimeElapsed] = useState<string>("");
  const { t, i18n } = useTranslation();

  // Função para formatar o tempo
  const formatTimeElapsed = useCallback((minutesElapsed: number): string => {
    const hoursElapsed = minutesElapsed / 60;

    if (hoursElapsed > 48) {
      return t("profile.time_elapsed.more_than_48_hours");
    } else if (minutesElapsed < 60) {
      return t("profile.time_elapsed.minutes_ago", {
        minutes: minutesElapsed,
        plural: minutesElapsed !== 1 ? "s" : "",
      });
    } else {
      const hours = Math.floor(hoursElapsed);
      const minutes = minutesElapsed % 60;
      return t("profile.time_elapsed.hours_and_minutes_ago", {
        hours,
        hoursPlural: hours !== 1 ? "s" : "",
        minutes,
        minutesPlural: minutes > 0 ? (minutes !== 1 ? "s" : "") : "",
      });
    }
  }, [t]);

  // Função para calcular o tempo decorrido
  const calculateTimeElapsed = useCallback(() => {
    if (!selectedProfile || !selectedProfile.tagtimestamp) {
      setTimeElapsed(t("profile.time_elapsed.indeterminate"));
      return;
    }

    const tagTimestamp = new Date(selectedProfile.tagtimestamp);

    if (isNaN(tagTimestamp.getTime())) {
      setTimeElapsed(t("profile.time_elapsed.indeterminate"));
      return;
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - tagTimestamp.getTime();
    const minutesElapsed = Math.floor(elapsedTime / (1000 * 60)); // Corrected to 1000 ms

    setTimeElapsed(formatTimeElapsed(minutesElapsed));
  }, [selectedProfile, t, formatTimeElapsed]); // Add selectedProfile and t to the dependency array

  useEffect(() => {
    // Recalculate the elapsed time when `tagTimestamp` changes
    if (selectedProfile?.tagtimestamp) {
      calculateTimeElapsed();

      // Set up the interval to update every minute
      const interval = setInterval(calculateTimeElapsed, 60000);

      return () => clearInterval(interval);
    }
  }, [selectedProfile?.tagtimestamp, calculateTimeElapsed]);  // Dependência apenas em `tagTimestamp`

  return (
    <div className="w-full md:w-1/3 flex justify-center items-center mb-44 md:mb-36 md:sticky top-48 z-10 h-full">
      <div className="relative flex flex-col justify-center items-center">
        {/* Foto de Perfil */}
        <div className="w-72 h-96 bg-gray-300 flex justify-center items-center rounded-2xl overflow-hidden shadow-md">
          {selectedProfile ? (
            Array.isArray(selectedProfile.photoURL) &&
            selectedProfile.photoURL.length > 0 ? (
              <Image
                src={selectedProfile.photoURL[0] || "/logo.webp"}
                alt={selectedProfile.nome || "Profile"}
                className="w-full h-full object-cover"
                loading="lazy"
                width={100}
                height={100}
              />
            ) : selectedProfile.photoURL ? (
              <Image
                src={selectedProfile.photoURL[0] || "/logo.webp"}
                alt={selectedProfile.nome || "Profile"}
                className="w-full h-full object-cover blur-md"
                loading="lazy"
                width={100}
                height={100}
              />
            ) : (
              <Image
                src="/logo.webp"
                alt="Default Profile"
                className="w-full h-full object-cover blur-md"
                loading="lazy"
                width={100}
                height={100}
              />
            )
          ) : (
            <Image
              src="/logo.webp"
              alt="Placeholder"
              className="w-full h-full object-cover blur-md"
              loading="lazy"
              width={100}
              height={100}
            />
          )}
        </div>
  
        {/* Status e Botões */}
        <div className="flex justify-center items-center w-full absolute -bottom-44">
          <div className="bg-white dark:bg-gray-800 shadow-lg w-5/6 md:w-3/4 p-6 rounded-2xl">
            {/* Último Status */}
            <div className="text-center mb-4">
              <p className="text-yellow-600 dark:text-yellow-500 text-xs underline italic mb-2">
                Last Status
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-xs mb-2 italic">
              `{'>'}`{selectedProfile?.tag || "No status available"}`{'>'}`
              </p>
              <div className="flex justify-center items-center">
                <p className="text-yellow-600 dark:text-yellow-500 text-xs mr-2 flex items-center">
                  {timeElapsed}
                  <RiMessage2Fill className="text-yellow-600 dark:text-yellow-500 ml-2" size={16} />
                </p>
              </div>
            </div>
  
            {/* Botões */}
            <div className="grid gap-4">
              {/* Botão Liga-me */}
              <button
                className="relative  bg-pink-500 hover:to-red-600 text-white py-2 rounded-md flex justify-center items-center shadow-md transform transition-transform duration-200 hover:scale-105"
                onClick={handleLigaMeClick}
                aria-label={t("profile.call_me")}
              >
                <FiPhone className="mr-2" />
                <span className="text-sm">{t("profile.call_me")}</span>
              </button>
  
              {/* Botão Compartilhar */}
              <button
                className="relative bg-gradient-to-r bg-blue-500 hover:to-blue-700 text-white py-2 rounded-md flex justify-center items-center shadow-md transform transition-transform duration-200 hover:scale-105"
                onClick={handlePartilhaClick}
                aria-label={t("profile.share_profile")}
              >
                <IoShareSocialOutline className="mr-2" size={20} />
                <span className="text-sm">{t("profile.share_profile")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default LeftSide;
