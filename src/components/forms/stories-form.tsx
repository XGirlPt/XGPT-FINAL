'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStories } from '@/backend/actions/ProfileActions';
import supabase from '@/backend/database/supabase';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { IoTrashBin } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const StoriesForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Dados do Redux
  const storyURLsRedux = useSelector((state: any) => state.profile?.profile?.stories || []);
  const userUID = useSelector((state: any) => state.profile?.profile?.userUID);

  // Estado para usuário premium (pode ser conectado à lógica real do seu sistema)
  const [isPremiumUser] = useState(false); // Substitua por lógica real de premium
  const maxStories = isPremiumUser ? 10 : 5;

  // Estado para stories locais (sincronizado com Redux)
  const [stories, setStories] = useState<string[]>(storyURLsRedux);
  const [loading, setLoading] = useState(false);

  // Sincronizar stories locais com Redux ao carregar
  useEffect(() => {
    setStories(storyURLsRedux);
  }, [storyURLsRedux]);

  // Buscar stories do banco de dados ao carregar
  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const { data: storyData, error: storyError } = await supabase
          .from('stories')
          .select('storyurl')
          .eq('userUID', userUID);

        if (storyError) throw new Error(storyError.message);

        const fetchedStories = storyData.map((story) => story.storyurl);
        dispatch(updateStories(fetchedStories));
      } catch (error: any) {
        console.error('Erro ao buscar stories:', error.message);
        toast.error(t('messages.fetchError'), { position: 'top-right', autoClose: 1000 });
      } finally {
        setLoading(false);
      }
    };

    if (userUID) fetchStories();
  }, [userUID, dispatch, t]);

  // Função de upload de stories
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const remainingSlots = maxStories - stories.length;
      const selected = files.slice(0, remainingSlots); // Limitar ao número máximo permitido
      const uploadedStoryURLs: string[] = [];

      const uploadPromises = selected.map(async (file) => {
        const filePath = `${userUID}/${file.name.toLowerCase().replace(/ /g, '_').replace(/\./g, '_')}`;
        try {
          const { error } = await supabase.storage
            .from('storyStorage')
            .upload(filePath, file);

          if (error) throw new Error(error.message);

          const publicURLStory = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/storyStorage/${filePath}`;
          uploadedStoryURLs.push(publicURLStory);
        } catch (error: any) {
          console.error('Erro durante o upload:', error.message);
          toast.error(t('messages.uploadError'), { position: 'top-right', autoClose: 1000 });
        }
      });

      await Promise.all(uploadPromises);

      if (uploadedStoryURLs.length > 0) {
        const storyInsertionsProfile = uploadedStoryURLs.map((storyURL) => ({
          userUID,
          storyurl: storyURL,
        }));

        try {
          const { error: storyError } = await supabase
            .from('stories')
            .insert(storyInsertionsProfile);

          if (storyError) throw new Error(storyError.message);

          const newStoryURLs = [...stories, ...uploadedStoryURLs];
          setStories(newStoryURLs);
          dispatch(updateStories(newStoryURLs));
          toast.success(t('messages.storyUploaded'), { position: 'top-right', autoClose: 1000 });
        } catch (error: any) {
          console.error('Erro ao inserir URLs na tabela:', error.message);
          toast.error(t('messages.uploadError'), { position: 'top-right', autoClose: 1000 });
        }
      }
    }
    setLoading(false);
  };

  // Função para excluir story
  const handleDeleteStory = async (index: number) => {
    try {
      const updatedStoriesArray = [...stories];
      const storyURLToDelete = updatedStoriesArray[index];
      const fileName = storyURLToDelete.split('/').pop();
      const filePath = `${userUID}/${fileName}`;

      const { error: storageError } = await supabase.storage
        .from('storyStorage')
        .remove([filePath]);

      if (storageError) throw new Error(storageError.message);

      const { error: dbError } = await supabase
        .from('stories')
        .delete()
        .match({ storyurl: storyURLToDelete, userUID });

      if (dbError) throw new Error(dbError.message);

      updatedStoriesArray.splice(index, 1);
      setStories(updatedStoriesArray);
      dispatch(updateStories(updatedStoriesArray));
      toast.success(t('messages.storyDeleted'), { position: 'top-right', autoClose: 1000 });
    } catch (error: any) {
      console.error('Erro ao excluir story:', error.message);
      toast.error(t('messages.deleteError'), { position: 'top-right', autoClose: 1000 });
    }
  };

  // Handle discard button click
  const handleDiscard = () => {
    setStories(storyURLsRedux); // Reverter para o estado do Redux
    toast.info(t('messages.changesDiscarded'), { position: 'top-right', autoClose: 1000 });
  };

  // Handle save button click
  const handleSave = () => {
    dispatch(updateStories(stories));
    toast.success(t('messages.changesSaved'), { position: 'top-right', autoClose: 1000 });
  };

  return (
    <div className="w-full bg-white dark:bg-transparent dark:border dark:border-gray-800 dark:border-opacity-50 rounded-3xl p-8">
      {/* Header with title and buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">{t('stories.title')}</h1>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Button
            className="rounded-full"
            variant="outline"
            onClick={handleDiscard}
            disabled={loading}
          >
            {t('button.discard')}
          </Button>
          <Button
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
            onClick={handleSave}
            disabled={loading}
          >
            {t('button.saveChanges')}
          </Button>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      {/* Body section */}
      <div className="space-y-8">
        {/* Profile Stories Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">{t('stories.profileStories')}</h2>
            <span className="text-gray-500 text-sm">(Max {maxStories})</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Existing Stories */}
            {stories.map((storyURL, index) => (
              <div
                key={index}
                className="relative group border-2 border-dashed dark:border-gray-800 border-gray-200 dark:hover:border-darkpink rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                style={{ paddingTop: '150%' }} // Aspect ratio 2:3
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <IoTrashBin
                    size={26}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer text-white bg-red-600 rounded-full p-1 transition-opacity duration-300 z-10"
                    onClick={() => handleDeleteStory(index)}
                  />
                  <video
                    src={storyURL || '/logo.webp'}
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    controls={false}
                    muted
                    playsInline
                  />
                </div>
              </div>
            ))}

            {/* Upload Story Boxes */}
            {stories.length < maxStories &&
              [...Array(maxStories - stories.length)].map((_, index) => (
                <label
                  key={index}
                  htmlFor="upload-story"
                  className="relative border-2 border-dashed dark:border-gray-800 border-gray-200 dark:hover:border-darkpink rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-darkpink transition-colors"
                  style={{ paddingTop: '150%' }} // Aspect ratio 2:3
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
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
                    <span className="text-sm text-black dark:text-white underline font-medium">
                      {t('stories.addStory')}
                    </span>
                  </div>
                  <input
                    type="file"
                    id="upload-story"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                    multiple
                    accept=".mp4,.mov"
                    disabled={loading}
                  />
                </label>
              ))}

            {/* Locked Box */}
            {!isPremiumUser && stories.length >= 5 && (
              <div
                className="relative bg-[#fff4de] dark:bg-[#27191f] rounded-3xl flex flex-col items-center justify-center"
                style={{ paddingTop: '150%' }} // Aspect ratio 2:3
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
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
                  <h3>{t('stories.locked')}</h3>
                  <span className="text-sm text-gray-500 text-center px-4">
                    {t('stories.lockedMessage')}
                  </span>
                  <button className="mt-2 bg-[#fdb315] text-white px-4 py-1 rounded-full text-sm hover:bg-yellow-600">
                    {t('stories.buyNow')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesForm;