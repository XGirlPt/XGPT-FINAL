import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroOlhosProps {
  value: string; // Recebe o valor do react-hook-form
  onChange: (value: string) => void; // Atualiza o valor no react-hook-form
  bgColor?: string;
}

type OlhosKey = 'castanhos' | 'pretos' | 'azuis' | 'verdes';

const FiltroOlhos: React.FC<FiltroOlhosProps> = ({ value, onChange, bgColor }) => {
  const { t } = useTranslation();

  const olhosEmPortugues: Record<OlhosKey, string> = {
    castanhos: 'Castanhos',
    pretos: 'Pretos',
    azuis: 'Azuis',
    verdes: 'Verdes',
  };

  const olhosTraduzidos: Record<OlhosKey, string> = {
    castanhos: t('eyes.brown'),
    pretos: t('eyes.black'),
    azuis: t('eyes.blue'),
    verdes: t('eyes.green'),
  };

  const olhosOptions: FilterOption[] = Object.keys(olhosEmPortugues).map((key) => ({
    id: olhosEmPortugues[key as OlhosKey],
    name: olhosTraduzidos[key as OlhosKey],
  }));

  const handleOlhosChange = (selectedId: string) => {
    console.log('Olhos selecionados:', selectedId);
    onChange(selectedId);
  };

  // Depuração: logar o valor recebido do Redux
  console.log('Valor recebido do Redux (eyes):', value);

  // Encontra o valor traduzido correspondente ao value recebido do Redux (apenas para depuração)
  const displayedValue = value
    ? olhosTraduzidos[
        Object.keys(olhosEmPortugues).find(
          (key) => olhosEmPortugues[key as OlhosKey] === value
        ) as OlhosKey
      ] || value // Fallback para o valor bruto se não encontrar tradução
    : ''; // Valor vazio se não houver valor

  console.log('Valor exibido (displayedValue):', displayedValue);

  return (
    <CommonFilter
      label={t('filterOlhos.eye_color')}
      options={olhosOptions}
      value={value} // Passa o valor bruto do Redux diretamente
      onChange={handleOlhosChange}
      bgColor={bgColor}
      placeholder={t('filterOlhos.select_eye_color')}
    />
  );
};

export default FiltroOlhos;