'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { updatePhotos, updateVPhotos } from '@/backend/actions/ProfileActions';
import supabase from '@/backend/database/supabase';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BlurImage } from '@/components/ui/blur-image';
import { IoTrashBin } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export function RegistoFotos() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Dados do Redux
  const userUID = useSelector((state: any) => state.profile?.profile?.userUID);
  const photosFromRedux = useSelector((state: any) => state.profile?.profile?.photos || []);
  const vphotosFromRedux = useSelector((state: any) => state.profile?.profile?.vphotos || []);

  // Estado local sincronizado com Redux
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(photosFromRedux);
  const [vSelectedPhotos, setVSelectedPhotos] = useState<string[]>(vphotosFromRedux);

  // Limite de fotos (10 para perfil, 1 para verificação)
  const maxProfilePhotos = 10;
  const maxVerificationPhotos = 1;

  // Sincronizar com Redux na montagem
  useEffect(() => {
    setSelectedPhotos(photosFromRedux);
    setVSelectedPhotos(vphotosFromRedux);
  }, [photosFromRedux, vphotosFromRedux]);

  // Função para upload de fotos de perfil
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files).slice(0, maxProfilePhotos - selectedPhotos.length);
      const uploadedPhotoURLs: string[] = [];

      const uploadPromises = files.map(async (file) => {
        const filePath = `${userUID}/${file.name.toLowerCase().replace(/ /g, '_').replace(/\./g, '_')}.webp`;
        try {
          const { error } = await supabase.storage.from('profileFoto').upload(filePath, file);
          if (error) throw new Error(error.message);

          const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
          uploadedPhotoURLs.push(publicURLFoto);
          console.log('Foto de perfil carregada:', publicURLFoto);
        } catch (error: any) {
          console.error('Erro durante o upload:', error.message);
          toast.error(t('messages.uploadError'), { position: 'top-right', autoClose: 1000 });
        }
      });

      await Promise.all(uploadPromises);
      if (uploadedPhotoURLs.length > 0) {
        const newSelectedPhotos = [...selectedPhotos, ...uploadedPhotoURLs];
        setSelectedPhotos(newSelectedPhotos);
        dispatch(updatePhotos(newSelectedPhotos));
        toast.success(t('messages.photoUploaded'), { position: 'top-right', autoClose: 1000 });
      }
    }
  };

  // Função para upload de foto de verificação
  const handleVerificationPhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileName = file.name.toLowerCase().replace(/ /g, '_').replace(/[^a-z0-9_]/g, '') + '.webp';
      const filePath = `${userUID}/${fileName}`;

      try {
        const { error } = await supabase.storage.from('verificationFoto').upload(filePath, file);
        if (error) throw new Error(error.message);

        const publicURLFotoV = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/verificationFoto/${filePath}`;
        setVSelectedPhotos([publicURLFotoV]);
        dispatch(updateVPhotos([publicURLFotoV]));
        toast.success(t('messages.photoUploaded'), { position: 'top-right', autoClose: 1000 });
        console.log('Foto de verificação carregada:', publicURLFotoV);
      } catch (error: any) {
        console.error('Erro durante o upload:', error.message);
        toast.error(t('messages.uploadError'), { position: 'top-right', autoClose: 1000 });
      }
    }
  };

  // Função para excluir foto de perfil
  const handleDeletePhoto = async (index: number) => {
    try {
      const updatedPhotos = [...selectedPhotos];
      const photoURLToDelete = updatedPhotos[index];
      const fileName = photoURLToDelete.split('/').pop();
      const filePath = `${userUID}/${fileName}`;

      const { error: storageError } = await supabase.storage.from('profileFoto').remove([filePath]);
      if (storageError) throw new Error(storageError.message);

      updatedPhotos.splice(index, 1);
      setSelectedPhotos(updatedPhotos);
      dispatch(updatePhotos(updatedPhotos));
      toast.success(t('messages.photoDeleted'), { position: 'top-right', autoClose: 1000 });
    } catch (error: any) {
      console.error('Erro ao excluir foto:', error.message);
      toast.error(t('messages.deleteError'), { position: 'top-right', autoClose: 1000 });
    }
  };

  // Função para excluir foto de verificação
  const handleDeleteVerificationPhoto = async (index: number) => {
    try {
      const updatedVPhotos = [...vSelectedPhotos];
      const photoURLToDelete = updatedVPhotos[index];
      const fileName = photoURLToDelete.split('/').pop();
      const filePath = `${userUID}/${fileName}`;

      const { error: storageError } = await supabase.storage.from('verificationFoto').remove([filePath]);
      if (storageError) throw new Error(storageError.message);

      updatedVPhotos.splice(index, 1);
      setVSelectedPhotos(updatedVPhotos);
      dispatch(updateVPhotos(updatedVPhotos));
      toast.success(t('messages.photoDeleted'), { position: 'top-right', autoClose: 1000 });
      console.log('Foto de verificação removida.');
    } catch (error: any) {
      console.error('Erro ao excluir foto de verificação:', error.message);
      toast.error(t('messages.deleteError'), { position: 'top-right', autoClose: 1000 });
    }
  };

  // Renderizar cards de fotos de perfil
  const renderProfilePhotoCards = () => {
    const photoCards = [];
    const totalCards = maxProfilePhotos;

    // Adicionar fotos existentes
    selectedPhotos.forEach((photoURL, index) => {
      photoCards.push(
        <div
          key={index}
          className="relative group aspect-square rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <IoTrashBin
            size={26}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer text-white bg-red-600 rounded-full p-1 transition-opacity duration-300"
            onClick={() => handleDeletePhoto(index)}
          />
          <BlurImage
            src={photoURL || '/logo.webp'}
            alt={`Foto ${index}`}
            className="w-full h-full object-cover rounded-3xl border border-gray-600"
          />
        </div>
      );
    });

    // Adicionar placeholders até atingir o limite
    const placeholdersCount = totalCards - selectedPhotos.length;
    for (let i = 0; i < placeholdersCount; i++) {
      photoCards.push(
        <label
          key={`placeholder-${i}`}
          htmlFor="upload-photo"
          className="aspect-square border-2 border-dashed dark:hover:border-darkpink border-gray-200 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-darkpink transition-colors"
        >
          <div className="text-darkpink mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 19H3C1.89543 19 1 18.1046 1 17V7C1 5.89543 1.89543 5 3 5H7L9 3H15L17 5H21C22.1046 5 23 5.89543 23 7V17C23 18.1046 22.1046 19 21 19Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span className="text-sm text-black dark:text-white font-medium underline">
            {t('photos.uploadPhoto')}
          </span>
        </label>
      );
    }

    return photoCards;
  };

  // Renderizar card de foto de verificação
  const renderVerificationPhotoCard = () => {
    return vSelectedPhotos.length > 0 ? (
      vSelectedPhotos.map((photoURL, index) => (
        <div
          key={index}
          className="relative group sm:aspect-auto aspect-square rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <IoTrashBin
            size={26}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer text-white bg-red-600 rounded-full p-1 transition-opacity duration-300"
            onClick={() => handleDeleteVerificationPhoto(index)}
          />
          <BlurImage
            srcset={photoURL || '/logo.webp'}
            alt={`Foto de Verificação ${index}`}
            className="w-full h-full object-cover rounded-3xl border border-gray-600"
          />
        </div>
      ))
    ) : (
      <label
        htmlFor="upload-verification-photo"
        className="sm:aspect-auto aspect-square border-2 border-dashed dark:hover:border-darkpink dark:border-gray-800 border-gray-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-darkpink transition-colors"
      >
        <div className="text-darkpink mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 19H3C1.89543 19 1 18.1046 1 17V7C1 5.89543 1.89543 5 3 5H7L9 3H15L17 5H21C22.1046 5 23 5.89543 23 7V17C23 18.1046 22.1046 19 21 19Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <span className="text-sm text-black dark:text-white font-medium underline">
          {t('photos.uploadPhoto')}
        </span>
        <span className="text-xs text-gray-400 text-center mt-1 px-4">
          {t('photos.verifyMessage')} {/* Ajustado para mensagem de verificação */}
        </span>
      </label>
    );
  };

  // Handle continuar (navega para próxima página)
  const handleContinue = () => {
    toast.success('Dados salvos localmente com sucesso!');
    window.location.href = '/registo/registo-pagamento';
  };

  return (
    <div className="w-full bg-white dark:border dark:border-gray-800 dark:border-opacity-50 dark:bg-transparent rounded-3xl p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">{t('photos.title')}</h1>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Link href="/registo/registo-contacto">
            <Button className="rounded-full" variant="outline">
              {t('button.back')}
            </Button>
          </Link>
          <Button
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
            onClick={handleContinue}
          >
            {t('button.createAccount')}
          </Button>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      {/* Body */}
      <div className="space-y-8">
        {/* Profile Photos Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">{t('photos.profilePhotos')}</h2>
            <span className="text-gray-500 text-sm">(Max {maxProfilePhotos})</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {renderProfilePhotoCards()}
            <input
              type="file"
              id="upload-photo"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              multiple
            />
          </div>
        </div>

        {/* Verification Photo Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">{t('photos.verifyTitle')}</h2>
            <span className="text-gray-500 text-sm">(Max {maxVerificationPhotos})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderVerificationPhotoCard()}
            <input
              type="file"
              id="upload-verification-photo"
              style={{ display: 'none' }}
              onChange={handleVerificationPhotoUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistoFotos;