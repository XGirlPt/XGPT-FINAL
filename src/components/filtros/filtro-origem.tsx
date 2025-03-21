// components/filtros/filtro-origem.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroOrigemProps {
  value: string; // Recebe o valor do react-hook-form
  onChange: (value: string) => void; // Atualiza o valor no react-hook-form
  bgColor?: string;
}

type OrigemKey = 'portuguesa' | 'brasileira' | 'espanhola' | 'africana' | 'latina' | 'oriental';

const FiltroOrigem: React.FC<FiltroOrigemProps> = ({ value, onChange, bgColor }) => {
  const { t } = useTranslation();

  const origensEmPortugues: Record<OrigemKey, string> = {
    portuguesa: 'Portuguesa',
    brasileira: 'Brasileira',
    espanhola: 'Espanhola',
    africana: 'Africana',
    latina: 'Latina',
    oriental: 'Oriental',
  };

  const origensTraduzidas: Record<OrigemKey, string> = {
    portuguesa: t('origin.portuguese'),
    brasileira: t('origin.brazilian'),
    espanhola: t('origin.spanish'),
    africana: t('origin.african'),
    latina: t('origin.latin'),
    oriental: t('origin.oriental'),
  };

  const origemOptions: FilterOption[] = Object.keys(origensEmPortugues).map((key) => ({
    id: origensEmPortugues[key as OrigemKey],
    name: origensTraduzidas[key as OrigemKey],
  }));

  const handleOrigemChange = (selectedId: string) => {
    console.log('Origem selecionada:', selectedId);
    onChange(selectedId); // Apenas atualiza o estado do formulário
  };

  const displayedValue = value
    ? origensTraduzidas[
        Object.keys(origensEmPortugues).find(
          (key) => origensEmPortugues[key as OrigemKey] === value
        ) as OrigemKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filter.origin')}
      options={origemOptions}
      value={displayedValue}
      onChange={handleOrigemChange}
      bgColor={bgColor}
      placeholder={t('filter.select_origin')}
    />
  );
};

export default FiltroOrigem;