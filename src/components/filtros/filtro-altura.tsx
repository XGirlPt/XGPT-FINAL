import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroAlturaProps {
  value: string;
  onChange: (value: string) => void;
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
    onChange(selectedId);
  };

  // Depuração: logar o valor recebido do Redux
  console.log('Valor recebido do Redux (height):', value);

  // Encontra o valor traduzido correspondente ao value recebido do Redux
  const displayedValue = value
    ? alturasTraduzidas[
        Object.keys(alturasEmPortugues).find(
          (key) => alturasEmPortugues[key as AlturaKey] === value
        ) as AlturaKey
      ] || value // Fallback para o valor bruto se não encontrar tradução
    : ''; // Valor vazio se não houver valor

  console.log('Valor exibido (displayedValue):', displayedValue);

  return (
    <CommonFilter
      label={t('filterAltura.height')}
      options={alturaOptions}
      value={value}
      onChange={handleAlturaChange}
      bgColor={bgColor}
      placeholder={t('filterAltura.select_height')}
    />
  );
};

export default FiltroAltura;