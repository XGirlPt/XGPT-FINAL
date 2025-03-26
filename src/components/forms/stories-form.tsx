'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileData } from '@/backend/actions/ProfileActions';
import supabase from '@/backend/database/supabase';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { IoTrashBin } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import SubscriptionPlan from '@/components/subscriptionPlan';
import { updateStories } from '@/backend/reducers/profileSlice';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

// Variantes para animação do popup
const popupVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

export const StoriesForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const storyURLsRedux = useSelector((state: { profile: { storyURL?: string[] } }) => state.profile.storyURL || []);
  const userUID = useSelector((state: { profile: { userUID?: string } }) => state.profile.userUID);
  const isPremiumUser = useSelector((state: { profile: { premium: boolean } }) => state.profile.premium || false);
  const loading = useSelector((state: { profile: { loading: boolean } }) => state.profile.loading);
  const error = useSelector((state: { profile: { error?: string | null } }) => state.profile.error);

  const maxStories = 5;

  const [stories, setStories] = useState<string[]>(storyURLsRedux);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

  useEffect(() => {
    if (userUID) {
      console.log('Carregando dados iniciais para userUID:', userUID);
      dispatch(fetchProfileData());
    } else {
      console.error('userUID está indefinido - verifique a autenticação');
    }
  }, [dispatch, userUID]);

  useEffect(() => {
    console.log('Sincronizando stories com Redux. storyURLsRedux:', storyURLsRedux);
    setStories(storyURLsRedux);
  }, [storyURLsRedux]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPremiumUser) {
      setShowSubscriptionPopup(true);
      return;
    }
    if (stories.length >= maxStories) {
      toast.error(t('messages.maxStoriesReached'));
      return;
    }
    if (!userUID) {
      toast.error('Usuário não autenticado. Por favor, faça login novamente.');
      return;
    }
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const remainingSlots = maxStories - stories.length;
      const selectedFiles = files.slice(0, remainingSlots);
      setPendingFiles((prev) => [...prev, ...selectedFiles]);
      const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
      setStories((prev) => [...prev, ...previewURLs]);
      console.log('[UPLOAD] Atualizando estado local com pré-visualização:', previewURLs);
    }
  };

  const handleDeleteStory = async (index: number) => {
    if (!isPremiumUser) {
      toast.error('Apenas usuários premium podem excluir stories.');
      return;
    }
    if (!userUID) {
      toast.error('Usuário não autenticado.');
      return;
    }

    const storyURLToDelete = stories[index];
    const updatedStoriesArray = [...stories];
    console.log('[DELETE] Iniciando exclusão do story no índice:', index, 'URL:', storyURLToDelete);

    try {
      if (storyURLToDelete.startsWith('blob:')) {
        URL.revokeObjectURL(storyURLToDelete);
        updatedStoriesArray.splice(index, 1);
        setStories(updatedStoriesArray);
        setPendingFiles((prev) => prev.filter((_, i) => i !== index - (stories.length - prev.length)));
        console.log('[DELETE] Pré-visualização excluída. Novo array de stories:', updatedStoriesArray);
        toast.success(t('messages.storyDeleted'));
      } else {
        const fileName = storyURLToDelete.split('/').pop();
        const filePath = `${userUID}/${fileName}`;
        console.log('[DELETE] Excluindo arquivo do Supabase Storage:', filePath);

        const { error: storageError } = await supabase.storage
          .from('storyStorage')
          .remove([filePath]);
        if (storageError) {
          console.error('[DELETE] Erro ao remover do Storage:', storageError.message);
          throw new Error(storageError.message);
        }

        console.log('[DELETE] Excluindo entrada do banco de dados:', storyURLToDelete);
        const { error: dbError } = await supabase
          .from('stories')
          .delete()
          .match({ storyurl: storyURLToDelete, userUID });
        if (dbError) {
          console.error('[DELETE] Erro ao excluir do banco de dados:', dbError.message);
          throw new Error(dbError.message);
        }

        updatedStoriesArray.splice(index, 1);
        console.log('[DELETE] Story excluído com sucesso. Novo array:', updatedStoriesArray);
        dispatch(updateStories(updatedStoriesArray));
        setStories(updatedStoriesArray);
        toast.success(t('messages.storyDeleted'));
      }
    } catch (error: any) {
      console.error('[DELETE] Erro ao excluir story:', error.message);
      toast.error(t('messages.deleteError'));
    }
  };

  const handleDiscard = () => {
    console.log('Descartando alterações. Restaurando para:', storyURLsRedux);
    stories.forEach((url) => {
      if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    });
    setStories(storyURLsRedux);
    setPendingFiles([]);
    toast.info(t('messages.changesDiscarded'));
  };

  const handleSave = async () => {
    if (!userUID) {
      toast.error('Erro: ID do usuário não encontrado.');
      return;
    }
    console.log('[SAVE] Iniciando salvamento. Stories atuais:', stories);
    console.log('[SAVE] Arquivos pendentes:', pendingFiles.map((f) => f.name));

    if (pendingFiles.length === 0) {
      console.log('[SAVE] Nenhum arquivo pendente para salvar.');
      toast.info('Nenhum novo story para salvar.');
      return;
    }

    try {
      const uploadPromises = pendingFiles.map(async (file) => {
        console.log('[SAVE] Processando arquivo:', file.name);

        const fileName = file.name.toLowerCase().replace(/ /g, '_').replace(/\./g, '_');
        const filePath = `${userUID}/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from('storyStorage')
          .upload(filePath, file, { contentType: 'video/mp4', upsert: true });

        if (uploadError) {
          console.error('[SAVE] Erro ao fazer upload para o Supabase:', uploadError.message);
          throw new Error(uploadError.message);
        }

        const publicURL = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/storyStorage/${filePath}`;
        console.log('[SAVE] URL pública gerada:', publicURL);

        console.log('[SAVE] Inserindo no banco de dados');
        const { error: insertError } = await supabase
          .from('stories')
          .insert({ userUID, storyurl: publicURL });
        if (insertError) {
          console.error('[SAVE] Erro ao inserir no banco de dados:', insertError.message);
          throw new Error(insertError.message);
        }

        return publicURL;
      });

      const uploadedURLs = await Promise.all(uploadPromises);
      console.log('[SAVE] URLs dos stories enviados:', uploadedURLs);
      const savedStories = stories.filter((url) => !url.startsWith('blob:'));
      const newStories = [...savedStories, ...uploadedURLs];
      console.log('[SAVE] Atualizando Redux com novos stories:', newStories);

      dispatch(updateStories(newStories));
      setStories(newStories);
      setPendingFiles([]);

      toast.success(t('messages.storyUploaded'), {
        position: "top-right",
        autoClose: 3000,
      });

      dispatch(fetchProfileData());
    } catch (error: any) {
      console.error('[SAVE] Erro ao salvar stories:', error.message);
      toast.error(t('messages.saveError'));
    }
  };

  const renderStoryCards = () => {
    const storyCards = [];
    const totalCards = 5;
    console.log('Renderizando cards. Stories:', stories);
    if (isPremiumUser) {
      stories.forEach((storyURL, index) => {
        storyCards.push(
          <div
            key={index}
            className="relative group aspect-[2/3] rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <button
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer text-white bg-red-600 rounded-full p-1 transition-opacity duration-300 z-10"
              onClick={() => handleDeleteStory(index)}
            >
              <IoTrashBin size={26} />
            </button>
            <video
              src={storyURL || '/logo.webp'}
              className="w-full h-full object-cover rounded-3xl border border-gray-600"
              controls={false}
              muted
              playsInline
              autoPlay
            />
          </div>
        );
      });
      const remainingSlots = maxStories - stories.length;
      for (let i = 0; i < remainingSlots && storyCards.length < maxStories; i++) {
        storyCards.push(
          <label
            key={`placeholder-${i}`}
            htmlFor="upload-story"
            className="aspect-[2/3] border-2 border-dashed dark:hover:border-darkpink border-gray-200 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-darkpink transition-colors"
          >
            <div className="text-darkpink mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 19H3C1.89543 19 1 18.1046 1 17V7C1 5.89543 1.89543 5 3 5H7L9 3H15L17 5H21C22.1046 5 23 5.89543 23 7V17C23 18.1046 22.1046 19 21 19Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="text-sm text-black dark:text-white font-medium underline">{t('stories.addStory')}</span>
          </label>
        );
      }
    } else {
      for (let i = 0; i < totalCards; i++) {
        storyCards.push(
          <div key={`locked-${i}`} className="aspect-[2/3] bg-[#fff4de] dark:bg-[#27191f] rounded-3xl flex flex-col items-center justify-center">
            <div className="text-yellow-500 mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fdb315">
                <path d="M12 17C10.89 17 10 16.1 10 15C10 13.89 10.89 13 12 13C13.11 13 14 13.89 14 15C14 16.1 13.11 17 12 17M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.89 8 4 8.89 4 10V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V10C20 8.89 19.11 8 18 8M8.9 6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8H8.9V6Z" />
              </svg>
            </div>
            <h3>{t('stories.locked')}</h3>
            <span className="text-sm text-gray-500 text-center px-4">{t('stories.lockedMessage')}</span>
            <button
              className="mt-2 bg-[#fdb315] text-white dark:text-black px-4 py-1 rounded-full text-sm hover:bg-yellow-600"
              onClick={() => setShowSubscriptionPopup(true)}
            >
              {t('stories.buyNow')}
            </button>
          </div>
        );
      }
    }
    return storyCards;
  };

  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error')}: {error}</div>;

  return (
    <div className="w-full bg-white dark:border dark:border-gray-800 dark:border-opacity-50 dark:bg-transparent rounded-3xl p-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">{t('stories.title')}</h1>
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
            <h2 className="text-lg font-semibold">{t('stories.profileStories')}</h2>
            <span className="text-gray-500 text-sm">(Max {maxStories})</span>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {renderStoryCards()}
            <input
              type="file"
              id="upload-story"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              multiple
              accept=".mp4,.mov"
            />
          </div>
        </div>
      </div>

      {/* Popup do SubscriptionPlan */}
      {showSubscriptionPopup && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={popupVariants}
        >
          <div className="relative bg-[#f2ebee] dark:bg-[#100007] rounded-3xl p-6 max-w-4xl w-full mx-4">
            <Button
              className="absolute top-4 right-4 bg-transparent text-white hover:bg-gray-700 rounded-full p-2"
              onClick={() => setShowSubscriptionPopup(false)}
            >
         
            </Button>
            <SubscriptionPlan userUID={userUID} onPlanoSelect={() => setShowSubscriptionPopup(false)} />
          </div>
        </motion.div>
      )}

      <ToastContainer />
    </div>
  );
};

export default StoriesForm;