import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateMamas } from "../../actions/ProfileActions";
import {useTranslation} from "react-i18next";


interface FiltroMamasProps {
  onChange?: (value: string) => void;
}

const FiltroMamas: React.FC<FiltroMamasProps> = ({ onChange }) => {
        const {t, i18n} = useTranslation();
  
  const dispatch = useDispatch();
  const mamasRedux = useSelector(
    (state: any) => state.profile?.profile?.mamas || null
  );

  const handleMamasChange = (newValue: string) => {
    dispatch(updateMamas(newValue));
    if (onChange) onChange(newValue);
  };


const mamasOptions = [
  { id: 1, name: t('breasts.natural'), unavailable: false },
  { id: 2, name: t('breasts.silicone'), unavailable: false },
];

  return (
    <CommonFilter
    label={t('filterB.breasts')}
      options={mamasOptions}
      value={mamasRedux}
      onChange={handleMamasChange}
      placeholder={t('filterB.select_breasts')}
      />
  );
};

export default FiltroMamas;
