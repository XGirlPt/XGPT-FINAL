import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSigno } from '../../backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import CommonFilter from './common-filter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Valor traduzido para exibição
}

interface FiltroSignoProps {
  onChange?: (value: string) => void;
  bgColor?: string;
}

type SignoKey = 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

const FiltroSigno: React.FC<FiltroSignoProps> = ({ onChange, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const signoRedux = useSelector((state: { profile?: { profile?: { signo?: string; userUID?: string } } }) =>
    state.profile?.profile?.signo || null
  );
  const userUID = useSelector((state: { profile?: { profile?: { signo?: string; userUID?: string } } }) =>
    state.profile?.profile?.userUID
  );

  // Mapeamento fixo dos signos em português (Portugal)
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

  // Mapeamento dinâmico para exibição com tradução
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

  // Opções para o filtro: id é o valor em português, name é o valor traduzido
  const signoOptions: FilterOption[] = Object.keys(signosEmPortugues).map((key) => ({
    id: signosEmPortugues[key as SignoKey], // Valor fixo em português
    name: signosTraduzidos[key as SignoKey], // Valor traduzido
  }));

  const handleSignoChange = async (selectedId: string) => {
    const signoEmPortugues = selectedId; // O valor recebido já é o id em português

    // Atualiza o Redux
    dispatch(updateSigno(signoEmPortugues));

    if (!userUID) {
      toast.error('Erro: usuário não identificado.');
      return;
    }

    try {
      // Salva no banco de dados
      await updateProfileData({ signo: signoEmPortugues }, userUID);
      toast.success(t('messages.signoUpdated'), { position: 'top-right', autoClose: 1000 });

      if (onChange) {
        onChange(signoEmPortugues); // Passa o valor em português para o formulário
      }
    } catch (error) {
      console.error('Erro ao atualizar signo:', error);
      toast.error(t('messages.signoUpdateError'));
    }
  };

  // Valor exibido é o traduzido correspondente ao signo em português no Redux
  const displayedValue = signoRedux
    ? signosTraduzidos[
        Object.keys(signosEmPortugues).find(
          (key) => signosEmPortugues[key as SignoKey] === signoRedux
        ) as SignoKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterTa.signo')} // Label traduzido
      options={signoOptions}
      value={displayedValue} // Exibe o valor traduzido
      onChange={handleSignoChange}
      bgColor={bgColor}
      placeholder={t('filterTa.signo')} // Placeholder traduzido
    />
  );
};

export default FiltroSigno;