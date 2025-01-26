import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateCabelo } from "../../actions/ProfileActions";
import {useTranslation} from "react-i18next";



const FiltroCabelo: React.FC = () => {
  const {t, i18n} = useTranslation();

  const dispatch = useDispatch();
  const cabeloRedux = useSelector(
    (state: any) => state.profile?.profile?.cabelo || null
  );




  const handleCabeloChange = (newValue: string) => {
    dispatch(updateCabelo(newValue));
  };


  const cabeloOptions = [
    { id: 1, name: t('filter.black'), unavailable: false },
    { id: 2, name: t('filter.blonde'), unavailable: false },
    { id: 3, name: t('filter.brown'), unavailable: false },
    { id: 4, name: t('filter.red'), unavailable: false },
    { id: 5, name: t('filter.other'), unavailable: false },
  ];

  return (
    <CommonFilter
    label={t('filter.hair_color')}
    options={cabeloOptions}
      value={cabeloRedux}
      onChange={handleCabeloChange}
      placeholder={t('filter.select_hair_color')}
    />
  );
};

export default FiltroCabelo;
