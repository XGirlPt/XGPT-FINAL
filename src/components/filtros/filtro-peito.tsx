import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateSeios } from "../../actions/ProfileActions";
import {useTranslation} from "react-i18next";



const FiltroPeito: React.FC = () => {
          const {t, i18n} = useTranslation();
  
  const dispatch = useDispatch();
  const seiosRedux = useSelector(
    (state: any) => state.profile?.profile?.seios || null
  );

  const handleSeiosChange = (newValue: string) => {
    dispatch(updateSeios(newValue));
  };


  const peitoOptions = [
    { id: 1, name: t('breast_size.small'), unavailable: false },
    { id: 2, name: t('breast_size.large'), unavailable: false },
    { id: 3, name: t('breast_size.xxl'), unavailable: false },
  ];
  


  return (
    <CommonFilter
    label={t('filterB.breast_size')}
    options={peitoOptions}
    value={seiosRedux}
    onChange={handleSeiosChange}
    placeholder={t('filterB.select_breast_size')}
  />

  );
};

export default FiltroPeito;
