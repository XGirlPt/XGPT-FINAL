import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateOlhos } from "../../actions/ProfileActions";
import {useTranslation} from "react-i18next";


const FiltroOlhos: React.FC = () => {
      const {t, i18n} = useTranslation();
  
  const dispatch = useDispatch();
  const olhosRedux = useSelector(
    (state: any) => state.profile?.profile?.olhos || null
  );

  const handleOlhosChange = (newValue: string) => {
    dispatch(updateOlhos(newValue));
  };


  const olhosOptions = [
    { id: 1, name: t('filter.eyes.brown'), unavailable: false },
    { id: 2, name: t('filter.eyes.black'), unavailable: false },
    { id: 3, name: t('filter.eyes.blue'), unavailable: false },
    { id: 4, name: t('filter.eyes.green'), unavailable: false },
  ];

  return (
    <CommonFilter
    label={t('filter.filter.eye_color')}
    options={olhosOptions}
      value={olhosRedux}
      onChange={handleOlhosChange}
      placeholder={t('filter.filter.select_eye_color')}
      />
  );
};

export default FiltroOlhos;
