'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/backend/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import Link from 'next/link'; // Import Link

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  tap: {
    scale: 0.95,
  },
};

const glowVariants = {
  initial: {
    opacity: 0.5,
    scale: 1,
  },
  animate: {
    opacity: [0.5, 0.7, 0.5],
    scale: [1, 1.2, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export function PublishAdBanner() {
  const { theme } = useTheme();
  const { t } = useTranslation(); // Hook para acessar traduções

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="relative"
    >
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-xl"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />

      <motion.div
        className={cn(
          'w-full rounded-3xl p-12 text-center bg-pink-600 dark:bg-[#1f1017] relative z-10 overflow-hidden'
        )}
      >
        <motion.h2
          variants={childVariants}
          className="text-5xl text-white mb-4"
        >
          {t('publishAdBanner.title')}
        </motion.h2>

        <motion.p
          variants={childVariants}
          className="text-white/90 text-lg mb-8 font-body"
        >
          {t('publishAdBanner.description')}
        </motion.p>

        <motion.div variants={buttonVariants}>
        <Link href="/registo">
          <Button
            className={cn(
              'rounded-full px-8 py-6 text-lg font-medium',
              'bg-white text-gray-600 hover:bg-gray-100 dark:bg-pink-600 dark:text-white'
            )}
          >
            {t('publishAdBanner.button')}
          </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}