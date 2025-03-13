import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { RiMessage2Fill } from 'react-icons/ri';
import { FiPhone } from 'react-icons/fi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdVerified } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { Profile } from '@/backend/types';
import { useTranslation } from 'react-i18next';
import Liga from './Liga';
import Partilha from './Partilha';
import { formatDistanceToNow } from 'date-fns';

interface LeftSideProps {
  selectedProfile: Profile;
  photoURL?: string[];
  nome?: string;
  cidade?: string;
  certificado?: boolean;
}



const LeftSide: React.FC<LeftSideProps> = ({ selectedProfile }) => {
  const [showLiga, setShowLiga] = useState(false);
  const [showPartilha, setShowPartilha] = useState(false);
  const { t } = useTranslation();

  const handleLigaClick = () => setShowLiga(true);
  const handlePartilhaClick = () => setShowPartilha(true);

  const timeAgo = (timestamp?: Date) => {
    if (!timestamp) return t('profile.no_time_available');
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <Card className="w-full lg:w-[370px] bg-white dark:bg-[#1a0a10] rounded-3xl p-4 mt-10 relative">
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

      {/* Gradiente de sombra no fundo */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>

      {/* Nome e Verificação */}
      <div className="absolute bottom-6 left-3 text-white px-4 py-2 flex items-center gap-2">
        <h3 className="text-2xl font-semibold">{selectedProfile?.nome}</h3>
        {selectedProfile?.certificado && <MdVerified className="text-green-500" size={20} />}
      </div>

      {/* Localização */}
      {selectedProfile?.cidade && (
        <div className="absolute bottom-2 left-3 text-white px-3 py-1 flex items-center gap-1">
          <FaLocationDot className="text-red-500" size={14} />
          <span className="text-md">{selectedProfile?.cidade}</span>
        </div>
      )}
    </div>


        {/* Nome, Status e Tempo */}
        <div className="space-y-2">
        <div className="flex items-center gap-2">
  <p className="text-lg italic text-gray-600 dark:text-gray-300">
    "{selectedProfile?.tag || t('profile.no_status_available')}"
    <RiMessage2Fill className="text-yellow-600 dark:text-yellow-500" size={16} />
  </p> 

</div>

          <div className="flex items-center gap-1">
            <Image src="/icons/clock.png" alt="clock" width={20} height={20} />
            <span className="text-sm text-gray-400">{timeAgo(selectedProfile?.tagtimestamp)}</span>
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

      {/* Renderizar Liga e Partilha */}
      {showLiga && <Liga selectedProfile={selectedProfile} setShowLiga={setShowLiga} />}
      {showPartilha && <Partilha selectedProfile={selectedProfile} setShowPartilha={setShowPartilha} />}
    </Card>
  );
};

export default LeftSide;
