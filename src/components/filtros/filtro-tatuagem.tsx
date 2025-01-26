import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateTatuagem } from "../../actions/ProfileActions";
import {useTranslation} from "react-i18next";



interface FiltrosState {
  tatuagem?: string[];
}

interface FiltroTatuagemProps {
  setFiltros?: React.Dispatch<React.SetStateAction<FiltrosState>>;
}

const FiltroTatuagem: React.FC<FiltroTatuagemProps> = ({ setFiltros }) => {
          const {t, i18n} = useTranslation();
  
  const dispatch = useDispatch();
  const tatuagemRedux = useSelector(
    (state: any) => state.profile?.profile?.tatuagem || null
  );

  const handleTatuagemChange = (newValue: string) => {
    dispatch(updateTatuagem(newValue));
    // Update filtros state if setFiltros is provided
    if (setFiltros) {
      setFiltros((prev) => ({
        ...prev,
        tatuagem: [newValue],
      }));
    }
  };


  const tatuagemOptions = [
    { id: 1, name: t('tattoos.with_tattoos'), unavailable: false },
    { id: 2, name: t('tattoos.without_tattoos'), unavailable: false },
  ];

  return (
    <CommonFilter
    label={t('filterT.tattoos')}
      options={tatuagemOptions}
      value={tatuagemRedux}
      onChange={handleTatuagemChange}
      placeholder={t('filterT.select_tattoos')}
      />
  );
};

export default FiltroTatuagem;
