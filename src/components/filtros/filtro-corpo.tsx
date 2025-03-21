// components/filtros/filtro-corpo.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroCorpoProps {
  value: string; // Recebe o valor do react-hook-form
  onChange: (value: string) => void; // Atualiza o valor no react-hook-form
  bgColor?: string;
}

type CorpoKey = 'normal' | 'atletico' | 'magro' | 'curvilineo' | 'xxl';

const FiltroCorpo: React.FC<FiltroCorpoProps> = ({ value, onChange, bgColor }) => {
  const { t } = useTranslation();

  const corposEmPortugues: Record<CorpoKey, string> = {
    normal: 'Normal',
    atletico: 'Atlética',
    magro: 'Magro',
    curvilineo: 'Curvilínea',
    xxl: 'XXL',
  };

  const corposTraduzidos: Record<CorpoKey, string> = {
    normal: t('filter.normal'),
    atletico: t('filter.athletic'),
    magro: t('filter.slim'),
    curvilineo: t('filter.curvy'),
    xxl: t('filter.xxl'),
  };

  const corpoOptions: FilterOption[] = Object.keys(corposEmPortugues).map((key) => ({
    id: corposEmPortugues[key as CorpoKey],
    name: corposTraduzidos[key as CorpoKey],
  }));

  const handleCorpoChange = (selectedId: string) => {
    console.log('Corpo selecionado:', selectedId);
    onChange(selectedId); // Apenas atualiza o estado do formulário
  };

  const displayedValue = value
    ? corposTraduzidos[
        Object.keys(corposEmPortugues).find(
          (key) => corposEmPortugues[key as CorpoKey] === value
        ) as CorpoKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filter.body')}
      options={corpoOptions}
      value={displayedValue}
      onChange={handleCorpoChange}
      bgColor={bgColor}
      placeholder={t('filter.select_body')}
    />
  );
};

export default FiltroCorpo;