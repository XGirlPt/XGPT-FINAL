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
    onChange(selectedId);
  };

  // Depuração: logar o valor recebido do Redux
  console.log('Valor recebido do Redux (body):', value);

  // Encontra o valor traduzido correspondente ao value recebido do Redux (apenas para depuração)
  const displayedValue = value
    ? corposTraduzidos[
        Object.keys(corposEmPortugues).find(
          (key) => corposEmPortugues[key as CorpoKey] === value
        ) as CorpoKey
      ] || value // Fallback para o valor bruto se não encontrar tradução
    : ''; // Valor vazio se não houver valor

  console.log('Valor exibido (displayedValue):', displayedValue);

  return (
    <CommonFilter
      label={t('filter.body')}
      options={corpoOptions}
      value={value} // Passa o valor bruto do Redux diretamente
      onChange={handleCorpoChange}
      bgColor={bgColor}
      placeholder={t('filter.select_body')}
    />
  );
};

export default FiltroCorpo;