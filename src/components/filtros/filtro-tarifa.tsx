import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
  value: number;
}

interface FiltroTarifaProps {
  value: string;
  onChange: (value: string) => void;
  bgColor?: string;
}

type TarifaKey = '50' | '100' | '200' | '500' | 'more_than_500';

const FiltroTarifa: React.FC<FiltroTarifaProps> = ({ value, onChange, bgColor }) => {
  const { t } = useTranslation();

  const tarifasEmValores: Record<TarifaKey, number> = {
    '50': 50,
    '100': 100,
    '200': 200,
    '500': 500,
    'more_than_500': 501,
  };

  const tarifasTraduzidas: Record<TarifaKey, string> = {
    '50': t('tarifa.50'),
    '100': t('tarifa.100'),
    '200': t('tarifa.200'),
    '500': t('tarifa.500'),
    'more_than_500': t('tarifa.more_than_500'),
  };

  const tarifaOptions: FilterOption[] = Object.keys(tarifasEmValores).map((key) => ({
    id: String(tarifasEmValores[key as TarifaKey]),
    name: tarifasTraduzidas[key as TarifaKey],
    value: tarifasEmValores[key as TarifaKey],
  }));

  const handleTarifaChange = (selectedId: string) => {
    console.log('Tarifa selecionada:', selectedId);
    onChange(selectedId);
  };

  const displayedValue = value
    ? tarifasTraduzidas[
        Object.keys(tarifasEmValores).find(
          (key) => tarifasEmValores[key as TarifaKey] === Number(value)
        ) as TarifaKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterTarifa.tarifa')}
      options={tarifaOptions}
      value={displayedValue}
      onChange={handleTarifaChange}
      bgColor={bgColor}
      placeholder={t('filterTarifa.select_tarifa')}
    />
  );
};

export default FiltroTarifa;
