"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaCrown, FaPen, FaVideo } from 'react-icons/fa';
import { MdVerified, MdFiberManualRecord } from 'react-icons/md';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Variantes de animação
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.2 } },
};

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  // Log para depuração
  console.log('Traduções carregadas:', {
    title: t('how_it_works.title'),
    introduction: t('how_it_works.introduction'),
    section1_title: t('how_it_works.section1_title'),
  });

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-[#1a0a10] rounded-2xl p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <motion.div className="flex justify-between items-center mb-6" variants={fadeInUp}>
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-400">
            {t('how_it_works.title', { defaultValue: 'Como Funciona o XGirl.pt' })}
          </h2>
          <Button
            onClick={onClose}
            className="rounded-full bg-gray-200 dark:bg-[#2b1a21] text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#3b2a31] w-10 h-10 flex items-center justify-center"
            aria-label={t('how_it_works.close', { defaultValue: 'Fechar' })}
          >
            <X size={20} />
          </Button>
        </motion.div>

        <div className="text-gray-700 dark:text-gray-200 space-y-8">
          {/* Introdução */}
          <motion.p variants={fadeInUp}>
            {t('how_it_works.introduction', {
              defaultValue:
                'Bem-vindo ao XGirl.pt, a plataforma mais vibrante e justa de classificados eróticos em Portugal!',
            })}
          </motion.p>

          {/* 1. Registro e Criação de Perfil */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('how_it_works.section1_title', { defaultValue: '1. Registro e Criação de Perfil' })}
            </h3>
            <p>
              {t('how_it_works.section1_description', {
                defaultValue:
                  'Sua jornada começa aqui! Crie uma conta com email e senha e personalize seu perfil com estilo.',
              })}
            </p>
          </motion.div>

          {/* 2. A Página Principal */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('how_it_works.section2_title', { defaultValue: '2. Página Principal: O Coração do XGirl' })}
            </h3>
            <p>
              {t('how_it_works.section2_description', {
                defaultValue: 'A Página Principal do XGirl.pt é onde tudo ganha vida.',
              })}
            </p>
            <div className="space-y-6 mt-4">
              {/* Seção de Boas-Vindas */}
              <div>
                <h4 className="text-lg font-semibold text-pink-600 dark:text-pink-400">
                  {t('how_it_works.section2_welcome_title', { defaultValue: 'Seção de Boas-Vindas' })}
                </h4>
                <p>
                  {t('how_it_works.section2_welcome_description', {
                    defaultValue: 'A Seção de Boas-Vindas é o primeiro impacto no XGirl.',
                  })}
                </p>
                <p className="mt-2 italic text-gray-500 dark:text-gray-400">
                  {t('how_it_works.section2_welcome_image', {
                    defaultValue: 'Imagem conceitual: Círculos animados com bordas brilhantes.',
                  })}
                </p>
              </div>

              {/* Recent Stories */}
              <div>
                <h4 className="text-lg font-semibold text-pink-600 dark:text-pink-400">
                  {t('how_it_works.section2_stories_title', { defaultValue: 'Recent Stories' })}
                </h4>
                <p>
                  {t('how_it_works.section2_stories_description', {
                    defaultValue: 'Aqui, destacamos os Stories mais recentes de anunciantes Premium.',
                  })}
                </p>
                <p className="mt-2 italic text-gray-500 dark:text-gray-400">
                  {t('how_it_works.section2_stories_image', {
                    defaultValue: 'Imagem conceitual: Linha de miniaturas de vídeo.',
                  })}
                </p>
              </div>

              {/* Featured Ads */}
              <div>
                <h4 className="text-lg font-semibold text-pink-600 dark:text-pink-400">
                  {t('how_it_works.section2_featured_title', {
                    defaultValue: 'Featured Ads (Anúncios em Destaque)',
                  })}
                </h4>
                <p>
                  {t('how_it_works.section2_featured_description', {
                    defaultValue:
                      'Os Featured Ads são o ápice da visibilidade. Apenas perfis com o badge Premium aparecem aqui, garantindo exposição máxima. Ganhe 5 dias extras de destaque com o badge Autora em Blog ao criar conteúdo.',
                  })}
                  <span className="bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full inline-flex items-center shadow-md mx-1">
                    <FaCrown className="mr-1" />
                    {t('how_it_works.premium_badge', { defaultValue: 'Premium' })}
                  </span>
                  <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold py-0.5 px-1.5 rounded-full inline-flex items-center mx-1">
                    <FaPen className="mr-1" size={10} />
                    {t('how_it_works.blog_author_badge', { defaultValue: 'Autora em Blog' })}
                  </span>
                </p>
                <p className="mt-2 italic text-gray-500 dark:text-gray-400">
                  {t('how_it_works.section2_featured_image', {
                    defaultValue: 'Imagem conceitual: Banner com perfis Premium.',
                  })}
                </p>
              </div>

              {/* Map Section */}
              <div>
                <h4 className="text-lg font-semibold text-pink-600 dark:text-pink-400">
                  {t('how_it_works.section2_map_title', { defaultValue: 'Map Section (Mapa)' })}
                </h4>
                <p>
                  {t('how_it_works.section2_map_description', {
                    defaultValue: 'O Mapa exibe localizações de acompanhantes em Portugal.',
                  })}
                </p>
                <p className="mt-2 italic text-gray-500 dark:text-gray-400">
                  {t('how_it_works.section2_map_image', {
                    defaultValue: 'Imagem conceitual: Mapa estilizado com pins rosa.',
                  })}
                </p>
              </div>

              {/* Newest Adds */}
              <div>
                <h4 className="text-lg font-semibold text-pink-600 dark:text-pink-400">
                  {t('how_it_works.section2_newest_title', { defaultValue: 'Newest Adds (Novos Anúncios)' })}
                </h4>
                <p>
                  {t('how_it_works.section2_newest_description', {
                    defaultValue: 'Exibimos os perfis mais recentes do XGirl.',
                  })}
                </p>
                <p className="mt-2 italic text-gray-500 dark:text-gray-400">
                  {t('how_it_works.section2_newest_image', {
                    defaultValue: 'Imagem conceitual: Grade de cards com nomes e fotos.',
                  })}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 3. Destaques */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('how_it_works.section3_title', { defaultValue: '3. Destaques: Sua Dedicação em Foco' })}
            </h3>
            <p>
              {t('how_it_works.section3_description', {
                defaultValue:
                  'No XGirl.pt, seu destaque reflete seu esforço. Atualize tags regularmente ou conquiste o badge Autora em Blog para subir na visibilidade.',
              })}
              <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold py-0.5 px-1.5 rounded-full inline-flex items-center mx-1">
                <FaPen className="mr-1" size={10} />
                {t('how_it_works.blog_author_badge', { defaultValue: 'Autora em Blog' })}
              </span>
            </p>
          </motion.div>

          {/* 4. Badges */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('how_it_works.section4_title', { defaultValue: '4. Badges: Mostre Seu Brilho' })}
            </h3>
            <p>
              {t('how_it_works.section4_description', {
                defaultValue: 'Nossos badges celebram o que torna cada anunciante única.',
              })}
            </p>
            <ul className="space-y-4 mt-4">
              <li className="flex items-center gap-2">
                <MdVerified className="text-green-500 w-8 h-8" />
                <span>
                  <strong>{t('how_it_works.verified_badge', { defaultValue: 'Verificado' })}</strong>:{' '}
                  {t('how_it_works.verified_description', {
                    defaultValue: 'Foto verificada pela equipe XGirl.pt.',
                  })}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full inline-flex items-center shadow-md">
                  <FaCrown className="mr-1" />
                  {t('how_it_works.premium_badge', { defaultValue: 'Premium' })}
                </span>
                <span>
                  <strong>{t('how_it_works.premium_badge', { defaultValue: 'Premium' })}</strong>:{' '}
                  {t('how_it_works.premium_description', {
                    defaultValue: 'Membro Premium, com mais fotos e destaque.',
                  })}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full inline-flex items-center">
                  <FaVideo className="mr-1" />
                  {t('how_it_works.stories_badge', { defaultValue: 'Stories' })}
                </span>
                <span>
                  <strong>{t('how_it_works.stories_badge', { defaultValue: 'Stories' })}</strong>:{' '}
                  {t('how_it_works.stories_description', {
                    defaultValue: 'Contém Stories no perfil.',
                  })}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold py-0.5 px-1.5 rounded-full inline-flex items-center">
                  <FaPen className="mr-1" size={10} />
                  {t('how_it_works.blog_author_badge', { defaultValue: 'Autora em Blog' })}
                </span>
                <span>
                  <strong>{t('how_it_works.blog_author_badge', { defaultValue: 'Autora em Blog' })}</strong>:{' '}
                  {t('how_it_works.blog_author_description', {
                    defaultValue: 'Escreveu um artigo no blog.',
                  })}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-red-700 text-white text-xs font-semibold py-1 px-2 rounded-full inline-flex items-center animate-pulse">
                  <MdFiberManualRecord className="mr-1" />
                  {t('how_it_works.live_cam_badge', { defaultValue: 'Live Cam' })}
                </span>
                <span>
                  <strong>{t('how_it_works.live_cam_badge', { defaultValue: 'Live Cam' })}</strong>:{' '}
                  {t('how_it_works.live_cam_description', {
                    defaultValue: 'Oferece vídeos ao vivo.',
                  })}
                </span>
              </li>
            </ul>
          </motion.div>

          {/* 5. Gerenciamento */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('how_it_works.section5_title', { defaultValue: '5. Gerencie com Simplicidade' })}
            </h3>
            <p>
              {t('how_it_works.section5_description', {
                defaultValue: 'Após o registro, gerencie tudo com facilidade no XGirl.',
              })}
            </p>
          </motion.div>

          {/* 6. Suporte e Comunidade */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('how_it_works.section6_title', { defaultValue: '6. Suporte e Comunidade Vibrante' })}
            </h3>
            <p>
              {t('how_it_works.section6_description', {
                defaultValue: 'Estamos com você! Nossa equipe oferece suporte dedicado.',
              })}
            </p>
          </motion.div>

          {/* Conclusão */}
          <motion.p
            className="font-semibold text-lg text-center text-pink-600 dark:text-pink-400"
            variants={fadeInUp}
          >
            {t('how_it_works.call_to_action', {
              defaultValue: 'Junte-se ao XGirl.pt agora!',
            })}
          </motion.p>
        </div>

        <motion.div variants={fadeInUp}>
          <Button
            onClick={onClose}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white hover:from-pink-700 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {t('how_it_works.close', { defaultValue: 'Fechar' })}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HowItWorksModal;