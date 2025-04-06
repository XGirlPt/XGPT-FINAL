/* eslint-disable react/no-unescaped-entities */
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CertificadoProps {
  selectedProfile?: {
    nome: string;
    isCertified?: boolean;
    userUID?: string;
  };
  onClose: () => void;
}

const Certificado: React.FC<CertificadoProps> = ({ selectedProfile, onClose }) => {
  const { t } = useTranslation();

  // Função para fechar o modal
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Variantes de animação
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg w-full bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl p-6 border-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative"
        >
          {/* Cabeçalho */}
          <motion.div variants={fadeInUp} className="text-center mb-6">
            <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 drop-shadow-md">
              {t('certificado.certified_profile')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {t('certificado.certified_subtitle', { name: selectedProfile?.nome })}
            </p>
          </motion.div>

          {/* Badge de Certificação */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center mb-6"
          >
            <div className="relative px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold shadow-lg overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-sweep w-1/3" />
              <div className="relative z-10 flex items-center gap-2">
                <span className="text-base">{t('certificado.certified')}</span>
                <VscVerifiedFilled size={24} />
              </div>
            </div>
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="text-gray-700 dark:text-gray-200 space-y-4"
          >
            <motion.p variants={fadeInUp}>
              {t('certificado.authenticity_text', { 
                platform: '<strong class="text-pink-600 dark:text-pink-400">XGirl.pt</strong>',
                name: `<span class="font-medium text-pink-600 dark:text-pink-400">${selectedProfile?.nome}</span>`
              })}
            </motion.p>
            <motion.p variants={fadeInUp}>
              {t('certificado.trust_text', { escorts: '<strong>acompanhantes em Portugal</strong>' })}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex items-center gap-2">
              <p>
                <strong className="text-gray-900 dark:text-white">
                  {t('certificado.certified_benefit')}
                </strong>{' '}
                {t('certificado.visibility_text', { 
                  badge: '<VscVerifiedFilled class="inline text-green-500" size={20} />',
                  platform: '<strong>XGirl.pt</strong>'
                })}
              </p>
            </motion.div>
          </motion.div>

          {/* Botão de Fechar */}
          <motion.div variants={fadeInUp} className="mt-8">
            <Button
              onClick={handleClose}
              className="w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-3 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {t('certificado.understood')}
            </Button>
          </motion.div>
        </motion.div>

        {/* Estilo para o efeito de movimento */}
        <style jsx global>{`
          @keyframes sweep {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(300%);
            }
          }
          .animate-sweep {
            animation: sweep 1.5s infinite linear;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default Certificado;