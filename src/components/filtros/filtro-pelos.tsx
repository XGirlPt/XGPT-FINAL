import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updatePelos } from "../../actions/ProfileActions";
import {useTranslation} from "react-i18next";





const FiltroPelos: React.FC = () => {
          const {t, i18n} = useTranslation();
  
  const dispatch = useDispatch();
  const pelosRedux = useSelector(
    (state: any) => state.profile?.profile?.pelos || null
  );

  const handlePelosChange = (newValue: string) => {
    dispatch(updatePelos(newValue));
  };

  const pelosOptions = [
    { id: 1, name: t('hair_removal.smooth'), unavailable: false },
    { id: 2, name: t('hair_removal.partially_smooth'), unavailable: false },
    { id: 3, name: t('hair_removal.natural'), unavailable: false },
  ];

  return (
    <CommonFilter
    label={t('filterP.hair_removal')}
      options={pelosOptions}
      value={pelosRedux}
      onChange={handlePelosChange}
      placeholder={t('filterP.select_hair_removal')}
      />
  );
};

export default FiltroPelos;
