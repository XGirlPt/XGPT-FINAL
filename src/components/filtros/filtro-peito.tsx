// components/filtros/filtro-peito.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroPeitoProps {
  value: string; // Recebe o valor do react-hook-form
  onChange: (value: string) => void; // Atualiza o valor no react-hook-form
  bgColor?: string;
}

type PeitoKey = 'pequeno' | 'grande' | 'xxl';

const FiltroPeito: React.FC<FiltroPeitoProps> = ({ value, onChange, bgColor }) => {
  const { t } = useTranslation();

  // Mapeamento fixo das opções de tamanho de peito em português (Portugal)
  const peitosEmPortugues: Record<PeitoKey, string> = {
    pequeno: 'Pequeno (A-B)',
    grande: 'Grande (C-D)',
    xxl: 'XXL (E+)',
  };

  // Mapeamento dinâmico para exibição com tradução
  const peitosTraduzidos: Record<PeitoKey, string> = {
    pequeno: t('breast_size.small'),
    grande: t('breast_size.large'),
    xxl: t('breast_size.xxl'),
  };

  // Opções para o filtro: id é o valor em português, name é o valor traduzido
  const peitoOptions: FilterOption[] = Object.keys(peitosEmPortugues).map((key) => ({
    id: peitosEmPortugues[key as PeitoKey],
    name: peitosTraduzidos[key as PeitoKey],
  }));

  const handlePeitoChange = (selectedId: string) => {
    console.log('Peito selecionado:', selectedId);
    onChange(selectedId); // Apenas atualiza o estado do formulário
  };

  // Valor exibido é o traduzido correspondente ao tamanho do peito em português
  const displayedValue = value
    ? peitosTraduzidos[
        Object.keys(peitosEmPortugues).find(
          (key) => peitosEmPortugues[key as PeitoKey] === value
        ) as PeitoKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterB.breast_size')}
      options={peitoOptions}
      value={value}
      onChange={handlePeitoChange}
      bgColor={bgColor}
      placeholder={t('filterB.select_breast_size')}
    />
  );
};

export default FiltroPeito;