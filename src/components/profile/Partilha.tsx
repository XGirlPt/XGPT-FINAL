
'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MdEmail, MdContentCopy } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface PartilhaProps {
  selectedProfile: {
    nome: string;
    Tarifa: number;
    email: string;
    photos?: string[];
  };
  setShowPartilha: (show: boolean) => void;
}

const Partilha: React.FC<PartilhaProps> = ({ selectedProfile, setShowPartilha }) => {
  const { t } = useTranslation();
  const [copySuccess, setCopySuccess] = useState(false);

  // Função para fechar o diálogo
  const handleClose = useCallback(() => setShowPartilha(false), [setShowPartilha]);

  // Função para copiar o link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  // Animações com Framer Motion
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-md w-full bg-white dark:bg-[#1a0a10] rounded-2xl shadow-2xl p-6 border-none">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
          {/* Cabeçalho: Foto e Nome */}
          <DialogHeader className="flex flex-col items-center mb-6">
            <motion.div variants={fadeInUp} className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-pink-500 dark:ring-pink-400 shadow-lg">
              <Image
                alt={selectedProfile?.nome || 'Imagem do perfil'}
                src={selectedProfile?.photos?.[0] || '/logo.webp'}
                fill
                className="object-cover"
                sizes="(max-width: 80px) 100vw, 80px"
              />
            </motion.div>
            <DialogTitle className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              {selectedProfile?.nome || 'Nome indisponível'}
            </DialogTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('partilha.share_now', { defaultValue: 'Partilhe este perfil agora' })}
            </p>
          </DialogHeader>

          {/* Botões de Partilha */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4 mb-6">
            <motion.div variants={fadeInUp}>
              <Button
                asChild
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-4 flex items-center gap-3 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <a
                  href={`mailto:${selectedProfile?.email}?subject=${encodeURIComponent(
                    t('partilha.email_subject', { defaultValue: 'Conheça este perfil incrível!' })
                  )}&body=${encodeURIComponent(
                    t('partilha.email_body', { url: window.location.href, defaultValue: 'Dê uma olhada neste perfil: {url}' })
                  )}`}
                >
                  <MdEmail size={20} />
                  <span>{t('partilha.share_by_email', { defaultValue: 'Partilhar por Email' })}</span>
                </a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Button
                onClick={copyToClipboard}
                className="w-full rounded-lg bg-gradient-to-r from-pink-600 to-rose-500 text-white font-medium py-3 px-4 flex items-center gap-3 hover:from-pink-700 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <MdContentCopy size={20} />
                <span>{t('partilha.copy_link', { defaultValue: 'Copiar Link' })}</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Detalhes: URL do Perfil */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
            <motion.div variants={fadeInUp} className="bg-gray-100 dark:bg-[#2b1a21] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <MdContentCopy size={28} className="text-rose-500 dark:text-rose-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {t('partilha.profile_link', { defaultValue: 'Link do Perfil' })}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white break-all">
                    {window.location.href}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mensagem de Sucesso */}
            {copySuccess && (
              <motion.div variants={fadeInUp} className="text-center">
                <p className="text-sm text-green-500">
                  {t('partilha.link_copied', { defaultValue: 'Link copiado com sucesso!' })}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default Partilha;
