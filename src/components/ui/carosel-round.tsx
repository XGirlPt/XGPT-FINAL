"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/backend/types";

interface RoundAvatarProps {
  profile: Profile;
}

interface CaroselRoundProps {
  profiles?: Profile[]; // Tornar profiles opcional
}

const RoundAvatar: React.FC<RoundAvatarProps> = ({ profile }) => {
  return (
    <Link href={`/escort/${profile.nome}`} passHref>
      <div className="relative flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105">
        <div className="relative w-16 md:w-20 h-16 md:h-20 rounded-full overflow-hidden border-2 border-pink-800 transition duration-300 ease-in-out">
          {profile.photos && profile.photos.length > 0 ? (
            <Image
              src={profile.photos[0]}
              alt={profile.nome}
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <Image
              src="/logo.webp"
              alt="Default Avatar"
              fill
              className="object-cover rounded-full"
            />
          )}
        </div>
        <p className="mt-2 text-xs md:text-sm text-gray-100 text-center">
          {profile.nome}
        </p>
      </div>
    </Link>
  );
};

const CaroselRound: React.FC<CaroselRoundProps> = ({ profiles = [] }) => { // Valor padrão como array vazio
  const shuffleArray = (array: Profile[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const profilesToDisplay = shuffleArray(profiles).slice(0, 15);

  return (
    <div className="mx-4 md:mx-8 mb-8 relative z-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Destaques da Semana
      </h2>
      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 justify-start">
          {profilesToDisplay.length > 0 ? (
            profilesToDisplay.map((profile, index) => (
              <RoundAvatar key={index} profile={profile} />
            ))
          ) : (
            <p className="text-gray-100">Nenhum perfil disponível</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaroselRound;