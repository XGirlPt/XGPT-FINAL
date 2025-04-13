import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroPelosProps {
  value: string;
  onChange: (value: string) => void;
  bgColor?: string;
}

type PelosKey = 'rapadinha' | 'parcialmente' | 'natural';

const FiltroPelos: React.FC<FiltroPelosProps> = ({ value, onChange, bgColor }) => {
  const { t } = useTranslation();

  const pelosEmPortugues: Record<PelosKey, string> = {
    rapadinha: 'Rapadinha',
    parcialmente: 'Parcialmente',
    natural: 'Natural',
  };

  const pelosTraduzidos: Record<PelosKey, string> = {
    rapadinha: t('hair_removalPelos.smooth'),
    parcialmente: t('hair_removalPelos.partially_smooth'),
    natural: t('hair_removalPelos.natural'),
  };

  const pelosOptions: FilterOption[] = Object.keys(pelosEmPortugues).map((key) => ({
    id: pelosEmPortugues[key as PelosKey],
    name: pelosTraduzidos[key as PelosKey],
  }));

  const handlePelosChange = (selectedId: string) => {
    console.log('Pelos selecionados:', selectedId);
    onChange(selectedId);
  };

  const displayedValue = value
    ? pelosTraduzidos[
        Object.keys(pelosEmPortugues).find(
          (key) => pelosEmPortugues[key as PelosKey] === value
        ) as PelosKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterPelos.hair_removal')}
      options={pelosOptions}
      value={value}
      onChange={handlePelosChange}
      bgColor={bgColor}
      placeholder={t('filterPelos.select_hair_removal')}
    />
  );
};

export default FiltroPelos;
