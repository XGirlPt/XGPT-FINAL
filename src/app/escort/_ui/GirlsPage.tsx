'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProfiles } from '@/backend/services/profileService';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import {
  FaVideo,
  FaCrown,
  FaClock,
  FaCommentDots,
  FaMapMarkerAlt,
  FaFilter,
  FaPen,
  FaSearch,
} from 'react-icons/fa';
import { MdVerified, MdFiberManualRecord } from 'react-icons/md';
import { Profile } from '@/backend/types';
import { Button } from '@/components/ui/button';
import { setAppliedFilters } from '@/backend/reducers/profileSlice';
import { supabase } from '@/backend/database/supabase';
import { useTranslation } from 'react-i18next';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';
import Filtro from '@/components/layout/filtro';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

// Componente CommonFilter embutido
interface FilterOption {
  id: string;
  name: string;
  unavailable?: boolean;
}

interface CommonFilterProps {
  label: string;
  options: FilterOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  bgColor?: string;
}

const CommonFilter: React.FC<CommonFilterProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  bgColor = 'bg-[#FFF5F8] dark:bg-[#27191f]',
}) => {
  const selectedOption = options.find((opt) => opt.name === value) || null;
  const displayValue = selectedOption ? selectedOption.name : (placeholder || label);

  return (
    <div className="w-full z-50">
      <Listbox
        value={selectedOption}
        onChange={(option: FilterOption | null) => onChange(option ? option.name : '')}
      >
        {({ open }) => (
          <div>
            <div className="relative">
              <p className="text-md font-medium text-gray-400">{label}</p>
              <Listbox.Button
                className={`relative w-full ${bgColor} text-gray-600 dark:text-gray-200 text-sm cursor-pointer py-2.5 pl-3 pr-10 text-left rounded-full focus:outline-none border border-pink-200 hover:border-pink-300 dark:border-[#2D3748] dark:hover:border-[#4A5568] transition-colors duration-200`}
              >
                <span className="block truncate">{displayValue}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-[#E84393]" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 w-full mt-1 overflow-auto text-sm bg-[#FFF5F8] dark:bg-[#27191f] text-gray-600 dark:text-gray-200 rounded-md shadow-lg max-h-60 ring-1 ring-gray-400 dark:ring-1 dark:ring-[#2D3748] focus:outline-none">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        `relative py-2.5 pl-3 pr-9 cursor-pointer select-none ${
                          active ? 'bg-pink-500 text-white' : 'text-gray-600 dark:text-gray-200 hover:bg-[#2D3748]'
                        }`
                      }
                      value={option}
                      disabled={option.unavailable}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                          >
                            {option.name}
                          </span>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                                active ? 'text-white' : 'text-[#E84393]'
                              }`}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
    </div>
  );
};

// Componente FiltroDistrito embutido
interface FiltroDistritoProps {
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
  bgColor?: string;
  hideLabel?: boolean;
}

const FiltroDistrito: React.FC<FiltroDistritoProps> = ({ onChange, value, disabled, bgColor, hideLabel }) => {
  const { t } = useTranslation();

  const distritos: FilterOption[] = [
    { id: '', name: t('filterDistrito.all_districts', { defaultValue: 'Todos os distritos' }) },
    { id: 'Lisboa', name: 'Lisboa' },
    { id: 'Porto', name: 'Porto' },
    { id: 'Aveiro', name: 'Aveiro' },
    { id: 'Beja', name: 'Beja' },
    { id: 'Bragança', name: 'Bragança' },
    { id: 'Braga', name: 'Braga' },
    { id: 'Castelo Branco', name: 'Castelo Branco' },
    { id: 'Coimbra', name: 'Coimbra' },
    { id: 'Évora', name: 'Évora' },
    { id: 'Faro', name: 'Faro' },
    { id: 'Guarda', name: 'Guarda' },
    { id: 'Leiria', name: 'Leiria' },
    { id: 'Santarém', name: 'Santarém' },
    { id: 'Setúbal', name: 'Setúbal' },
    { id: 'Viana do Castelo', name: 'Viana do Castelo' },
    { id: 'Vila Real', name: 'Vila Real' },
    { id: 'Viseu', name: 'Viseu' },
    { id: 'Madeira', name: 'Madeira' },
    { id: 'Açores', name: 'Açores' },
  ];

  const handleDistritoChange = (selectedId: string) => {
    console.log('Distrito selecionado:', selectedId);
    if (onChange) {
      onChange(selectedId);
    }
  };

  return (
    <CommonFilter
      label={hideLabel ? '' : t('filterDistrito.district', { defaultValue: 'Distrito' })}
      options={distritos}
      value={value || ''}
      onChange={handleDistritoChange}
      bgColor={bgColor}
      placeholder={t('filterDistrito.select_district', { defaultValue: 'Selecione um distrito' })}
      disabled={disabled}
    />
  );
};

// Metadata
export const metadata = {
  title: 'XGirl - Acompanhantes em Portugal',
  description:
    'Encontre as melhores acompanhantes e massagistas eróticas em Portugal. Filtre por localização, idade, tarifa e mais.',
  keywords:
    'Acompanhantes, Escort Portugal, Escort Lisboa, Escort Porto, Massagistas Eróticas, Anúncios Eróticos, Portugal',
  openGraph: {
    title: 'XGirl - Acompanhantes e Escort em Portugal',
    description:
      'Descubra acompanhantes de luxo em Lisboa, Porto, Faro e mais. Filtre e encontre o perfil ideal.',
    url: 'https://xgirl.pt/escort',
    type: 'website',
    images: ['/public/photos/logo.webp'],
  },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
    transition: { duration: 0.2 },
  },
};

// Função para formatar o tempo decorrido
const timeAgo = (timestamp: string | Date) => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true, locale: pt });
};

// Função para verificar badge de autora
const checkAuthorBadge = async (userUID: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('status')
    .eq('author_id', userUID)
    .eq('status', 'approved')
    .limit(1);

  if (error) {
    console.error('Erro ao verificar artigo aprovado:', error.message);
    return false;
  }
  return data && data.length > 0;
};

export default function EscortPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [previewProfileCount, setPreviewProfileCount] = useState<number>(0);
  const [selectedStory, setSelectedStory] = useState<{ profile: Profile; index: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filters, setFilters] = useState({ distrito: '' });
  const [authorBadges, setAuthorBadges] = useState<Record<string, boolean>>({});
  const appliedFilters = useSelector((state: any) => state.profile.appliedFilters || {});

  // Carregar perfis
  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedProfiles = await fetchProfiles();
      const sortedProfiles = fetchedProfiles
        .filter((profile) => profile.tag && profile.tag.trim() !== '')
        .sort((a, b) => {
          if (a.premium && !b.premium) return -1;
          if (!a.premium && b.premium) return 1;
          return new Date(b.tagtimestamp ?? 0).getTime() - new Date(a.tagtimestamp ?? 0).getTime();
        });
      setProfiles(sortedProfiles);
      setFilteredProfiles(applyFilters(sortedProfiles, appliedFilters));
      setPreviewProfileCount(sortedProfiles.length); // Inicializa com todos os perfis
    } catch (error) {
      console.error('[EscortPage] Erro ao carregar perfis:', error);
    } finally {
      setLoading(false);
    }
  }, [appliedFilters]);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  // Atualizar contagem de perfis quando o distrito mudar
  useEffect(() => {
    const previewFiltered = applyFilters(profiles, { distrito: filters.distrito });
    setPreviewProfileCount(previewFiltered.length);
  }, [filters.distrito, profiles]);

  // Aplicar filtros
  const applyFilters = (profiles: Profile[], filters: any) => {
    return profiles.filter((profile) => {
      if (filters.idade && (profile.idade < filters.idade[0] || profile.idade > filters.idade[1])) return false;
      if (filters.tarifa && (profile.tarifa < filters.tarifa[0] || profile.tarifa > filters.tarifa[1])) return false;
      if (filters.distrito && filters.distrito !== profile.distrito) return false;
      if (filters.lingua && !filters.lingua.some((lang: string) => profile.lingua?.includes(lang))) return false;
      if (filters.altura && profile.altura !== filters.altura) return false;
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

  // Manipular aplicação de filtros
  const handleApplyFilters = useCallback(
    (newFilters: any) => {
      dispatch(setAppliedFilters(newFilters));
      setShowMoreFilters(false);
    },
    [dispatch]
  );

  // Manipular busca por distrito
  const handleSearchByDistrict = () => {
    dispatch(setAppliedFilters({ ...appliedFilters, distrito: filters.distrito }));
  };

  // Resetar filtros
  const handleResetFilters = () => {
    setFilters({ distrito: '' });
    dispatch(setAppliedFilters({}));
  };

  // Abrir/fechar story
  const openStory = (profile: Profile, index: number) => {
    setSelectedStory({ profile, index });
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  if (loading) {
    return (
      <main className="bg-[#f2ebee] dark:bg-[#100007] min-h-screen flex items-center justify-center">
        <motion.p
          className="text-center text-gray-900 dark:text-white text-2xl font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('common.loading', { defaultValue: 'Carregando...' })}
        </motion.p>
      </main>
    );
  }

  return (
    <main className="bg-[#f2ebee] dark:bg-[#100007] min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        {/* Gradiente Decorativo Superior */}
        <motion.div
          className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          style={{
            height: '400px',
            width: '400px',
            top: '-100px',
            left: '-100px',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />

        {/* Título */}
        <motion.div
          className="relative z-10 text-center mb-12"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-body">
            {t('escort.title', { defaultValue: 'Acompanhantes e Massagistas Eróticas' })}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-body">
            {t('escort.subtitle', { defaultValue: 'Encontre as melhores acompanhantes em Portugal' })}
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="relative z-20 max-w-4xl mx-auto bg-gradient-to-r from-white to-pink-50 dark:from-[#2b1a21] dark:to-[#3b2a31] rounded-2xl p-6 border border-pink-200 dark:border-pink-900 shadow-xl mb-12"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <div className="w-full sm:w-1/3 relative z-30">
              <FiltroDistrito
                value={filters.distrito}
                onChange={(value: string) => setFilters({ ...filters, distrito: value })}
                bgColor={theme === 'dark' ? 'bg-[#3b2a31]' : 'bg-white'}
                hideLabel={true}
              />
            </div>
            <Button
              className={cn(
                'w-full sm:w-auto rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white py-2.5 px-8 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 font-body h-12',
                theme === 'dark' ? 'dark:hover:from-pink-800 dark:hover:to-rose-700' : ''
              )}
              onClick={handleSearchByDistrict}
            >
              <FaSearch size={16} />
              {t('filters.search', { defaultValue: 'Procurar' })} ({previewProfileCount})
            </Button>
            <Button
              className={cn(
                'w-full sm:w-auto rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white py-2.5 px-6 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 font-body h-12',
                theme === 'dark' ? 'dark:hover:from-yellow-600 dark:hover:to-yellow-500' : ''
              )}
              onClick={() => setShowMoreFilters(true)}
            >
              <FaFilter size={16} />
              {t('filters.more_filters', { defaultValue: 'Mais Filtros' })}
            </Button>
            <Button
              variant="outline"
              className={cn(
                'w-full sm:w-auto rounded-full border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-[#4b3a41] py-2.5 px-6 font-body transition-all duration-300 shadow-sm hover:shadow-md h-12'
              )}
              onClick={handleResetFilters}
            >
              {t('filters.reset', { defaultValue: 'Limpar' })}
            </Button>
          </div>
        </motion.div>

        {/* Grade de Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProfiles.map((profile, index) => (
            <Link key={profile.nome} href={`/escort/${profile.nome}`} passHref>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="relative rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-2xl flex flex-col bg-white dark:bg-[#300d1b]"
              >
                {/* Imagem */}
                <div className="relative aspect-[4/4] rounded-t-3xl overflow-hidden">
                  <Image
                    src={profile.photos[0] || '/logo.webp'}
                    alt={profile.nome}
                    fill
                    className="object-cover"
                  />
                  {profile.premium && (
                    <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 flex items-center shadow-md">
                      <FaCrown className="mr-1" />
                      Premium
                    </div>
                  )}
                  {profile.live && (
                    <div className="absolute top-2 left-2 bg-red-700 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 animate-pulse flex items-center">
                      <MdFiberManualRecord className="mr-1" />
                      Live Cam
                    </div>
                  )}
                  {Array.isArray(profile.stories) && profile.stories.length > 0 && (
                    <div
                      className="absolute top-10 right-2 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-50 flex items-center cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        openStory(profile, 0);
                      }}
                    >
                      <FaVideo className="mr-1" />
                      Stories
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-base font-semibold text-white flex items-center gap-1">
                      {profile.nome} {profile.certificado && <MdVerified className="text-green-500" />}
                      {authorBadges[profile.userUID] && (
                        <span className="ml-2 bg-yellow-200 text-yellow-800 text-xs font-semibold py-0.5 px-1.5 rounded-full flex items-center">
                          <FaPen className="mr-1" size={10} />
                          Autora
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-1 text-white text-sm">
                      <FaMapMarkerAlt className="text-pink-600" />
                      {profile.cidade}
                    </div>
                  </div>
                </div>
                {/* Conteúdo */}
                <div className="flex flex-col justify-between flex-1 p-4 rounded-b-3xl">
                  <div className="flex items-start justify-between gap-2">
                    <span className="block break-words italic text-sm max-h-[70px] overflow-hidden font-body">
                    &quot;{profile.tag}&quot;
                    </span>
                    <FaCommentDots className="text-yellow-600 text-md min-w-[18px] min-h-[18px] flex-shrink-0" />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-2 font-body">
                    <FaClock className="text-yellow-500 h-4 w-4" />
                    {timeAgo(profile.tagtimestamp ?? new Date())}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Modal de Mais Filtros */}
        <Filtro
          open={showMoreFilters}
          onOpenChange={setShowMoreFilters}
          onApplyFilters={handleApplyFilters}
        />

        {/* Modal de Story */}
        {/* {selectedStory && (
          <StoryBig
            selectedProfile={{
              storyURL: selectedStory.profile.stories,
              nome: selectedStory.profile.nome,
              cidade: selectedStory.profile.cidade,
              photos: selectedStory.profile.photos,
            }}
            onClose={closeStory}
            currentIndex={selectedStory.index}
          />
        )} */}

        {/* Gradiente Decorativo Inferior */}
        <motion.div
          className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          style={{
            height: '400px',
            width: '400px',
            bottom: '-100px',
            right: '-100px',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />
      </div>
    </main>
  );
}