import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSigno } from "../../actions/ProfileActions";
import CommonFilter from "./common-filter";
import { useTranslation } from "react-i18next";

const FiltroSigno: React.FC = () => {
  const { t } = useTranslation();

  const signoOptions = useMemo(
    () => [
      { id: 1, name: t('zodiac.aries'), unavailable: false },
      { id: 2, name: t('zodiac.taurus'), unavailable: false },
      { id: 3, name: t('zodiac.gemini'), unavailable: false },
      { id: 4, name: t('zodiac.cancer'), unavailable: false },
      { id: 5, name: t('zodiac.leo'), unavailable: false },
      { id: 6, name: t('zodiac.virgo'), unavailable: false },
      { id: 7, name: t('zodiac.libra'), unavailable: false },
      { id: 8, name: t('zodiac.scorpio'), unavailable: false },
      { id: 9, name: t('zodiac.sagittarius'), unavailable: false },
      { id: 10, name: t('zodiac.capricorn'), unavailable: false },
      { id: 11, name: t('zodiac.aquarius'), unavailable: false },
      { id: 12, name: t('zodiac.pisces'), unavailable: false },
    ],
    [t] // Recalcula somente se `t` mudar
  );

  const dispatch = useDispatch();
  const signoRedux = useSelector(
    (state: any) => state.profile?.profile?.signo || null
  );

  const handleSignoChange = (newValue: string) => {
    dispatch(updateSigno(newValue));
  };

  return (
    <CommonFilter
      label={t('filter.height')}
      options={signoOptions}
      value={signoRedux}
      onChange={handleSignoChange}
      placeholder={t('filter.select_signo')}
    />
  );
};

export default FiltroSigno;
