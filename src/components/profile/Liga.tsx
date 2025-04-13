import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiPhone } from 'react-icons/fi';
import { FaWhatsapp, FaMoneyBillWave } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface LigaProps {
  selectedProfile: {
    nome: string;
    tarifa: number;
    lingua: string[];
    telefone: string;
    photos?: string[];
  };
  setShowLiga: (show: boolean) => void;
}

const Liga: React.FC<LigaProps> = ({ selectedProfile, setShowLiga }) => {
  const { t } = useTranslation();

  // Função para fechar o diálogo
  const handleClose = useCallback(() => setShowLiga(false), [setShowLiga]);

  // Dados do Redux com fallback para selectedProfile
  const telefone = useSelector((state: any) => state.profile?.profile?.telefone || selectedProfile?.telefone);
  const lingua = useSelector((state: any) => state.profile?.profile?.lingua || selectedProfile?.lingua);
  const tarifa = useSelector((state: any) => state.profile?.profile?.tarifa || selectedProfile?.tarifa);

  // Função para obter bandeiras com base na língua
  const obterBandeira = (lingua: string): string => {
    const bandeiras: { [key: string]: string } = {
      rs: '/Flags/ru.svg',
      de: '/Flags/de.svg',
      pt: '/Flags/pt.svg',
      fr: '/Flags/fr.svg',
      en: '/Flags/ing.svg',
      it: '/Flags/it.svg',
      es: '/Flags/es.svg',
      ar: '/Flags/ar.png',
    };
    return bandeiras[lingua] || '/logo.webp';
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
          {/* Botão de Fechar */}
          {/* <Button
            onClick={handleClose}
            className="absolute top-2 right-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 w-8 h-8 flex items-center justify-center transition-colors duration-200"
            aria-label="Fechar diálogo"
          >
            <X size={16} />
          </Button> */}

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
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('liga.subtitle', { defaultValue: 'Entre em contato agora' })}</p>
          </DialogHeader>

          {/* Botões de Contato */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4 mb-6">
            <motion.div variants={fadeInUp}>
              <Button
                onClick={() => window.open(`tel:${telefone}`, '_self')}
                aria-label={t('liga.call_aria', { defaultValue: 'Ligar para o número de telefone' })}
                className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium py-3 px-4 flex items-center gap-3 hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FiPhone size={20} />
                <span>{t('liga.call_button', { defaultValue: 'Ligar Agora' })}</span>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Button
                onClick={() => window.open(`https://api.whatsapp.com/send?phone=${telefone}`, '_blank')}
                aria-label={t('liga.whatsapp_aria', { defaultValue: 'Enviar mensagem no WhatsApp' })}
                className="w-full rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-3 px-4 flex items-center gap-3 hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaWhatsapp size={20} />
                <span>{t('liga.whatsapp_button', { defaultValue: 'Mensagem no WhatsApp' })}</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Detalhes: Tarifa e Línguas */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
            {/* Tarifa Melhorada */}
            <motion.div variants={fadeInUp} className="bg-gray-100 dark:bg-[#2b1a21] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FaMoneyBillWave size={28} className="text-rose-500 dark:text-rose-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {t('liga.tariff_label', { defaultValue: 'Tarifa por Serviço' })}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tarifa ? `${tarifa} €` : t('liga.tariff_unavailable', { defaultValue: 'Não informada' })}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Línguas Faladas */}
            {lingua?.length > 0 && (
              <motion.div variants={fadeInUp}>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                  {t('liga.languages_label', { defaultValue: 'Idiomas Falados' })}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {lingua.map((lang: string, index: number) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-center gap-2 bg-white dark:bg-[#2b1a21] rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      <Image
                        src={obterBandeira(lang)}
                        alt={`Bandeira de ${lang}`}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{lang.toUpperCase()}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default Liga;