'use client';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LeftSide from '@/components/profile/left-side';
import PhotosAndCertificado from '@/components/profile/photos-and-certificado'; // Importação nomeada corrigida
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
import { fetchSelectedProfile } from '@/backend/actions/ProfileActions';
import { fetchProfiles } from '@/backend/services/profileService';
import { AppDispatch, RootState } from '@/store';

function UserProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { profileName } = useParams<{ profileName: string }>();
  const [showLargePhoto, setShowLargePhoto] = useState(false);
  const [showCertificado, setShowCertificado] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles, setProfiles] = useState<any[]>([]);
  const { t } = useTranslation();

  const selectedProfile = useSelector((state: RootState) => state.profile.selectedProfile);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const error = useSelector((state: RootState) => state.profile.error);

  useEffect(() => {
    if (profileName) {
      console.log('Despachando fetchSelectedProfile para:', profileName);
      dispatch(fetchSelectedProfile(profileName)).then((result) => {
        console.log('Resultado do fetchSelectedProfile:', result);
      });
    }
  }, [dispatch, profileName]);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await fetchProfiles();
        console.log('Perfis carregados:', data);
        setProfiles(data);
      } catch (err) {
        console.error('Erro ao carregar perfis:', err);
      }
    };
    loadProfiles();
  }, []);

  useEffect(() => {
    console.log('Estado atual de selectedProfile:', selectedProfile);
    console.log('Fotos de selectedProfile:', selectedProfile?.photos);
  }, [selectedProfile]);

  const handleCertificadoClick = () => setShowCertificado(!showCertificado);
  const handlePhotoClick = (index: number) => {
    setShowLargePhoto(true);
    setPhotoIndex(index);
  };

  const findProfileIndex = useCallback(
    (profileId: number) => profiles.findIndex((profile) => profile.id === profileId),
    [profiles]
  );

  useEffect(() => {
    if (profiles.length > 0 && selectedProfile?.id) {
      setCurrentProfileIndex(findProfileIndex(selectedProfile.id));
    }
  }, [profiles, selectedProfile, findProfileIndex]);

  if (loading) return <div>Carregando perfil...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!selectedProfile) return <div>Perfil não encontrado</div>;

  return (
    <>
      <div className="sticky top-24 z-50 mt-1 pt-1 backdrop-blur-sm border-b">
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
              <Button variant="outline" className="flex-1 px-4 py-1 rounded-full border border-gray-300 text-sm bg-transparent font-body">
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
      </div>
    </>
  );
}

export default UserProfile;