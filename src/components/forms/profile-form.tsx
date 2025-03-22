'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import FotoBig from '@/components/profile/foto-big';
import { fetchProfileData } from '@/backend/actions/ProfileActions';
import { AppDispatch, RootState } from '@/store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  // Dados do Redux (valores do usuário logado, incluindo todos os campos do AboutProfile)
  const userUID = useSelector((state: RootState) => state.profile.userUID);
  const email = useSelector((state: RootState) => state.profile.email || 'Email não disponível');
  const photos = useSelector((state: RootState) => state.profile.photos || []);
  const servico = useSelector((state: RootState) => state.profile.servico || []);
  const pagamento = useSelector((state: RootState) => state.profile.pagamento || []);
  const lingua = useSelector((state: RootState) => state.profile.lingua || []);
  const description = useSelector((state: RootState) => state.profile.description || 'Sem descrição disponível');
  const isCertified = useSelector((state: RootState) => state.profile.isCertified || false);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const error = useSelector((state: RootState) => state.profile.error);
  // Campos específicos do AboutProfile
  const nome = useSelector((state: RootState) => state.profile.nome || 'Usuário');
  const idade = useSelector((state: RootState) => state.profile.idade || 'N/A');
  const altura = useSelector((state: RootState) => state.profile.altura || 'N/A');
  const distrito = useSelector((state: RootState) => state.profile.distrito || 'N/A');
  const origem = useSelector((state: RootState) => state.profile.origem || 'N/A');
  const cidade = useSelector((state: RootState) => state.profile.cidade || 'N/A');
  const peso = useSelector((state: RootState) => state.profile.peso || 'N/A');
  const tatuagens = useSelector((state: RootState) => state.profile.tatuagens || 'N/A');
  const pelos = useSelector((state: RootState) => state.profile.pelos || 'N/A');
  const olhos = useSelector((state: RootState) => state.profile.olhos || 'N/A');
  const seios = useSelector((state: RootState) => state.profile.seios || 'N/A');
  const mamas = useSelector((state: RootState) => state.profile.mamas || 'N/A');
  const signo = useSelector((state: RootState) => state.profile.signo || 'N/A');
  const cabelo = useSelector((state: RootState) => state.profile.cabelo || 'N/A');

  // Estados locais
  const [showLargePhoto, setShowLargePhoto] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Carregar dados do perfil via Redux Thunk
  useEffect(() => {
    if (userUID) {
      console.log('Carregando dados do perfil para userUID:', userUID);
      dispatch(fetchProfileData())
        .then((result) => {
          console.log('Resultado do fetchProfileData:', result);
        })
        .catch((err) => {
          console.error('Erro ao carregar dados do perfil via Redux:', err);
          toast.error(t('messages.fetchError'));
        });
    } else {
      console.error('userUID está indefinido - verifique a autenticação');
      toast.error(t('messages.noUser'));
    }
  }, [userUID, dispatch, t]);

  // Logar os dados do Redux para depuração
  useEffect(() => {
    console.log('Dados do Redux:', {
      userUID,
      email,
      photos,
      servico,
      pagamento,
      lingua,
      description,
      isCertified,
      nome,
      idade,
      altura,
      distrito,
      origem,
      cidade,
      peso,
      tatuagens,
      pelos,
      olhos,
      seios,
      mamas,
      signo,
      cabelo,
      loading,
      error,
    });
  }, [
    userUID,
    email,
    photos,
    servico,
    pagamento,
    lingua,
    description,
    isCertified,
    nome,
    idade,
    altura,
    distrito,
    origem,
    cidade,
    peso,
    tatuagens,
    pelos,
    olhos,
    seios,
    mamas,
    signo,
    cabelo,
    loading,
    error,
  ]);

  // Handler para interação
  const handlePhotoClick = (index: number) => {
    setShowLargePhoto(true);
    setPhotoIndex(index);
  };

  // Verificações de carregamento e erro
  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error')}: {error}</div>;
  if (!userUID) return <div>{t('profile.notFound')}</div>;

  // Dados do perfil combinados do Redux
  const selectedProfile = {
    userUID,
    email,
    photos,
    servico,
    pagamento,
    lingua,
    description,
    isCertified,
    nome,
    idade,
    altura,
    distrito,
    origem,
    cidade,
    peso,
    tatuagens,
    pelos,
    olhos,
    seios,
    mamas,
    signo,
    cabelo,
    // Objeto details para compatibilidade com AboutProfile, se necessário
    details: {
      idade,
      altura,
      peso,
      origem: origem, // Usando "origem" como "nationality" para compatibilidade
    },
  };

  console.log('Dados passados para AboutProfile:', {
    nome: selectedProfile.nome,
    idade: selectedProfile.idade,
    altura: selectedProfile.altura,
    distrito: selectedProfile.distrito,
    origem: selectedProfile.origem,
    cidade: selectedProfile.cidade,
    peso: selectedProfile.peso,
    tatuagens: selectedProfile.tatuagens,
    pelos: selectedProfile.pelos,
    olhos: selectedProfile.olhos,
    seios: selectedProfile.seios,
    mamas: selectedProfile.mamas,
    signo: selectedProfile.signo,
    cabelo: selectedProfile.cabelo,
    details: selectedProfile.details,
  });

  return (
    <>
      <div className="sticky top-24 z-50 mt-1 pt-1 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="hidden md:flex items-center justify-between z-40">
            <h1 className="text-4xl"> {t('MySettings.myProfile')}</h1>
            <div className="flex gap-2">
              {/* <Button variant="outline" className="rounded-full text-sm bg-transparent font-body">
              {t('MySettings.myProfile')}
              </Button> */}
            </div>
          </div>
          <div className="md:hidden">
            <h1 className="text-3xl text-center mb-3">      </h1>
            <div className="flex gap-2 justify-between">
              <Button variant="outline" className="flex-1 px-4 py-1 rounded-full border border-gray-300 text-sm bg-transparent font-body">
                <ArrowLeftIcon className="w-4 h-4 mr-2" /> {t('button.previous')}
              </Button>
              <Button variant="outline" className="flex-1 px-4 py-1 rounded-full bg-pink-600 text-white text-sm font-body">
                {t('button.next')} <ArrowRightIcon className="w-4 h-4 ml-2" />
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

          <div className="flex-1 space-y-8 bg-white dark:bg-[#1a0a10] backdrop-blur-xl rounded-3xl p-6 z-40 relative">
            <PhotosAndCertificado
              selectedProfile={selectedProfile}
              isCertified={selectedProfile.isCertified}
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

      <ToastContainer position="top-right" />
    </>
  );
}

export default ProfileForm;