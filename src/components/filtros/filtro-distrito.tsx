
'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroDistritoProps {
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
  bgColor?: string;
  hideLabel?: boolean; // Nova prop para ocultar o rótulo
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
      label={hideLabel ? undefined : t('filterDistrito.district', { defaultValue: 'Distrito' })}
      options={distritos}
      value={value || ''}
      onChange={handleDistritoChange}
      bgColor={bgColor}
      placeholder={t('filterDistrito.select_district', { defaultValue: 'Selecione um distrito' })}
      disabled={disabled}
      className="w-full h-12 px-4 rounded-full border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-pink-600 transition-all duration-300 shadow-sm hover:shadow-md"
    />
  );
};

export default FiltroDistrito;
