import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fetchProfiles } from '@/backend/services/profileService';
import { Dialog, DialogContent, DialogTitle } from './dialog';
import Link from 'next/link';
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
  'Leiria', 'Lisboa', 'Portalegre', 'Porto', 'Santarém', 'Setúbal', 'Viseu',
];

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
}) => {
  const { theme } = useTheme();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMoreDistricts, setShowMoreDistricts] = useState(false);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;

  // Buscar perfis
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

  // Filtrar perfis com debounce
  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const filterProfiles = useCallback((query: string) => {
    const filtered = profiles.filter((acompanhante) => {
      const nome = acompanhante?.nome?.toLowerCase() || '';
      const distrito = acompanhante?.distrito?.toLowerCase() || '';
      const cidade = acompanhante?.cidade?.toLowerCase() || '';
      const q = query.toLowerCase();
      return nome.includes(q) || distrito.includes(q) || cidade.includes(q);
    });
    setFilteredProfiles(filtered);
    setCurrentPage(1); // Resetar página ao filtrar
  }, [profiles]);

  useEffect(() => {
    const debouncedFilter = debounce(filterProfiles, 300);
    debouncedFilter(searchQuery);
  }, [searchQuery, filterProfiles]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);

  const filterByDistrict = (district: string) => setSearchQuery(district);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          'w-full max-w-[90%] md:max-w-[70%] max-h-[90vh] bg-[#f2ebee] dark:bg-[#100007] rounded-3xl shadow-lg p-4 md:p-6 overflow-y-auto',
          theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <DialogTitle className="text-2xl md:text-3xl font-semibold font-body">
            Buscar
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:text-pink-600 dark:hover:text-pink-400"
          >
            ✕
          </Button>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mb-6" />

        {/* Search Input */}
        <div className="mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite o nome, cidade ou distrito"
            className={cn(
              'w-full px-4 py-3 rounded-full font-body text-base',
              theme === 'dark'
                ? 'bg-[#2b1a21] border-zinc-700 text-white placeholder:text-zinc-400'
                : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
            )}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {filteredProfiles.length} resultados encontrados
          </p>
        </div>

        {/* Distritos Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium font-body mb-4">Distritos</h2>
          <motion.div
            initial={{ height: 'auto' }}
            animate={{ height: showMoreDistricts ? 'auto' : '4rem' }}
            className="flex flex-wrap gap-3 text-sm overflow-hidden"
          >
            {districts.map((district) => (
              <Button
                key={district}
                onClick={() => filterByDistrict(district)}
                className={cn(
                  'rounded-full py-2 px-4 font-body transition-colors',
                  theme === 'dark'
                    ? 'bg-[#2b1a21] text-gray-200 hover:bg-pink-600 hover:text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-pink-600 hover:text-white'
                )}
              >
                {district}
              </Button>
            ))}
          </motion.div>
          {districts.length > 8 && (
            <Button
              variant="link"
              onClick={() => setShowMoreDistricts(!showMoreDistricts)}
              className="mt-2 text-pink-600 hover:text-pink-700 font-body"
            >
              {showMoreDistricts ? 'Ver menos' : 'Ver mais'}
            </Button>
          )}
        </div>

        {/* Profiles Section */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Carregando...</p>
          ) : paginatedProfiles.length > 0 ? (
            <div className="flex gap-6">
              {paginatedProfiles.map((profile, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'bg-white dark:bg-[#1a0a10] rounded-3xl shadow-lg overflow-hidden flex-shrink-0 w-[250px] md:w-[200px]'
                  )}
                >
                  <Link href={`/escort/${profile.nome}`}>
                    <div className="relative">
                      <Image
                        src={profile.photos[0] || '/logo.webp'}
                        alt={profile.nome}
                        width={300}
                        height={180}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
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
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-full bg-pink-600 hover:bg-pink-700 text-white font-body"
            >
              Anterior
            </Button>
            <span className="text-sm font-body">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-full bg-pink-600 hover:bg-pink-700 text-white font-body"
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