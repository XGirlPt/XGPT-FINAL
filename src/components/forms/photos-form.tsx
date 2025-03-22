'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileArrayField, fetchProfileData } from '@/backend/actions/ProfileActions';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { BlurImage } from '@/components/ui/blur-image';
import { IoTrashBin } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import SubscriptionPlan from '@/components/subscriptionPlan';
import supabase from '@/backend/database/supabase';
import toast, { Toaster } from 'react-hot-toast';

// Função para adicionar marca d'água à imagem
const addWatermark = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    console.log('[WATERMARK] Iniciando processo para arquivo:', file.name, 'Tamanho:', file.size);

    const img = new Image();
    const logo = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('[WATERMARK] Erro: Contexto do canvas não disponível');
      reject(new Error('Contexto do canvas não disponível'));
      return;
    }

    // Carregar a imagem original
    img.onload = () => {
      console.log('[WATERMARK] Imagem original carregada. Dimensões:', img.width, 'x', img.height);

      // Carregar o logo
      logo.src = '/logo.webp'; // Caminho relativo ao public/
      logo.onload = () => {
        console.log('[WATERMARK] Logo carregado. Dimensões:', logo.width, 'x', logo.height);

        // Definir dimensões do canvas
        canvas.width = img.width;
        canvas.height = img.height;
        console.log('[WATERMARK] Canvas configurado com dimensões:', canvas.width, 'x', canvas.height);

        // Desenhar a imagem original
        ctx.drawImage(img, 0, 0);
        console.log('[WATERMARK] Imagem original desenhada no canvas');

        // Definir tamanho e posição do logo (50% da largura, centralizado)
        const logoWidth = img.width * 0.5; // Aumentado para 50%
        const logoHeight = (logo.height / logo.width) * logoWidth;
        const logoX = (img.width - logoWidth) / 2; // Centralizado horizontalmente
        const logoY = (img.height - logoHeight) / 2; // Centralizado verticalmente

        // Adicionar transparência ao logo (50% de opacidade)
        ctx.globalAlpha = 0.5; // Define a opacidade (0.0 = totalmente transparente, 1.0 = opaco)
        console.log('[WATERMARK] Opacidade definida para:', ctx.globalAlpha);

        // Desenhar o logo como marca d'água
        ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
        console.log('[WATERMARK] Logo desenhado no canvas em:', logoX, logoY, 'com tamanho:', logoWidth, 'x', logoHeight);

        // Restaurar a opacidade padrão para evitar afetar outras operações (opcional)
        ctx.globalAlpha = 1.0;

        // Verificar o resultado no DOM (para depuração, remova após teste)
        const previewURL = canvas.toDataURL('image/jpeg', 0.9);
        console.log('[WATERMARK] URL de pré-visualização do canvas:', previewURL);

        // Converter para Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              console.log('[WATERMARK] Canvas convertido em Blob. Tamanho:', blob.size);
              const fileName = file.name.replace(/\.[^/.]+$/, '') + '_watermarked.jpg';
              const watermarkedFile = new File([blob], fileName, { type: 'image/jpeg' });
              console.log('[WATERMARK] Arquivo com watermark criado:', watermarkedFile.name, 'Tamanho:', watermarkedFile.size);
              resolve(watermarkedFile);
            } else {
              console.error('[WATERMARK] Falha ao converter canvas para Blob');
              reject(new Error('Falha ao converter canvas para Blob'));
            }
          },
          'image/jpeg',
          0.9 // Qualidade 90%
        );
      };
      logo.onerror = () => {
        console.error('[WATERMARK] Erro ao carregar o logo em /logo.webp');
        reject(new Error('Erro ao carregar o logo'));
      };
    };
    img.onerror = () => {
      console.error('[WATERMARK] Erro ao carregar a imagem original');
      reject(new Error('Erro ao carregar a imagem'));
    };

    console.log('[WATERMARK] Configurando src da imagem original');
    img.src = URL.createObjectURL(file);
  });
};

export const PhotosForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const photoURLsRedux = useSelector((state: { profile: { photos?: string[] } }) => state.profile.photos || []);
  const userUID = useSelector((state: { profile: { userUID?: string } }) => state.profile.userUID);
  const isPremiumUser = useSelector((state: { profile: { premium: boolean } }) => state.profile.premium || false);
  const loading = useSelector((state: { profile: { loading: boolean } }) => state.profile.loading);
  const error = useSelector((state: { profile: { error?: string | null } }) => state.profile.error);

  const maxPhotos = isPremiumUser ? 10 : 3;

  const [photos, setPhotos] = useState<string[]>(photoURLsRedux);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

  useEffect(() => {
    if (userUID) {
      console.log('[INITIAL] Carregando dados iniciais para userUID:', userUID);
      dispatch(fetchProfileData());
    } else {
      console.error('[INITIAL] userUID está indefinido - verifique a autenticação');
    }
  }, [dispatch, userUID]);

  useEffect(() => {
    console.log('[SYNC] Sincronizando photos com Redux. photoURLsRedux:', photoURLsRedux);
    setPhotos(photoURLsRedux);
  }, [photoURLsRedux]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (photos.length >= maxPhotos) {
      toast.error(t('messages.maxPhotosReached'));
      return;
    }

    if (!userUID) {
      toast.error('Usuário não autenticado. Por favor, faça login novamente.');
      return;
    }

    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const remainingSlots = maxPhotos - photos.length;
      const selectedFiles = files.slice(0, remainingSlots);

      setPendingFiles((prev) => [...prev, ...selectedFiles]);
      const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
      setPhotos((prev) => [...prev, ...previewURLs]);
      console.log('[UPLOAD] Atualizando estado local com pré-visualização:', previewURLs);
    }
  };

  const handleDeletePhoto = async (index: number) => {
    const photoURLToDelete = photos[index];
    const updatedPhotosArray = [...photos];

    if (photoURLToDelete.startsWith('blob:')) {
      URL.revokeObjectURL(photoURLToDelete);
      updatedPhotosArray.splice(index, 1);
      setPhotos(updatedPhotosArray);
      setPendingFiles((prev) => prev.filter((_, i) => i !== index - (photos.length - prev.length)));
      toast.success(t('messages.photoDeleted'));
    } else {
      try {
        const fileName = photoURLToDelete.split('/').pop();
        const filePath = `${userUID}/${fileName}`;

        const { error: storageError } = await supabase.storage
          .from('profileFoto')
          .remove([filePath]);

        if (storageError) throw new Error(storageError.message);

        const { error: dbError } = await supabase
          .from('profilephoto')
          .delete()
          .match({ imageurl: photoURLToDelete, userUID });

        if (dbError) throw new Error(dbError.message);

        updatedPhotosArray.splice(index, 1);
        setPhotos(updatedPhotosArray);
        dispatch({ type: 'profile/setPhotos', payload: updatedPhotosArray });
        toast.success(t('messages.photoDeleted'));
      } catch (error: any) {
        console.error('[DELETE] Erro ao excluir foto:', error.message);
        toast.error(t('messages.deleteError'));
      }
    }
  };

  const handleDiscard = () => {
    console.log('[DISCARD] Descartando alterações. Restaurando para:', photoURLsRedux);
    photos.forEach((url) => {
      if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    });
    setPhotos(photoURLsRedux);
    setPendingFiles([]);
    toast.info(t('messages.changesDiscarded'));
  };

  const handleSave = async () => {
    if (!userUID) {
      toast.error('Erro: ID do usuário não encontrado.');
      return;
    }

    console.log('[SAVE] Iniciando salvamento. Photos atuais:', photos);
    console.log('[SAVE] Arquivos pendentes:', pendingFiles.map((f) => f.name));

    try {
      const uploadPromises = pendingFiles.map(async (file) => {
        console.log('[SAVE] Processando arquivo:', file.name);
        const watermarkedFile = await addWatermark(file);
        console.log('[SAVE] Arquivo com watermark gerado:', watermarkedFile.name, 'Tamanho:', watermarkedFile.size);

        const fileName = watermarkedFile.name;
        const filePath = `${userUID}/${fileName}`;

        console.log('[SAVE] Fazendo upload para Supabase. Caminho:', filePath);
        const { error: uploadError } = await supabase.storage
          .from('profileFoto')
          .upload(filePath, watermarkedFile);

        if (uploadError) {
          console.error('[SAVE] Erro ao fazer upload do arquivo:', uploadError.message);
          throw new Error(uploadError.message);
        }

        const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
        console.log('[SAVE] URL pública gerada:', publicURLFoto);

        console.log('[SAVE] Inserindo no banco de dados');
        const { error: insertError } = await supabase
          .from('profilephoto')
          .insert({ userUID, imageurl: publicURLFoto });

        if (insertError) {
          console.error('[SAVE] Erro ao inserir no banco de dados:', insertError.message);
          throw new Error(insertError.message);
        }

        return publicURLFoto;
      });

      const uploadedURLs = await Promise.all(uploadPromises);
      console.log('[SAVE] URLs das fotos enviadas:', uploadedURLs);

      const savedPhotos = photos.filter((url) => !url.startsWith('blob:'));
      const newPhotos = [...savedPhotos, ...uploadedURLs];

      console.log('[SAVE] Atualizando Redux com novas fotos:', newPhotos);
      dispatch({ type: 'profile/setPhotos', payload: newPhotos });

      photos.forEach((url) => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
      });
      setPhotos(newPhotos);
      setPendingFiles([]);
      toast.success(t('messages.photoSaved'));
    } catch (error: any) {
      console.error('[SAVE] Erro ao salvar fotos:', error.message);
      toast.error(t('messages.saveError'));
    }
  };

  const renderPhotoCards = () => {
    const photoCards = [];
    const totalCards = 10;

    console.log('[RENDER] Renderizando cards. Photos:', photos);

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

    const remainingSlots = maxPhotos - photos.length;
    for (let i = 0; i < remainingSlots && photoCards.length < maxPhotos; i++) {
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

    if (!isPremiumUser) {
      while (photoCards.length < totalCards) {
        photoCards.push(
          <div
            key={`locked-${photoCards.length}`}
            className="aspect-square bg-[#fff4de] dark:bg-[#27191f] rounded-3xl flex flex-col items-center justify-center"
          >
            <div className="text-yellow-500 mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fdb315">
                <path d="M12 17C10.89 17 10 16.1 10 15C10 13.89 10.89 13 12 13C13.11 13 14 13.89 14 15C14 16.1 13.11 17 12 17M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.89 8 4 8.89 4 10V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V10C20 8.89 19.11 8 18 8M8.9 6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8H8.9V6Z" />
              </svg>
            </div>
            <h3>{t('photos.locked')}</h3>
            <span className="text-sm text-gray-500 text-center px-4">{t('photos.lockedMessage')}</span>
            <button
              className="mt-2 bg-[#fdb315] text-white dark:text-black px-4 py-1 rounded-full text-sm hover:bg-yellow-600"
              onClick={() => setShowSubscriptionPopup(true)}
            >
              {t('photos.buyNow')}
            </button>
          </div>
        );
      }
    }

    return photoCards;
  };

  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error')}: {error}</div>;

  return (
    <div className="w-full bg-white dark:border dark:border-gray-800 dark:border-opacity-50 dark:bg-transparent rounded-3xl p-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">{t('photos.title')}</h1>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Button className="rounded-full" variant="outline" onClick={handleDiscard}>
            {t('buttonSave.discard')}
          </Button>
          <Button
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
            onClick={handleSave}
          >
            {t('buttonSave.saveChanges')}
          </Button>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      <div className="space-y-8">
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

        {showSubscriptionPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#100007] rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <Button
                className="absolute top-2 right-2"
                variant="ghost"
                onClick={() => setShowSubscriptionPopup(false)}
              >
                X
              </Button>
              <SubscriptionPlan userUID={userUID} onPlanoSelect={() => setShowSubscriptionPopup(false)} />
            </div>
          </div>
        )}
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default PhotosForm;