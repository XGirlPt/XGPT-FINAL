import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonFilter from './common-filter';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltroSignoProps {
  value: string;
  onChange: (value: string) => void;
  bgColor?: string;
}

type SignoKey = 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

const FiltroSigno: React.FC<FiltroSignoProps> = ({ value, onChange, bgColor }) => {
  const { t } = useTranslation();

  const signosEmPortugues: Record<SignoKey, string> = {
    aries: 'Carneiro',
    taurus: 'Touro',
    gemini: 'Gémeos',
    cancer: 'Caranguejo',
    leo: 'Leão',
    virgo: 'Virgem',
    libra: 'Balança',
    scorpio: 'Escorpião',
    sagittarius: 'Sagitário',
    capricorn: 'Capricórnio',
    aquarius: 'Aquário',
    pisces: 'Peixes',
  };

  const signosTraduzidos: Record<SignoKey, string> = {
    aries: t('zodiac.aries'),
    taurus: t('zodiac.taurus'),
    gemini: t('zodiac.gemini'),
    cancer: t('zodiac.cancer'),
    leo: t('zodiac.leo'),
    virgo: t('zodiac.virgo'),
    libra: t('zodiac.libra'),
    scorpio: t('zodiac.scorpio'),
    sagittarius: t('zodiac.sagittarius'),
    capricorn: t('zodiac.capricorn'),
    aquarius: t('zodiac.aquarius'),
    pisces: t('zodiac.pisces'),
  };

  const signoOptions: FilterOption[] = Object.keys(signosEmPortugues).map((key) => ({
    id: signosEmPortugues[key as SignoKey],
    name: signosTraduzidos[key as SignoKey],
  }));

  const handleSignoChange = (selectedId: string) => {
    console.log('Signo selecionado:', selectedId);
    onChange(selectedId);
  };

  const displayedValue = value
    ? signosTraduzidos[
        Object.keys(signosEmPortugues).find(
          (key) => signosEmPortugues[key as SignoKey] === value
        ) as SignoKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterS.zodiac')}
      options={signoOptions}
      value={value}
      onChange={handleSignoChange}
      bgColor={bgColor}
      placeholder={t('filterS.select_zodiac')}
    />
  );
};

export default FiltroSigno;
