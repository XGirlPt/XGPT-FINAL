'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LeftSide from '@/components/profile/left-side';
import PhotosAndCertificado from '@/components/profile/photos-and-certificado';
import { ProvidedServices } from '@/components/profile/servicos-prestados';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { AboutProfile } from '@/components/profile/about-profile';
import { TarifsAndLanguage } from '@/components/profile/tarifs-a-language';
import Comments from '@/app/escort/[profileName]/_ui/comments';
import { Description } from '@/components/profile/description';
import HeaderG from '@/components/header-filter/header-g';
import FotoBig from '@/components/profile/foto-big';
import Certificado from '../_ui/certificado';
import StoryBig from '@/components/profile/story-big';
import { fetchSelectedProfile } from '@/backend/actions/ProfileActions';
import { fetchProfiles } from '@/backend/services/profileService';
import { startChat } from '@/backend/actions/ChatActions';
import ChatWindow from '@/components/profile/ChatWindow';
import { AppDispatch, RootState } from '@/backend/store';
import { RiMessage2Fill } from 'react-icons/ri'; // Importar o ícone correto

function UserProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { profileName } = useParams<{ profileName: string }>();
  const [showLargePhoto, setShowLargePhoto] = useState(false);
  const [showLargeStory, setShowLargeStory] = useState(false);
  const [showCertificado, setShowCertificado] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles, setProfiles] = useState<any[]>([]);
  const { t } = useTranslation();

  const selectedProfile = useSelector((state: RootState) => state.profile.selectedProfile);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const error = useSelector((state: RootState) => state.profile.error);
  const userUID = useSelector((state: RootState) => state.profile.userUID);
  const currentChatRoomId = useSelector((state: RootState) => state.profile.currentChatRoomId);

  useEffect(() => {
    if (profileName) {
      console.log('[UserProfile] Despachando fetchSelectedProfile para:', profileName);
      dispatch(fetchSelectedProfile(profileName)).then((result) => {
        console.log('[UserProfile] Resultado do fetchSelectedProfile:', result);
      });
    }
  }, [dispatch, profileName]);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await fetchProfiles();
        console.log('[UserProfile] Perfis carregados via fetchProfiles:', data);
        setProfiles(data);
      } catch (err) {
        console.error('[UserProfile] Erro ao carregar perfis:', err);
      }
    };
    loadProfiles();
  }, []);

  useEffect(() => {
    console.log('[UserProfile] Estado atual de selectedProfile:', selectedProfile);
    console.log('[UserProfile] Fotos de selectedProfile:', selectedProfile?.photos);
    console.log('[UserProfile] StoryURL de selectedProfile:', selectedProfile?.storyURL);
    console.log('[UserProfile] selectedProfile tem storyURL?', selectedProfile?.storyURL?.length > 0);
  }, [selectedProfile]);

  const handleCertificadoClick = () => setShowCertificado(!showCertificado);
  const handlePhotoClick = (index: number) => {
    setShowLargePhoto(true);
    setPhotoIndex(index);
  };
  const handleStoryClick = (index: number) => {
    console.log('[UserProfile] Clicado no story, índice:', index);
    setShowLargeStory(true);
    setStoryIndex(index);
  };

  const handleChatClick = async () => {
    if (!userUID || !selectedProfile?.userUID) {
      console.error('Erro: userUID ou selectedProfile.userUID estão indefinidos', {
        userUID,
        advertiserId: selectedProfile?.userUID,
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

  const findProfileIndex = useCallback(
    (profileId: number) => {
      const index = profiles.findIndex((profile) => profile.id === profileId);
      console.log('[UserProfile] Índice encontrado para profileId', profileId, ':', index);
      return index;
    },
    [profiles]
  );

  useEffect(() => {
    if (profiles.length > 0 && selectedProfile?.id) {
      setCurrentProfileIndex(findProfileIndex(selectedProfile.id));
    }
  }, [profiles, selectedProfile, findProfileIndex]);

  const renderChatWindow = () => {
    if (showChat && currentChatRoomId) {
      return <ChatWindow chatRoomId={currentChatRoomId} onClose={() => setShowChat(false)} />;
    }
    if (showChat && !currentChatRoomId) {
      console.log('ChatWindow não renderizado: currentChatRoomId está indefinido');
    }
    return null;
  };

  if (loading) return <div>Carregando perfil...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!selectedProfile) return <div>Perfil não encontrado</div>;

  return (
    <>
      <div className="sticky top-24 z-10 mt-1 pt-1 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="hidden md:flex items-center justify-between z-40">
            <h1 className="text-4xl">Profile Details</h1>
            <HeaderG
              currentProfileIndex={currentProfileIndex}
              setCurrentProfileIndex={setCurrentProfileIndex}
              profiles={profiles}
            />
          </div>
          <div className="md:hidden">
            <h1 className="text-3xl text-center mb-3">Profile Details</h1>
            <div className="flex gap-2 justify-between">
              <Button variant="outline" className="flex-1 px-4 py-1 rounded-full border text-sm bg-transparent font-body">
                <ArrowLeftIcon className="w-4 h-4 mr-2" /> Previous
              </Button>
              <Button variant="outline" className="flex-1 px-4 py-1 rounded-full bg-pink-600 text-white text-sm font-body">
                Next <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <div
          className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415] hidden lg:block"
          style={{
            height: '500px',
            width: '500px',
            borderRadius: '200px',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-45deg)',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-[370px] md:sticky md:top-44 md:self-start relative z-10">
            <div className="transition-all duration-300 -mt-9 md:mt-[var(--profile-margin,-36px)]">
              <LeftSide selectedProfile={selectedProfile} />
            </div>
          </div>

          {showLargePhoto && (
            <FotoBig
              selectedProfile={selectedProfile}
              onClose={() => setShowLargePhoto(false)}
              currentIndex={photoIndex}
            />
          )}

          {showLargeStory && (
            <StoryBig
              selectedProfile={selectedProfile}
              onClose={() => setShowLargeStory(false)}
              currentIndex={storyIndex}
            />
          )}

          {showCertificado && (
            <Certificado
              selectedProfile={selectedProfile}
              onClose={() => setShowCertificado(false)}
            />
          )}

          <div className="flex-1 space-y-8 bg-white dark:bg-[#1a0a10] backdrop-blur-xl rounded-3xl p-6 z-40 relative">
            <PhotosAndCertificado
              selectedProfile={selectedProfile}
              isCertified={selectedProfile.isCertified}
              handleCertificadoClick={handleCertificadoClick}
              handlePhotoClick={handlePhotoClick}
              handleStoryClick={handleStoryClick}
              loading={loading}
            />
            <AboutProfile selectedProfile={selectedProfile} />
            <ProvidedServices selectedProfile={selectedProfile} />
            <Description selectedProfile={selectedProfile} />
            <TarifsAndLanguage selectedProfile={selectedProfile} />
            <Comments />
          </div>
          <div
            className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415] -z-10"
            style={{
              height: '350px',
              width: '350px',
              borderRadius: '200px',
              bottom: '-0px',
              left: '-100px',
              filter: 'blur(80px)',
              zIndex: 0,
            }}
          />
        </div>

        {/* Botão de mensagem fixo no canto inferior esquerdo */}
        <Button
          onClick={handleChatClick}
          className="fixed bottom-6 right-6 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-body flex items-center justify-center w-14 h-14 shadow-lg z-50 animate-pulse"
        >
          <RiMessage2Fill size={28} />
        
        </Button>
        

        {renderChatWindow()}
      </div>

      <style jsx>{`
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
}

export default UserProfile;