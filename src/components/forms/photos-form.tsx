'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePhotos } from '@/backend/actions/ProfileActions';
import supabase from '@/backend/database/supabase';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { BlurImage } from '@/components/ui/blur-image';
import { IoTrashBin } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const PhotosForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Dados do Redux
  const photoURLsRedux = useSelector((state: any) => state.profile?.profile?.photos || []);
  const userUID = useSelector((state: any) => state.profile?.profile?.userUID);

  // Estado para usuário premium (pode ser conectado à lógica real do seu sistema)
  const [isPremiumUser] = useState(false); // Substitua por lógica real de premium
  const maxPhotos = isPremiumUser ? 10 : 3;

  // Estado para fotos locais (sincronizado com Redux)
  const [photos, setPhotos] = useState<string[]>(photoURLsRedux);

  // Sincronizar fotos locais com Redux ao carregar
  useEffect(() => {
    setPhotos(photoURLsRedux);
  }, [photoURLsRedux]);

  // Função de upload de fotos
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const remainingSlots = maxPhotos - photos.length;
      const selected = files.slice(0, remainingSlots); // Limitar ao número máximo permitido
      const uploadedPhotoURLs: string[] = [];

      const uploadPromises = selected.map(async (file) => {
        const filePath = `${userUID}/${file.name.toLowerCase().replace(/ /g, '_').replace(/\./g, '_')}`;
        try {
          const { error } = await supabase.storage
            .from('profileFoto')
            .upload(filePath, file);

          if (error) {
            throw new Error(error.message);
          }

          const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
          uploadedPhotoURLs.push(publicURLFoto);
        } catch (error: any) {
          console.error('Erro durante o upload:', error.message);
          toast.error(t('messages.uploadError'), { position: 'top-right', autoClose: 1000 });
        }
      });

      await Promise.all(uploadPromises);

      if (uploadedPhotoURLs.length > 0) {
        const photoInsertionsProfile = uploadedPhotoURLs.map((photoURL) => ({
          userUID,
          imageurl: photoURL,
        }));

        try {
          const { error: photoError } = await supabase
            .from('profilephoto')
            .insert(photoInsertionsProfile);

          if (photoError) {
            throw new Error(photoError.message);
          }

          const newPhotoURLs = [...photos, ...uploadedPhotoURLs];
          setPhotos(newPhotoURLs);
          dispatch(updatePhotos(newPhotoURLs));
          toast.success(t('messages.photoUploaded'), { position: 'top-right', autoClose: 1000 });
        } catch (error: any) {
          console.error('Erro ao inserir URLs na tabela:', error.message);
          toast.error(t('messages.uploadError'), { position: 'top-right', autoClose: 1000 });
        }
      }
    }
  };

  // Função para excluir foto
  const handleDeletePhoto = async (index: number) => {
    try {
      const updatedPhotosArray = [...photos];
      const photoURLToDelete = updatedPhotosArray[index];
      const fileName = photoURLToDelete.split('/').pop();
      const filePath = `${userUID}/${fileName}`;

      const { error: storageError } = await supabase.storage
        .from('profileFoto')
        .remove([filePath]);

      if (storageError) {
        throw new Error(storageError.message);
      }

      const { error: dbError } = await supabase
        .from('profilephoto')
        .delete()
        .match({ imageurl: photoURLToDelete, userUID });

      if (dbError) {
        throw new Error(dbError.message);
      }

      updatedPhotosArray.splice(index, 1);
      setPhotos(updatedPhotosArray);
      dispatch(updatePhotos(updatedPhotosArray));
      toast.success(t('messages.photoDeleted'), { position: 'top-right', autoClose: 1000 });
    } catch (error: any) {
      console.error('Erro ao excluir foto:', error.message);
      toast.error(t('messages.deleteError'), { position: 'top-right', autoClose: 1000 });
    }
  };

  // Handle discard button click
  const handleDiscard = () => {
    setPhotos(photoURLsRedux); // Reverter para o estado do Redux
    toast.info(t('messages.changesDiscarded'), { position: 'top-right', autoClose: 1000 });
  };

  // Handle save button click
  const handleSave = () => {
    dispatch(updatePhotos(photos));
    toast.success(t('messages.changesSaved'), { position: 'top-right', autoClose: 1000 });
  };

  // Renderizar sempre 10 cards
  const renderPhotoCards = () => {
    const photoCards = [];
    const totalCards = 10;

    // Adicionar fotos existentes
    photos.forEach((photoURL, index) => {
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

    // Adicionar placeholders até atingir 10 cards, respeitando o limite de upload
    const placeholdersCount = Math.min(totalCards - photos.length, isPremiumUser ? totalCards : maxPhotos - photos.length);
    for (let i = 0; i < placeholdersCount; i++) {
      photoCards.push(
        <label
          key={`placeholder-${i}`}
          htmlFor="upload-photo"
          className="aspect-square border-2 border-dashed dark:hover:border-darkpink border-gray-200 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-darkpink transition-colors"
        >
          <div className="text-darkpink mb-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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

    // Adicionar o card "Locked" se necessário (apenas para não premium e após atingir o limite de 3)
    if (!isPremiumUser && photos.length >= 3 && photoCards.length < totalCards) {
      photoCards.push(
        <div
          key="locked"
          className="aspect-square bg-[#fff4de] dark:bg-[#27191f] rounded-3xl flex flex-col items-center justify-center"
        >
          <div className="text-yellow-500 mb-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#fdb315"
            >
              <path d="M12 17C10.89 17 10 16.1 10 15C10 13.89 10.89 13 12 13C13.11 13 14 13.89 14 15C14 16.1 13.11 17 12 17M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.89 8 4 8.89 4 10V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V10C20 8.89 19.11 8 18 8M8.9 6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8H8.9V6Z" />
            </svg>
          </div>
          <h3>{t('photos.locked')}</h3>
          <span className="text-sm text-gray-500 text-center px-4">
            {t('photos.lockedMessage')}
          </span>
          <button className="mt-2 bg-[#fdb315] text-white dark:text-black px-4 py-1 rounded-full text-sm hover:bg-yellow-600">
            {t('photos.buyNow')}
          </button>
        </div>
      );
    }

    // Garantir que sempre haja 10 cards
    while (photoCards.length < totalCards) {
      photoCards.push(
        <div
          key={`empty-${photoCards.length}`}
          className="aspect-square border-2 border-dashed dark:border-gray-800 border-gray-200 rounded-3xl flex flex-col items-center justify-center opacity-50"
        >
          <div className="text-gray-400 mb-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 19H3C1.89543 19 1 18.1046 1 17V7C1 5.89543 1.89543 5 3 5H7L9 3H15L17 5H21C22.1046 5 23 5.89543 23 7V17C23 18.1046 22.1046 19 21 19Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span className="text-sm text-gray-400 font-medium">{t('photos.uploadPhoto')}</span>
        </div>
      );
    }

    return photoCards;
  };

  return (
    <div className="w-full bg-white dark:border dark:border-gray-800 dark:border-opacity-50 dark:bg-transparent rounded-3xl p-8">
      {/* Header with title and buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">{t('photos.title')}</h1>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Button
            className="rounded-full"
            variant="outline"
            onClick={handleDiscard}
          >
            {t('button.discard')}
          </Button>
          <Button
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
            onClick={handleSave}
          >
            {t('button.saveChanges')}
          </Button>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      {/* Body section */}
      <div className="space-y-8">
        {/* Profile Photos Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">{t('photos.profilePhotos')}</h2>
            <span className="text-gray-500 text-sm">(Max {maxPhotos})</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {renderPhotoCards()}
            <input
              type="file"
              id="upload-photo"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              multiple
            />
          </div>
        </div>

        {/* Social Media Photos Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">{t('photos.socialMediaPhotos')}</h2>
            <span className="text-gray-500 text-sm">(Max 10)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Upload Social Media Photo Box */}
            <label
              htmlFor="upload-social-photo"
              className="sm:aspect-auto aspect-square border-2 border-dashed dark:hover:border-darkpink dark:border-gray-800 border-gray-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-darkpink transition-colors"
            >
              <div className="text-darkpink mb-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 19H3C1.89543 19 1 18.1046 1 17V7C1 5.89543 1.89543 5 3 5H7L9 3H15L17 5H21C22.1046 5 23 5.89543 23 7V17C23 18.1046 22.1046 19 21 19Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="text-sm text-black dark:text-white font-medium underline">
                {t('photos.uploadPhoto')}
              </span>
              <span className="text-xs text-gray-400 text-center mt-1 px-4">
                {t('photos.socialMediaMessage')}
              </span>
              <input
                type="file"
                id="upload-social-photo"
                style={{ display: 'none' }}
                onChange={handleFileUpload} // Pode ajustar para um bucket diferente se necessário
                multiple
              />
            </label>

            {/* Verification Box */}
            <div className="sm:aspect-auto aspect-square bg-[#FFF5F8] dark:bg-[#27191f] rounded-3xl flex flex-col items-center justify-center p-6">
              <div className="text-darkpink mb-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{t('photos.verifyTitle')}</h3>
              <p className="text-sm text-gray-500 text-center mb-3">
                {t('photos.verifyMessage')}
              </p>
              <button className="bg-darkpink text-white px-6 py-2 rounded-full text-sm hover:bg-darkpinkhover">
                {t('photos.verifyNow')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosForm;