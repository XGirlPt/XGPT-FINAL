import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateCorpo } from "../../actions/ProfileActions";
import { RootState } from "@/store";
import {useTranslation} from "react-i18next";



const FiltroCorpo: React.FC = () => {
    const {t, i18n} = useTranslation();
  
  const dispatch = useDispatch();
  const corpoRedux = useSelector(
    (state: RootState) => state.profile?.profile?.corpo || null
  );

  const handleCorpoChange = (newValue: string) => {
    dispatch(updateCorpo(newValue));
  };

  const corpoOptions = [
    { id: 1, name: t('filter.normal'), unavailable: false },
    { id: 2, name: t('filter.athletic'), unavailable: false },
    { id: 3, name: t('filter.slim'), unavailable: false },
    { id: 4, name: t('filter.curvy'), unavailable: false },
    { id: 5, name: t('filter.xxl'), unavailable: false },
  ];

  return (
    <CommonFilter
    label={t('filter.body')}
    options={corpoOptions}
      value={corpoRedux}
      onChange={handleCorpoChange}
      placeholder={t('filter.select_body')}
    />
  );
};

export default FiltroCorpo;
