import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroCabeloProps {
  value: string; // Recebe o valor do react-hook-form
  onChange: (value: string) => void; // Atualiza o valor no react-hook-form
  bgColor?: string;
}

type CabeloKey = 'loiro' | 'castanho' | 'preto' | 'ruivo' | 'grisalho';

const FiltroCabelo: React.FC<FiltroCabeloProps> = ({ value, onChange, bgColor }) => {
  const { t } = useTranslation();

  const cabelosEmPortugues: Record<CabeloKey, string> = {
    loiro: 'Loiro',
    castanho: 'Castanho',
    preto: 'Preto',
    ruivo: 'Ruivo',
    grisalho: 'Grisalho',
  };

  const cabelosTraduzidos: Record<CabeloKey, string> = {
    loiro: t('hair.blonde'),
    castanho: t('hair.brown'),
    preto: t('hair.black'),
    ruivo: t('hair.red'),
    grisalho: t('hair.gray'),
  };

  const cabeloOptions: FilterOption[] = Object.keys(cabelosEmPortugues).map((key) => ({
    id: cabelosEmPortugues[key as CabeloKey],
    name: cabelosTraduzidos[key as CabeloKey],
  }));

  const handleCabeloChange = (selectedId: string) => {
    console.log('Cabelo selecionado:', selectedId);
    onChange(selectedId);
  };

  // Depuração: logar o valor recebido do Redux
  console.log('Valor recebido do Redux (hair):', value);

  // Encontra o valor traduzido correspondente ao value recebido do Redux (apenas para depuração)
  const displayedValue = value
    ? cabelosTraduzidos[
        Object.keys(cabelosEmPortugues).find(
          (key) => cabelosEmPortugues[key as CabeloKey] === value
        ) as CabeloKey
      ] || value // Fallback para o valor bruto se não encontrar tradução
    : ''; // Valor vazio se não houver valor


  return (
    <CommonFilter
      label={t('filterCabelo.hair_color')}
      options={cabeloOptions}
      value={value} // Passa o valor bruto do Redux diretamente
      onChange={handleCabeloChange}
      bgColor={bgColor}
      placeholder={t('filterCabelo.select_hair_color')}
    />
  );
};

export default FiltroCabelo;