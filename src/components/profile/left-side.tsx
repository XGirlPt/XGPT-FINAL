'use client';

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
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/backend/store';
import { startChat } from '@/backend/actions/ChatActions';
import ChatWindow from './ChatWindow';

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
  const [showChat, setShowChat] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const userUID = useSelector((state: RootState) => state.profile.userUID);
  const currentChatRoomId = useSelector((state: RootState) => state.profile.currentChatRoomId);

  console.log('Estado inicial:', { userUID, currentChatRoomId, showChat });

  const handleLigaClick = () => {
    setShowLiga(true);
    console.log('Abrindo janela Liga');
  };

  const handlePartilhaClick = () => {
    setShowPartilha(true);
    console.log('Abrindo janela Partilha');
  };

  const handleChatClick = async () => {
    if (!userUID || !selectedProfile.userUID) {
      console.error('Erro: userUID ou selectedProfile.userUID estão indefinidos', {
        userUID,
        advertiserId: selectedProfile.userUID,
      });
      alert('É necessário estar logado e o perfil deve ter um UID válido para iniciar um chat.');
      return;
    }

    console.log('Iniciando chat com:', { userId: userUID, advertiserId: selectedProfile.userUID });
    try {
      const chatRoom = await dispatch(startChat({ userId: userUID, advertiserId: selectedProfile.userUID })).unwrap();
      setShowChat(true);
      console.log('showChat atualizado para true, chatRoom:', chatRoom);
    } catch (error) {
      console.error('Erro ao iniciar chat:', error);
      alert('Erro ao iniciar o chat. Por favor, tenta novamente.');
    }
  };

  const timeAgo = (timestamp?: Date) => {
    if (!timestamp) return t('profile.no_time_available');
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  console.log('Estado antes da renderização:', { showChat, currentChatRoomId });

  const renderChatWindow = () => {
    if (showChat && currentChatRoomId) {
      return <ChatWindow chatRoomId={currentChatRoomId} onClose={() => setShowChat(false)} />;
    }
    if (showChat && !currentChatRoomId) {
      console.log('ChatWindow não renderizado: currentChatRoomId está indefinido');
    }
    return null;
  };

  return (
    <>
      <Card className="w-full lg:w-[370px] bg-white dark:bg-[#1a0a10] dark:border-gray-800 rounded-3xl p-4 mt-10 relative">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              alt={selectedProfile.nome || 'Profile Image'}
              src={selectedProfile?.photos?.[0] || '/logo.webp'}
              fill
              className="object-cover"
              sizes="(max-width: 300px) 100vw, 300px"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-6 left-3 text-white px-4 py-2 flex items-center gap-2">
              <h3 className="text-2xl font-semibold">{selectedProfile?.nome}</h3>
              {selectedProfile?.certificado && <MdVerified className="text-green-500" size={20} />}
            </div>
            {selectedProfile?.cidade && (
              <div className="absolute bottom-2 left-3 text-white px-3 py-1 flex items-center gap-1">
                <FaLocationDot className="text-red-500" size={14} />
                <span className="text-md">{selectedProfile?.cidade}</span>
              </div>
            )}
          </div>
          {selectedProfile?.tag && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-lg italic text-gray-600 dark:text-gray-300">
                  “{selectedProfile.tag}“
                  <RiMessage2Fill className="text-yellow-600 dark:text-yellow-500" size={16} />
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Image src="/icons/clock.png" alt="clock" width={20} height={20} />
                <span className="text-sm text-gray-400">{timeAgo(selectedProfile.tagtimestamp)}</span>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Button
              className="w-full rounded-full bg-pink-600 hover:bg-pink-700 text-white font-body flex items-center justify-center gap-2 relative overflow-hidden"
              onClick={handleLigaClick}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-sweep w-1/3"></span>
              <FiPhone className="relative z-10" />
              <span className="relative z-10">{t('profile.call_me')}</span>
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-full border-gray-200 dark:border-gray-800 font-body flex items-center justify-center gap-2"
              onClick={handlePartilhaClick}
            >
              <IoShareSocialOutline size={20} />
              {t('profile.share_profile')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Botão de mensagem fixo no canto inferior esquerdo */}
    
      {showLiga && <Liga selectedProfile={selectedProfile} setShowLiga={setShowLiga} />}
      {showPartilha && <Partilha selectedProfile={selectedProfile} setShowPartilha={setShowPartilha} />}
      {renderChatWindow()}

      <style jsx>{`
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-sweep {
          animation: sweep 1s infinite linear;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </>
  );
};

export default LeftSide;