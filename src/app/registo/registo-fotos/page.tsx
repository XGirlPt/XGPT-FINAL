'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { updatePhotos, updateVPhotos } from '@/backend/reducers/profileSlice';
import supabase from '@/backend/database/supabase';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BlurImage } from '@/components/ui/blur-image';
import { IoTrashBin } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { shallowEqual } from 'react-redux';

export function RegistoFotos() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();

  // Dados do Redux com shallowEqual para estabilizar referências
  const { userUID, photosFromRedux, vphotosFromRedux, isPremium } = useSelector(
    (state: any) => ({
      userUID: state.profile?.profile?.userUID,
      photosFromRedux: state.profile?.profile?.photos || [],
      vphotosFromRedux: state.profile?.profile?.vphotos || [],
      isPremium: state.profile?.profile?.premium || false,
    }),
    shallowEqual
  );

  // Estado local sincronizado com Redux
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(photosFromRedux);
  const [vSelectedPhotos, setVSelectedPhotos] = useState<string[]>(vphotosFromRedux);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPlanChoiceModal, setShowPlanChoiceModal] = useState(false);

  // Limite de fotos com base no plano
  const maxProfilePhotos = isPremium ? 10 : 3;
  const maxVerificationPhotos = 1;

  // Sincronizar com Redux apenas quando os valores mudam
  useEffect(() => {
    // Verificar se os arrays são diferentes antes de atualizar o estado
    if (JSON.stringify(selectedPhotos) !== JSON.stringify(photosFromRedux)) {
      setSelectedPhotos(photosFromRedux);
    }
    if (JSON.stringify(vSelectedPhotos) !== JSON.stringify(vphotosFromRedux)) {
      setVSelectedPhotos(vphotosFromRedux);
    }
  }, [photosFromRedux, vphotosFromRedux, selectedPhotos, vSelectedPhotos]);

  // Função para upload de fotos de perfil
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const files = Array.from(event.target.files);
    const remainingSlots = maxProfilePhotos - selectedPhotos.length;

    if (remainingSlots <= 0) {
      setShowUpgradeModal(true);
      return;
    }

    const filesToUpload = files.slice(0, remainingSlots);
    const uploadedPhotoURLs: string[] = [];

    const uploadPromises = filesToUpload.map(async (file) => {
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
  };

  // Função para upload de foto de verificação
  const handleVerificationPhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

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

    const totalCards = isPremium ? 10 : 4; // 10 para premium, 4 para free (3 fotos + 1 bloqueada)

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

    const placeholdersCount = maxProfilePhotos - selectedPhotos.length;
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

    if (!isPremium) {
      photoCards.push(
        <div
          key="locked"
          className="aspect-square bg-[#fff4de] dark:bg-[#27191f] rounded-3xl flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setShowPlanChoiceModal(true)}
        >
          <div className="text-yellow-500 mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fdb315">
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
            src={photoURL || '/logo.webp'} // Corrigido de srcset para src
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
          {t('photos.verifyMessage')}
        </span>
      </label>
    );
  };

  // Handle continuar
  const handleContinue = () => {
    if (selectedPhotos.length === 0) {
      toast.error('Por favor, adicione pelo menos uma foto de perfil.', { position: 'top-right', autoClose: 2000 });
      return;
    }
    toast.success('Dados salvos localmente com sucesso!', { position: 'top-right', autoClose: 1000 });
    router.push('/registo/registo-pagamento');
  };

  return (
    <div className="w-full bg-white dark:border dark:border-gray-800 dark:border-opacity-50 dark:bg-transparent rounded-3xl p-8">
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

          <Link href="/registo/registo-pagamento">
          <Button
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
            onClick={handleContinue}
          >
            {t('button.createAccount')}
          </Button>
          </Link>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      <div className="space-y-8">
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
              accept="image/*"
            />
          </div>
        </div>

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
              accept="image/*"
            />
          </div>
        </div>
      </div>

      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar para Premium</DialogTitle>
            <DialogDescription>
              {isPremium
                ? 'Você atingiu o limite de 10 fotos no plano premium.'
                : 'Você atingiu o limite de 3 fotos no plano gratuito. Atualize para o plano premium para adicionar até 10 fotos e desbloquear mais funcionalidades!'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
              Fechar
            </Button>
            {!isPremium && (
              <Button onClick={() => router.push('/planos')}>
                Mudar para Premium
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPlanChoiceModal} onOpenChange={setShowPlanChoiceModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escolha o Seu Plano</DialogTitle>
            <DialogDescription>
              Para adicionar mais fotos, escolha um plano premium.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setShowPlanChoiceModal(false)}>
              Manter Plano Gratuito
            </Button>
            <Button onClick={() => router.push('/planos')}>
              Mudar para Premium
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RegistoFotos;