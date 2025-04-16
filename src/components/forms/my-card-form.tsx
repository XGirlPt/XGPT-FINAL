
'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileData, updateProfileField } from '@/backend/actions/ProfileActions';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCrown, FaVideo, FaMapMarkerAlt, FaCommentDots, FaClock } from 'react-icons/fa';
import { MdFiberManualRecord, MdVerified } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

interface ProfileState {
  userUID: string;
  nome: string;
  photos: string[];
  premium: boolean;
  live: boolean;
  stories: string[];
  certificado: boolean;
  cidade: string;
  tag: string;
  tagtimestamp: string;
  loading: boolean;
  error: string | null;
}

interface RootState {
  profile: ProfileState;
}

const cardVariants = {
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap: { scale: 0.98 },
};

const timeAgo = (timestamp: string) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
};

export const MyCardForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Dados do Redux
  const profile = useSelector((state: RootState) => state.profile);
  const userUID = profile.userUID;
  const nome = profile.nome || 'User';
  const photos = profile.photos || [];
  const premium = profile.premium || false;
  const live = profile.live || false;
  const stories = profile.stories || [];
  const certificado = profile.certificado || false;
  const cidade = profile.cidade || 'Unknown';
  const initialTag = profile.tag || "I'm available!";
  const initialTagTimestamp = profile.tagtimestamp || new Date().toISOString();
  const loading = profile.loading;
  const error = profile.error;

  // Estado local para a tag, timestamp e currentTag
  const [newTag, setNewTag] = useState<string>(initialTag);
  const [newTagTimestamp, setNewTagTimestamp] = useState<string>(initialTagTimestamp);
  const [currentTag, setCurrentTag] = useState<string>(initialTag);

  // Carregar dados do perfil ao montar o componente
  useEffect(() => {
    if (userUID) {
      console.log('Carregando dados iniciais para userUID:', userUID);
      dispatch(fetchProfileData());
    } else {
      console.error('userUID está indefinido - verifique a autenticação');
    }
  }, [dispatch, userUID]);

  // Função para salvar as alterações
  const handleSave = async () => {
    if (newTag.length > 48) {
      toast.error(t('messages.tagTooLong'));
      return;
    }
    try {
      const currentTimestamp = new Date().toISOString();
      console.log('Salvando tag:', newTag);

      // Atualiza o estado local imediatamente
      setNewTagTimestamp(currentTimestamp);
      setCurrentTag(newTag);

      // Dispara as ações assíncronas para o Redux
      await Promise.all([
        dispatch(updateProfileField({ field: 'tag', value: newTag })).unwrap(),
        dispatch(updateProfileField({ field: 'tagtimestamp', value: currentTimestamp })).unwrap(),
      ]);

      toast.success(t('messages.tagUpdated'));
    } catch (error: any) {
      console.error('Erro ao salvar tag:', error);
      toast.error(t('messages.saveError'));
    }
  };

  // Função para descartar alterações
  const handleDiscard = () => {
    console.log('Descartando alterações. Restaurando para:', initialTag);
    setNewTag(initialTag);
    setNewTagTimestamp(initialTagTimestamp);
    setCurrentTag(initialTag);
    toast.info(t('messages.changesDiscarded'));
  };

  // Handler para limitar o input a 48 caracteres
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 70) {
      setNewTag(value);
    } else {
      toast.warn(t('messages.tagLimitReached'));
    }
  };

  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error')}: {error}</div>;

  return (
    <div className="w-full rounded-3xl bg-white dark:bg-transparent dark:border dark:border-gray-800 dark:border-opacity-50 p-4 md:p-8">
      {/* Header com título e botões */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('myCard.title')}</h1>
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

      {/* Main Content Container */}
      <div className="md:flex md:gap-8 mt-4">
        <div className="w-full">
          <div className="sm:flex sm:flex-row flex-col gap-8">
            {/* Left side (profile card) */}
            <Card className="rounded-3xl border-gray-200 bg-[#f2ebee] dark:bg-transparent dark:border dark:border-gray-800 dark:border-opacity-50 overflow-hidden w-full sm:w-auto">
              <Link href={`/escort/${nome}`} passHref>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative bg-pink-100 dark:bg-[#300d1b] rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-2xl flex flex-col w-full sm:w-[220px] h-[340px]"
                >
                  <motion.div className="relative w-full h-[65%] rounded-xl overflow-hidden">
                    <Image
                      src={photos[0] || '/models/accounts/1.png'}
                      alt={nome}
                      fill
                      className="object-cover w-full h-full"
                    />
                    {premium && (
                      <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 flex items-center shadow-md">
                        <FaCrown className="text-white mr-1" />
                        <span className="text-xs">Premium</span>
                      </div>
                    )}
                    {live && (
                      <div className="absolute top-2 left-2 bg-red-700 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 animate-pulse flex items-center">
                        <MdFiberManualRecord className="text-white mr-1" />
                        <span className="text-xs">Live Cam</span>
                      </div>
                    )}
                    {Array.isArray(stories) && stories.length > 0 && (
                      <div className="absolute top-10 right-2 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-50 flex items-center">
                        <FaVideo className="text-white mr-1" />
                        <span className="text-xs">Stories</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <h3 className="text-base md:text-lg font-semibold text-white leading-tight flex items-center gap-1">
                        {nome} {certificado && <MdVerified className="text-green-500" />}
                      </h3>
                      <div className="flex items-center gap-1 text-white text-sm">
                        <FaMapMarkerAlt className="text-pink-600" />
                        {cidade}
                      </div>
                    </div>
                  </motion.div>
                  <div className="bg-pink-100 dark:bg-[#300d1b] text-gray-800 dark:text-gray-300 px-3 py-3 rounded-xl shadow-md mt-2 flex flex-col justify-between min-h-[70px] relative">
                    <div className="flex items-start justify-between gap-2">
                      <span className="block break-words italic text-xs md:text-sm font-arial line-clamp-2">
                      &quot;{newTag}&quot;
                      </span>
                      <FaCommentDots className="text-yellow-600 text-md min-w-[18px] min-h-[18px] flex-shrink-0" />
                    </div>
                    <div className="text-xs font-arial text-black dark:text-gray-200 flex items-center gap-1 mt-2">
                      <FaClock className="text-yellow-500 h-4 w-4 font-normal" />
                      {timeAgo(newTagTimestamp)}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </Card>

            {/* Right side (tag display and update) */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-6 sm:mt-0 mt-6 text-gray-900 dark:text-gray-100">{t('myCard.stateInfo')}</h3>

              {/* Current Tag */}
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{t('myCard.currentTag')}</p>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-3 mb-6 text-sm opacity-60 cursor-not-allowed select-none w-[70%]">
                  <p className="text-gray-600 dark:text-gray-400">&quot;{currentTag}&quot;</p>
                </div>
              </div>

              {/* Input para nova tag */}
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{t('myCard.updateTag')}</p>
                <div className="flex gap-2 rounded-full bg-gray-50 dark:bg-gray-900/20 p-1 border border-gray-200 dark:border-gray-700 w-[70%]">
                  <Input
                    value={newTag}
                    onChange={handleTagChange}
                    maxLength={48}
                    className="flex-1 bg-transparent border-none rounded-full text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-gray-500"
                    placeholder={t('myCard.enterTag')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCardForm;
