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
    onChange(selectedId);
  };

  // Depuração: logar o valor recebido do Redux
  console.log('Valor recebido do Redux (breasts):', value);

  // Encontra o valor traduzido correspondente ao value recebido do Redux (apenas para depuração)
  const displayedValue = value
    ? mamasTraduzidas[
        Object.keys(mamasEmPortugues).find(
          (key) => mamasEmPortugues[key as MamasKey] === value
        ) as MamasKey
      ] || value // Fallback para o valor bruto se não encontrar tradução
    : ''; // Valor vazio se não houver valor

  console.log('Valor exibido (displayedValue):', displayedValue);

  return (
    <CommonFilter
      label={t('filterBreast.breasts')}
      options={mamasOptions}
      value={value} // Passa o valor bruto do Redux diretamente
      onChange={handleMamasChange}
      bgColor={bgColor}
      placeholder={t('filterBreast.select_breasts')}
    />
  );
};

export default FiltroMamas;