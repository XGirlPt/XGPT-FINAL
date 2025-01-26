import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateTarifa } from "../../actions/ProfileActions";
import CommonFilter from "./common-filter";

import {useTranslation} from "react-i18next";


interface TarifaOption {
  id: number;
  name: string;
  value: number;
  unavailable: boolean;
}

interface FiltroTarifaProps {
  bgColor?: string;
  buttonPadding?: string;
  rounded?: string;
  onChange?: (value: string) => void;
}

const FiltroTarifa: React.FC<FiltroTarifaProps> = ({
  bgColor = "bg-gray-700",
  buttonPadding = "py-0",
  rounded = "rounded-xl",
  onChange,
}) => {
  const dispatch = useDispatch();
        const {t, i18n} = useTranslation();
  
  const tarifaRedux = useSelector(
    (state: any) => state.profile?.profile?.tarifa || null
  );

  // Function to format the display value
  const getDisplayValue = (value: number | null): string => {
    if (!value) return t('filter.tarifa'); // "Tarifa"
    if (value > 500) return t('tarifa.more_than_500'); // "+ 500€"
    return `${t('tarifa.' + value)}`; // "Starting from 50€", etc.
  };


  const tarifaOptions = [
    { id: 1, name: t('tarifa.50'), value: 50, unavailable: false },
    { id: 2, name: t('tarifa.100'), value: 100, unavailable: false },
    { id: 3, name: t('tarifa.200'), value: 200, unavailable: false },
    { id: 4, name: t('tarifa.500'), value: 500, unavailable: true },
    { id: 5, name: t('tarifa.more_than_500'), value: 501, unavailable: false },
  ];


  // Function to handle tarifa changes
  const handleTarifaChange = (selectedName: string) => {
    const selectedOption = tarifaOptions.find(
      (opt) => opt.name === selectedName
    );
    if (selectedOption) {
      dispatch(updateTarifa(selectedOption.value));
      if (onChange) {
        onChange(String(selectedOption.value));
      }
    }
  };

  return (
    <CommonFilter
    label={t('filterTa.tarifa')}
          options={tarifaOptions}
      value={tarifaRedux ? getDisplayValue(tarifaRedux) : null}
      onChange={handleTarifaChange}
      placeholder={t('filterTa.select_tarifa')} 
      bgColor={bgColor}
      buttonPadding="py-5"
      rounded={rounded}
      iconColor="text-white"
    />
  );
};

export default FiltroTarifa;
