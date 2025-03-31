'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fetchProfiles } from '@/backend/services/profileService';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';
import { FaFilter, FaTimes } from 'react-icons/fa';
import FiltroAge from '@/components/filtros/filtro-age';
import FiltroTarifa from '@/components/filtros/filtro-tarifa';
import FiltroLingua from '@/components/filtros/filtro-lingua';
import FiltroAltura from '@/components/filtros/filtro-altura';
import FiltroDistrito from '@/components/filtros/filtro-distrito';
import FiltroOrigem from '@/components/filtros/filtro-origem';
import FiltroOlhos from '@/components/filtros/filtro-olhos';
import FiltroPeito from '@/components/filtros/filtro-peito';
import FiltroMamas from '@/components/filtros/filtro-mamas';
import FiltroPelos from '@/components/filtros/filtro-pelos';
import FiltroTatuagem from '@/components/filtros/filtro-tatuagem';

interface FiltrosState {
  idade?: number[];
  tarifa?: number[];
  lingua?: string[];
  altura?: string;
  distrito?: string;
  origem?: string;
  olhos?: string;
  seios?: string;
  mamas?: string;
  pelos?: boolean;
  tatuagem?: boolean;
  certificado?: boolean;
}

interface FiltroProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onApplyFilters?: (filters: FiltrosState) => void;
}

// Variantes de animação para o modal
const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.2 } },
};

const Filtro: React.FC<FiltroProps> = ({ open, onOpenChange, onApplyFilters }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [filtros, setFiltros] = useState<FiltrosState>({});
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [totalProfiles, setTotalProfiles] = useState<number>(0);

  // Carregar perfis ao abrir o modal
  useEffect(() => {
    const loadProfiles = async () => {
      const profiles = await fetchProfiles();
      setTotalProfiles(profiles.length);
      setFilteredProfiles(profiles);
    };
    if (open) loadProfiles();
  }, [open]);

  // Aplicar filtros dinamicamente
  useEffect(() => {
    const applyFilters = (profiles: any[], filters: FiltrosState) => {
      return profiles.filter((profile) => {
        if (filters.idade && (profile.idade < filters.idade[0] || profile.idade > filters.idade[1])) return false;
        if (filters.tarifa && (profile.tarifa < filters.tarifa[0] || profile.tarifa > filters.tarifa[1])) return false;
        if (filters.lingua && !filters.lingua.some((lang) => profile.lingua?.includes(lang))) return false;
        if (filters.altura && profile.altura !== filters.altura) return false;
        if (filters.distrito && filters.distrito !== profile.distrito) return false;
        if (filters.origem && filters.origem !== profile.origem) return false;
        if (filters.olhos && filters.olhos !== profile.olhos) return false;
        if (filters.seios && filters.seios !== profile.seios) return false;
        if (filters.mamas && filters.mamas !== profile.mamas) return false;
        if (filters.pelos !== undefined && filters.pelos !== (profile.pelos === 'Sim')) return false;
        if (filters.tatuagem !== undefined && filters.tatuagem !== (profile.tatuagem === 'Sim')) return false;
        if (filters.certificado !== undefined && filters.certificado !== profile.certificado) return false;
        return true;
      });
    };

    const loadFilteredProfiles = async () => {
      const profiles = await fetchProfiles();
      const filtered = applyFilters(profiles, filtros);
      setFilteredProfiles(filtered);
    };
    if (open) loadFilteredProfiles();
  }, [filtros, open]);

  const handleApplyFilters = () => {
    onApplyFilters?.(filtros);
    onOpenChange(false);
    router.push('/escort');
  };

  const handleResetFilters = () => {
    setFiltros({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'w-full max-w-[90%] md:max-w-[75%] max-h-[90vh] bg-[#faf3f6] dark:bg-[#13040b] rounded-3xl shadow-xl p-6 md:p-8 overflow-y-auto border-none',
          theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
        )}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <DialogHeader className="relative">
            <DialogTitle className="text-3xl md:text-4xl font-semibold font-body text-gray-900 dark:text-white">
              Filtros
            </DialogTitle>
            <Button
              variant="ghost"
              className="absolute top-0 right-0 p-2 hover:bg-pink-100 dark:hover:bg-[#2b1a21]"
              onClick={() => onOpenChange(false)}
            >
              <FaTimes className="text-gray-600 dark:text-gray-300" size={20} />
            </Button>
          </DialogHeader>

          <div className="border-t border-gray-200 dark:border-gray-800 my-6" />

          <form className="space-y-10">
            {/* Seção de Filtros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <FiltroAge
                  value={filtros.idade || [18, 100]}
                  onChange={(value: number[]) => setFiltros({ ...filtros, idade: value })}
                  bgColor={theme === 'dark' ? 'bg-[#2b1a21]' : 'bg-white'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FiltroTarifa
                  value={filtros.tarifa || [0, 1000]}
                  onChange={(value: number[]) => setFiltros({ ...filtros, tarifa: value })}
                  bgColor={theme === 'dark' ? 'bg-[#2b1a21]' : 'bg-white'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FiltroLingua
                  value={filtros.lingua || []}
                  onChange={(value: string[]) => setFiltros({ ...filtros, lingua: value })}
                  bgColor={theme === 'dark' ? 'bg-[#2b1a21]' : 'bg-white'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <FiltroAltura
                  value={filtros.altura || ''}
                  onChange={(value: string) => setFiltros({ ...filtros, altura: value })}
                  bgColor={theme === 'dark' ? 'bg-[#2b1a21]' : 'bg-white'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FiltroDistrito
                  value={filtros.distrito || ''}
                  onChange={(value: string) => setFiltros({ ...filtros, distrito: value })}
                  bgColor={theme === 'dark' ? 'bg-[#2b1a21]' : 'bg-white'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <FiltroOrigem
                  value={filtros.origem || ''}
                  onChange={(value: string) => setFiltros({ ...filtros, origem: value })}
                  bgColor={theme === 'dark' ? 'bg-[#2b1a21]' : 'bg-white'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <FiltroOlhos
                  value={filtros.olhos || ''}
                  onChange={(value: string) => setFiltros({ ...filtros, olhos: value })}
                  bgColor={theme === 'dark' ? 'bg-[#2b1a21]' : 'bg-white'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <FiltroPeito
                  value={filtros.seios || ''}
                  onChange={(value: string) => setFiltros({ ...filtros, seios: value })}
                  bgColor={theme === 'dark' ? 'bg-[#2b1a21]' : 'bg-white'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <FiltroMamas
                  value={filtros.mamas || ''}
                  onChange={(value: string) => setFiltros({ ...filtros, mamas: value })}
                  bgColor={theme === 'dark' ? 'bg-[#2b1a21]' : 'bg-white'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <FiltroPelos
                  value={filtros.pelos === undefined ? '' : filtros.pelos ? 'Sim' : 'Não'}
                  onChange={(value: string) =>
                    setFiltros({
                      ...filtros,
                      pelos: value === 'Sim' ? true : value === 'Não' ? false : undefined,
                    })
                  }
                  bgColor={theme === 'dark' ? 'bg-[#2b1a21]' : 'bg-white'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <FiltroTatuagem
                  value={filtros.tatuagem === undefined ? '' : filtros.tatuagem ? 'Sim' : 'Não'}
                  onChange={(value: string) =>
                    setFiltros({
                      ...filtros,
                      tatuagem: value === 'Sim' ? true : value === 'Não' ? false : undefined,
                    })
                  }
                  bgColor={theme === 'dark' ? 'bg-[#2b1a21]' : 'bg-white'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-body text-gray-700 dark:text-gray-300">
                    Certificado
                  </label>
                  <Button
                    onClick={() =>
                      setFiltros({
                        ...filtros,
                        certificado: filtros.certificado === undefined ? true : !filtros.certificado,
                      })
                    }
                    className={cn(
                      'w-full h-10 rounded-full font-body transition-all duration-300 shadow-md',
                      filtros.certificado === true
                        ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white'
                        : filtros.certificado === false
                        ? 'bg-gray-200 dark:bg-[#2b1a21] text-gray-700 dark:text-gray-200'
                        : 'bg-white dark:bg-[#2b1a21] border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-[#3b2a31]'
                    )}
                  >
                    {filtros.certificado === true ? 'Sim' : filtros.certificado === false ? 'Não' : 'Qualquer'}
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Rodapé com botões */}
            <DialogFooter className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <Button
                type="button"
                onClick={handleResetFilters}
                variant="outline"
                className="w-full sm:w-auto rounded-full py-2 px-6 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-pink-600 hover:text-white font-body transition-all duration-300"
              >
                Limpar Filtros
              </Button>
              <Button
                type="button"
                onClick={handleApplyFilters}
                className="w-full sm:w-auto rounded-full py-2 px-6 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-body flex items-center justify-center gap-2 shadow-md transition-all duration-300"
              >
                <FaFilter size={18} />
                Aplicar ({filteredProfiles.length})
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default Filtro;