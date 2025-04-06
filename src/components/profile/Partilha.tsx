import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MdEmail, MdContentCopy } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface PartilhaProps {
  selectedProfile: {
    nome: string;
    Tarifa: number;
    email: string;
  };
  setShowPartilha: (show: boolean) => void;
}

const Partilha: React.FC<PartilhaProps> = ({ selectedProfile, setShowPartilha }) => {
  const { t } = useTranslation();
  const [copySuccess, setCopySuccess] = useState(false);

  // Função para fechar o modal
  const handleClose = useCallback(() => {
    setShowPartilha(false);
  }, [setShowPartilha]);

  // Função para copiar o link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    toast.success(t('partilha.link_copied'), {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => setCopySuccess(false), 3000);
  };

  // Variantes de animação
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <>
      <ToastContainer />
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-sm w-full bg-white dark:bg-[#1a0a10] rounded-2xl shadow-xl p-6 border-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Botão de fechar */}
          

            {/* Cabeçalho */}
            <motion.div variants={fadeInUp} className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400">
                {selectedProfile?.nome}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {t('partilha.share_now')}
              </p>
            </motion.div>

            {/* URL Display */}
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#2b1a21] rounded-full py-2 px-4 shadow-sm">
                <span className="text-xs text-gray-700 dark:text-gray-200 break-all">
                  {window.location.href}
                </span>
              </div>
            </motion.div>

            {/* Opções de Compartilhamento */}
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="space-y-3"
            >
              {/* Email */}
              <motion.div variants={fadeInUp}>
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-4 flex items-center justify-between gap-2 hover:from-blue-700 hover:to-blue-800 hover:shadow-md transition-all duration-300 shadow-sm relative overflow-hidden"
                >
                  <a
                    href={`mailto:${selectedProfile?.email}?subject=${encodeURIComponent(
                      t('partilha.email_subject')
                    )}&body=${encodeURIComponent(
                      t('partilha.email_body', { url: window.location.href })
                    )}`}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-sweep w-1/3" />
                    <div className="flex items-center gap-2">
                      <MdEmail size={18} />
                      <span className="text-xs">{t('partilha.share_by_email')}</span>
                    </div>
                  </a>
                </Button>
              </motion.div>

              {/* Copiar Link */}
              <motion.div variants={fadeInUp}>
                <Button
                  onClick={copyToClipboard}
                  className="w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white font-semibold py-2 px-4 flex items-center justify-between gap-2 hover:from-pink-700 hover:to-rose-600 hover:shadow-md transition-all duration-300 shadow-sm relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-sweep w-1/3" />
                  <div className="flex items-center gap-2">
                    <MdContentCopy size={18} />
                    <span className="text-xs">{t('partilha.copy_link')}</span>
                  </div>
                </Button>
              </motion.div>

              {/* Mensagem de Sucesso */}
              {copySuccess && (
                <motion.div
                  variants={fadeInUp}
                  className="text-center mt-2"
                >
                  <span className="text-xs text-green-500">
                    {t('partilha.link_copied')}
                  </span>
                </motion.div>
              )}
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
    </>
  );
};

export default Partilha;