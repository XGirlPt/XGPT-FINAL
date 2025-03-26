import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fetchProfiles } from '@/backend/services/profileService';
import { Dialog, DialogContent, DialogTitle } from './dialog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const districts = [
  'Aveiro', 'Beja', 'Braga', 'Coimbra', 'Évora', 'Faro', 'Madeira', 'Açores',
  'Leiria', 'Lisboa', 'Portalegre', 'Porto', 'Santarém', 'Setúbal', 'Viseu', 'Bragança',
];

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');
  const [onlyCertified, setOnlyCertified] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    if (!isOpen) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedProfiles = await fetchProfiles();
        setProfiles(Array.isArray(fetchedProfiles) ? fetchedProfiles : []);
      } catch (error) {
        console.error('Erro ao buscar perfis:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isOpen]);

  const filterProfiles = useCallback((query: string) => {
    let filtered = profiles.filter((acompanhante) => {
      const nome = acompanhante?.nome?.toLowerCase() || '';
      const distrito = acompanhante?.distrito?.toLowerCase() || '';
      const cidade = acompanhante?.cidade?.toLowerCase() || '';
      const q = query.toLowerCase();
      return nome.includes(q) || distrito.includes(q) || cidade.includes(q);
    });

    if (onlyCertified) {
      filtered = filtered.filter((p) => p.certificado);
    }

    filtered.sort((a, b) =>
      sortBy === 'name'
        ? a.nome.localeCompare(b.nome)
        : new Date(b.tagtimestamp ?? 0).getTime() - new Date(a.tagtimestamp ?? 0).getTime()
    );

    setFilteredProfiles(filtered);
    setCurrentPage(1);
  }, [profiles, sortBy, onlyCertified]);

  useEffect(() => {
    const debouncedFilter = debounce(filterProfiles, 300);
    debouncedFilter(searchQuery);
  }, [searchQuery, filterProfiles]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);

  const filterByDistrict = (district: string) => setSearchQuery(district);

  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleViewAll = () => {
    if (searchQuery && districts.includes(searchQuery)) {
      router.push(`/escort?distrito=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSortBy('name');
    setOnlyCertified(false);
    setCurrentPage(1);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          'w-full max-w-[95%] md:max-w-[85%] max-h-[95vh] bg-[#f2ebee] dark:bg-[#100007] rounded-3xl shadow-xl p-6 md:p-8 overflow-y-auto',
          theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <DialogTitle className="text-2xl md:text-3xl font-semibold font-body">
            Buscar
          </DialogTitle>
       
        </motion.div>
        <div className="border-t border-gray-200 dark:border-gray-800 mb-8" />

        {/* Search Input e Filtros */}
        <div className="mb-2 space-y-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite o nome, cidade ou distrito"
            className={cn(
              'w-full px-4 py-3 rounded-full font-body text-base shadow-md',
              theme === 'dark'
                ? 'bg-[#2b1a21] border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-pink-500'
                : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-500'
            )}
          />
          <div className="flex flex-wrap gap-3 items-center">
            <Button
              onClick={() => setSortBy('name')}
              className={cn(
                'rounded-full py-2 px-5 font-body transition-all duration-300 shadow-sm',
                sortBy === 'name'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white'
                  : theme === 'dark'
                    ? 'bg-[#2b1a21] text-gray-200 hover:bg-pink-600 hover:text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-pink-600 hover:text-white'
              )}
            >
              Nome
            </Button>
            <Button
              onClick={() => setSortBy('date')}
              className={cn(
                'rounded-full py-2 px-5 font-body transition-all duration-300 shadow-sm',
                sortBy === 'date'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white'
                  : theme === 'dark'
                    ? 'bg-[#2b1a21] text-gray-200 hover:bg-pink-600 hover:text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-pink-600 hover:text-white'
              )}
            >
              Data
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-body text-gray-700 dark:text-gray-200">Certificados</span>
              <Button
                onClick={() => setOnlyCertified(!onlyCertified)}
                className={cn(
                  'relative h-9 w-16 rounded-full border p-1 shadow-md transition-all duration-300',
                  onlyCertified
                    ? 'bg-gradient-to-r from-pink-600 to-rose-500 border-transparent'
                    : theme === 'dark'
                      ? 'bg-[#2b1a21] border-zinc-700'
                      : 'bg-white border-gray-200'
                )}
              >
                <div
                  className={cn(
                    'absolute w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300',
                    onlyCertified ? 'translate-x-7 bg-white' : 'translate-x-0 bg-gray-300 dark:bg-zinc-600'
                  )}
                >
                  {onlyCertified ? (
                    <VscVerifiedFilled className="text-pink-600" size={16} />
                  ) : (
                    <span className="text-gray-500 dark:text-gray-300 text-xs">✕</span>
                  )}
                </div>
              </Button>
            </div>
            {(searchQuery || onlyCertified) && (
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="rounded-full py-2 px-5 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-pink-600 hover:text-white font-body shadow-sm"
              >
                Limpar
              </Button>
            )}
            {districts.includes(searchQuery) && (
              <Button
                onClick={handleViewAll}
                className="rounded-full py-2 px-5 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-body shadow-md"
              >
                Ver todos em {searchQuery}
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredProfiles.length} resultados encontrados
          </p>
        </div>

        {/* Distritos Section */}
        <div className="mb-10">
          <h2 className="text-xl font-medium font-body mb-4">Distritos</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-3 text-sm"
          >
            {districts.map((district) => (
              <Button
                key={district}
                onClick={() => filterByDistrict(district)}
                className={cn(
                  'rounded-full py-2 px-4 font-body transition-all duration-300 shadow-sm',
                  searchQuery === district
                    ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white'
                    : theme === 'dark'
                      ? 'bg-[#2b1a21] text-gray-200 hover:bg-pink-600 hover:text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-pink-600 hover:text-white'
                )}
              >
                {district}
              </Button>
            ))}
          </motion.div>
        </div>

        {/* Profiles Section */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Carregando...</p>
          ) : paginatedProfiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProfiles.map((profile, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'bg-white dark:bg-[#1a0a10] rounded-3xl shadow-lg overflow-hidden w-full group'
                  )}
                >
                  <Link href={`/escort/${profile.nome}`}>
                    <div className="relative">
                      <Image
                        src={profile.photos[0] || '/logo.webp'}
                        alt={profile.nome}
                        width={300}
                        height={180}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                        <p className="text-lg font-bold text-white flex items-center">
                          {profile.nome}
                          {profile.certificado && (
                            <VscVerifiedFilled className="text-green-400 ml-2" />
                          )}
                        </p>
                        <p className="text-sm text-gray-300 flex items-center">
                          <FaMapMarkerAlt className="text-rose-500 mr-2" />
                          {profile.cidade}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white p-4">
                        <p className="text-sm">{profile.tag || 'Sem descrição'}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Nenhum resultado encontrado
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-6 mt-8 items-center">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-body shadow-md py-2 px-5"
            >
              Anterior
            </Button>
            <span className="text-sm font-body">
              Exibindo {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProfiles.length)} de {filteredProfiles.length}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-body shadow-md py-2 px-5"
            >
              Próximo
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;