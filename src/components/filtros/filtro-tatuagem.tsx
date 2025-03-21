import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroTatuagemProps {
  value: string;
  onChange: (value: string) => void;
  bgColor?: string;
}

type TatuagemKey = 'com_tatuagens' | 'sem_tatuagens';

const FiltroTatuagem: React.FC<FiltroTatuagemProps> = ({ value, onChange, bgColor }) => {
  const { t } = useTranslation();

  const tatuagensEmPortugues: Record<TatuagemKey, string> = {
    com_tatuagens: 'Com tatuagens',
    sem_tatuagens: 'Sem tatuagens',
  };

  const tatuagensTraduzidas: Record<TatuagemKey, string> = {
    com_tatuagens: t('tattoos.with_tattoos'),
    sem_tatuagens: t('tattoos.without_tattoos'),
  };

  const tatuagemOptions: FilterOption[] = Object.keys(tatuagensEmPortugues).map((key) => ({
    id: tatuagensEmPortugues[key as TatuagemKey],
    name: tatuagensTraduzidas[key as TatuagemKey],
  }));

  const handleTatuagemChange = (selectedId: string) => {
    console.log('Tatuagem selecionada:', selectedId);
    onChange(selectedId);
  };

  const displayedValue = value
    ? tatuagensTraduzidas[
        Object.keys(tatuagensEmPortugues).find(
          (key) => tatuagensEmPortugues[key as TatuagemKey] === value
        ) as TatuagemKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterT.tattoos')}
      options={tatuagemOptions}
      value={displayedValue}
      onChange={handleTatuagemChange}
      bgColor={bgColor}
      placeholder={t('filterT.select_tattoos')}
    />
  );
};

export default FiltroTatuagem;
