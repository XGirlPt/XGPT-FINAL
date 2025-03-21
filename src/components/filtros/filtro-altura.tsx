import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroAlturaProps {
  value: string; // Recebe o valor do react-hook-form
  onChange: (value: string) => void; // Atualiza o valor no react-hook-form
  bgColor?: string;
}

type AlturaKey = 'menor_160' | 'cerca_165' | 'maior_170';

const FiltroAltura: React.FC<FiltroAlturaProps> = ({ value, onChange, bgColor }) => {
  const { t } = useTranslation();

  const alturasEmPortugues: Record<AlturaKey, string> = {
    menor_160: '< 1,60m',
    cerca_165: '+ / - 1,65m',
    maior_170: '> 1,70m',
  };

  const alturasTraduzidas: Record<AlturaKey, string> = {
    menor_160: t('height.less_than_160'),
    cerca_165: t('height.around_165'),
    maior_170: t('height.more_than_170'),
  };

  const alturaOptions: FilterOption[] = Object.keys(alturasEmPortugues).map((key) => ({
    id: alturasEmPortugues[key as AlturaKey],
    name: alturasTraduzidas[key as AlturaKey],
  }));

  const handleAlturaChange = (selectedId: string) => {
    console.log('Altura selecionada:', selectedId);
    onChange(selectedId); // Apenas atualiza o estado do formulário
  };

  const displayedValue = value
    ? alturasTraduzidas[
        Object.keys(alturasEmPortugues).find(
          (key) => alturasEmPortugues[key as AlturaKey] === value
        ) as AlturaKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterAltura.height')}
      options={alturaOptions}
      value={displayedValue}
      onChange={handleAlturaChange}
      bgColor={bgColor}
      placeholder={t('filterAltura.select_height')}
    />
  );
};

export default FiltroAltura;
