import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { RiMessage2Fill } from 'react-icons/ri';
import { FiPhone } from 'react-icons/fi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { Profile } from '@/backend/types';
import { useTranslation } from 'react-i18next';
import Liga from './Liga';
import Partilha from './Partilha';

interface LeftSideProps {
  selectedProfile: Profile;
  handlePartilhaClick: () => void;
  handleLigaMeClick: () => void;
}

const LeftSide: React.FC<LeftSideProps> = ({ selectedProfile }) => {
  const [timeElapsed, setTimeElapsed] = useState<string>('');
  const [showLiga, setShowLiga] = useState(false); // Estado para controlar a exibição de Liga
  const [showPartilha, setShowPartilha] = useState(false); // Estado para controlar a exibição de Liga

  const { t } = useTranslation();

  const handleLigaClick = () => {
    setShowLiga(true); // Abre o componente Liga
  };

  const handlePartilhaClick = () => {
    setShowPartilha(true); // Abre o componente Liga
  };

  return (
    <Card className="w-full lg:w-[370px] overflow-hidden bg-white dark:bg-[#1a0a10] rounded-3xl p-4 mt-10">
      <div className="space-y-4">
        {/* Foto de Perfil */}
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image
            src={selectedProfile?.photoURL?.[0] || '/logo.webp'}
            alt={selectedProfile?.nome || 'Profile'}
            fill
            className="object-cover"
            sizes="(max-width: 300px) 100vw, 300px"
          />
        </div>

        {/* Nome, Status e Tempo */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-semibold">{selectedProfile?.nome}</h3>
            <Image
              src="/icons/verify.png"
              alt="Verified User"
              width={24}
              height={24}
              className='text-green-500'
            />
          </div>
          <p className="text-md text-gray-600 dark:text-gray-300">
            {selectedProfile?.tag || t('profile.no_status_available')}
          </p>
          <div className="flex items-center gap-1">
            <Image src="/icons/clock.png" alt="clock" width={20} height={20} />
            <span className="text-sm text-gray-400">{timeElapsed}</span>
            <RiMessage2Fill
              className="text-yellow-600 dark:text-yellow-500 ml-2"
              size={16}
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-2">
          <Button
            className="w-full rounded-full bg-pink-600 hover:bg-pink-700 text-white font-body flex items-center justify-center gap-2"
            onClick={handleLigaClick}
          >
            <FiPhone />
            {t('profile.call_me')}
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full border-gray-200 dark:border-gray-700 font-body flex items-center justify-center gap-2"
            onClick={handlePartilhaClick}
          >
            <IoShareSocialOutline size={20} />
            {t('profile.share_profile')}
          </Button>
        </div>
      </div>

      {/* Renderizar Liga Condicionalmente */}
      {showLiga && (
        <Liga selectedProfile={selectedProfile} setShowLiga={setShowLiga} />
      )}

      {showPartilha && (
        <Partilha
          selectedProfile={selectedProfile}
          setShowPartilha={setShowPartilha}
        />
      )}
    </Card>
  );
};

export default LeftSide;
