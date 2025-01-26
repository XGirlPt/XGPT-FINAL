import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAltura } from "../../actions/ProfileActions";
import CommonFilter from "./common-filter";
import {useTranslation} from "react-i18next";


const alturaOptions = [
  { id: 1, name: "< 1,60m", unavailable: false },
  { id: 2, name: "+ / - 1,65m", unavailable: false },
  { id: 3, name: "> 1,70m", unavailable: false },
];

const FiltroAltura: React.FC = () => {
  const {t, i18n} = useTranslation();

  const dispatch = useDispatch();
  const alturaRedux = useSelector(
    (state: any) => state.profile?.profile?.altura || null
  );

  const handleAlturaChange = (newValue: string) => {
    dispatch(updateAltura(newValue));
  };

  return (
    <CommonFilter
    label={t('filter.height')}
      options={alturaOptions}
      value={alturaRedux}
      onChange={handleAlturaChange}
      placeholder={t('filter.select_height')}
      />
  );
};

export default FiltroAltura;







// const signoOptions = [
//   { id: 1, name: t('zodiac.aries'), unavailable: false },
//   { id: 2, name: t('zodiac.taurus'), unavailable: false },
//   { id: 3, name: t('zodiac.gemini'), unavailable: false },
//   { id: 4, name: t('zodiac.cancer'), unavailable: false },
//   { id: 5, name: t('zodiac.leo'), unavailable: false },
//   { id: 6, name: t('zodiac.virgo'), unavailable: false },
//   { id: 7, name: t('zodiac.libra'), unavailable: false },
//   { id: 8, name: t('zodiac.scorpio'), unavailable: false },
//   { id: 9, name: t('zodiac.sagittarius'), unavailable: false },
//   { id: 10, name: t('zodiac.capricorn'), unavailable: false },
//   { id: 11, name: t('zodiac.aquarius'), unavailable: false },
//   { id: 12, name: t('zodiac.pisces'), unavailable: false },
// ];