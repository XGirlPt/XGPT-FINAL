"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';
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

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[#f2ebee] dark:bg-[#100007] relative overflow-hidden p-4 md:p-8"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      {/* Fundo com gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-rose-500/10" />

      <motion.section
        className={cn(
          'relative w-full max-w-md bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl p-6 md:p-8 z-10',
          theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
        )}
        variants={fadeInUp}
      >
        {/* Título 404 */}
        <motion.h1
          className="text-6xl md:text-7xl font-bold text-center text-pink-600 mb-6"
          variants={fadeInUp}
        >
          404
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-2xl font-semibold text-center mb-4"
          variants={fadeInUp}
        >
          {t('notFound.title') || 'Página não encontrada'}
        </motion.p>

        {/* Descrição */}
        <motion.p
          className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8"
          variants={fadeInUp}
        >
          {t('notFound.description') || 'Desculpe, a página que você está procurando não existe.'}
        </motion.p>

        {/* Botão Voltar */}
        <motion.div variants={fadeInUp}>
          <Link href="/" passHref>
            <Button
              className={cn(
                'w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-3 shadow-md transition-all duration-300 relative overflow-hidden'
              )}
            >
              <span className="relative z-10">
                {t('notFound.backButton') || 'Voltar para a página inicial'}
              </span>
            </Button>
          </Link>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default NotFound;