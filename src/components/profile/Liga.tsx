import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiPhone } from 'react-icons/fi';
import { FaWhatsapp, FaMoneyBillWave } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface LigaProps {
  selectedProfile: {
    nome: string;
    tarifa: number;
    lingua: string[];
    telefone: string;
  };
  setShowLiga: (show: boolean) => void;
}

const Liga: React.FC<LigaProps> = ({ selectedProfile, setShowLiga }) => {
  const { t } = useTranslation();

  // Função para fechar o modal
  const handleClose = useCallback(() => {
    setShowLiga(false);
  }, [setShowLiga]);

  // Dados do Redux
  const telefoneRedux = useSelector((state: any) => state.profile?.profile?.telefone || selectedProfile?.telefone);
  const linguaRedux = useSelector((state: any) => state.profile?.profile?.lingua || selectedProfile?.lingua);

  // Função para obter a bandeira com base na língua
  const obterBandeira = (lingua: string): string => {
    switch (lingua) {
      case 'Russo': return '/Flags/ru.svg';
      case 'Alemão': return '/Flags/ale.svg';
      case 'Português': return '/Flags/pt.svg';
      case 'Francês': return '/Flags/fr.svg';
      case 'Inglês': return '/Flags/ing.svg';
      case 'Italiano': return '/Flags/it.svg';
      case 'Espanhol': return '/Flags/es.svg';
      case 'Árabe': return '/Flags/ar.png';
      default: return '/logo.webp';
    }
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
              {t('liga.contact_now')}
            </p>
          </motion.div>

          {/* Opções de Contato */}
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="space-y-3 mb-6"
          >
            {/* Telefone */}
            <motion.div variants={fadeInUp}>
              <Button
                className="w-full rounded-full bg-gradient-to-r from-pink-50 to-rose-50 dark:from-[#2b1a21] dark:to-[#3b2a31] text-pink-600 dark:text-pink-400 font-semibold py-2 px-4 flex items-center justify-between gap-2 hover:shadow-md transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <FiPhone size={18} />
                  <span className="text-xs">{telefoneRedux || 'N/A'}</span>
                </div>
              </Button>
            </motion.div>

            {/* WhatsApp */}
            <motion.div variants={fadeInUp}>
              <Button
                onClick={() => window.open(`https://api.whatsapp.com/send?phone=${telefoneRedux}`, '_blank')}
                className="w-full rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-2 px-4 flex items-center justify-between gap-2 hover:from-green-700 hover:to-green-800 hover:shadow-md transition-all duration-300 shadow-sm relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-sweep w-1/3" />
                <div className="flex items-center gap-2">
                  <FaWhatsapp size={18} />
                  <span className="text-xs">{t('liga.whatsapp')}</span>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Tarifas */}
          <motion.div variants={fadeInUp} className="mb-6">
            <div className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#2b1a21] rounded-full py-2 px-4 shadow-sm">
              <FaMoneyBillWave size={18} className="text-rose-500 dark:text-rose-400" />
              <span className="text-xs text-gray-700 dark:text-gray-200 font-medium">
                {t('liga.tariff_info', { tarifa: selectedProfile?.tarifa || 'Consultar' })}
              </span>
            </div>
          </motion.div>

          {/* Línguas */}
          {linguaRedux?.length > 0 && (
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3">
                {t('liga.speaks')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {linguaRedux.map((lingua: string, index: number) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-2 bg-gray-100 dark:bg-[#2b1a21] rounded-full px-3 py-1 shadow-sm"
                  >
                    <Image
                      src={obterBandeira(lingua)}
                      alt={`${lingua} flag`}
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                    <span className="text-xs text-gray-700 dark:text-gray-200">{lingua}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
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

export default Liga;