import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroMamasProps {
  value: string; // Recebe o valor do react-hook-form
  onChange: (value: string) => void; // Atualiza o valor no react-hook-form
  bgColor?: string;
}

type MamasKey = 'natural' | 'silicone';

const FiltroMamas: React.FC<FiltroMamasProps> = ({ value, onChange, bgColor }) => {
  const { t } = useTranslation();

  const mamasEmPortugues: Record<MamasKey, string> = {
    natural: 'Natural',
    silicone: 'Silicone',
  };

  const mamasTraduzidas: Record<MamasKey, string> = {
    natural: t('breasts.natural'),
    silicone: t('breasts.silicone'),
  };

  const mamasOptions: FilterOption[] = Object.keys(mamasEmPortugues).map((key) => ({
    id: mamasEmPortugues[key as MamasKey],
    name: mamasTraduzidas[key as MamasKey],
  }));

  const handleMamasChange = (selectedId: string) => {
    console.log('Mamas selecionadas:', selectedId);
    onChange(selectedId); // Apenas atualiza o estado do formulário
  };

  const displayedValue = value
    ? mamasTraduzidas[
        Object.keys(mamasEmPortugues).find(
          (key) => mamasEmPortugues[key as MamasKey] === value
        ) as MamasKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterMamas.breasts')}
      options={mamasOptions}
      value={displayedValue}
      onChange={handleMamasChange}
      bgColor={bgColor}
      placeholder={t('filterMamas.select_breasts')}
    />
  );
};

export default FiltroMamas;
