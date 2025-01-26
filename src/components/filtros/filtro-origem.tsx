

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "./common-filter";
import { updateOrigem } from "../../actions/ProfileActions";
import {useTranslation} from "react-i18next";


const FiltroOrigem: React.FC = () => {
      const {t, i18n} = useTranslation();
  
  const dispatch = useDispatch();
  const origemRedux = useSelector(
    (state: any) => state.profile?.profile?.origem || null
  );

  const handleOrigemChange = (newValue: string) => {
    dispatch(updateOrigem(newValue));
  };




const origemOptions = [
  { id: 1, name: "Portuguesa", unavailable: false },
  { id: 2, name: "Brasileira", unavailable: false },
  { id: 3, name: "Espanhola", unavailable: false },
  { id: 4, name: "Africana", unavailable: false },
  { id: 5, name: "Latina", unavailable: false },
  { id: 6, name: "Oriental", unavailable: false },
];

return (
  <CommonFilter
  label={t('filter.filter.origin')}
  options={origemOptions}
    value={origemRedux}
    onChange={handleOrigemChange}
    placeholder={t('filter.filter.select_origin')}
    />
);
};

export default FiltroOrigem;