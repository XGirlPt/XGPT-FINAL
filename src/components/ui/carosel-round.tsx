'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFire } from 'react-icons/fa';
import { Profile } from '@/backend/types';
import { FaCrown } from 'react-icons/fa';

interface RoundAvatarProps {
  profile: Profile;
}

const RoundAvatar: React.FC<RoundAvatarProps> = ({ profile }) => {
  return (
    <Link href={`/escort/${profile.nome}`} passHref>
      <div className="relative flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105">
        <div className="relative w-16 md:w-20 h-16 md:h-20 rounded-full overflow-hidden border-2 border-pink-800 transition duration-300 ease-in-out">
          {profile.photos && profile.photos.length > 0 ? (
            <Image
              src={profile.photos[0] || '/logo.webp'}
              alt={profile.nome}
              className="w-full h-full object-cover rounded-full border-2 border-white"
              loading="lazy"
              width={80}
              height={80}
            />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-full" />
          )}
          <div className="absolute inset-0 hover:bg-pink-800 hover:opacity-40 duration-300 z-10" />
          <FaFire
            className="absolute -top-2 -right-2 text-red-500 w-6 h-6 md:w-7 md:h-7 animate-pulse drop-shadow-md z-20"
          />
        </div>
        <p className="text-white text-xs mt-2 whitespace-nowrap">{profile.nome}</p>
        {profile.premium && (
          <span className="absolute -bottom-2 bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full z-20 flex items-center">
            <FaCrown className="text-white mr-1" />
            Premium
          </span>
        )}
      </div>
    </Link>
  );
};

export default RoundAvatar;