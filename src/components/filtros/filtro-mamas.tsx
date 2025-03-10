import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMamas } from '../../backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import CommonFilter from './common-filter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Valor traduzido para exibição
}

interface FiltroMamasProps {
  onChange?: (value: string) => void;
  bgColor?: string;
}

type MamasKey = 'natural' | 'silicone';

const FiltroMamas: React.FC<FiltroMamasProps> = ({ onChange, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const mamasRedux = useSelector((state: { profile?: { profile?: { mamas?: string; userUID?: string } } }) =>
    state.profile?.profile?.mamas || null
  );
  const userUID = useSelector((state: { profile?: { profile?: { mamas?: string; userUID?: string } } }) =>
    state.profile?.profile?.userUID
  );

  // Mapeamento fixo das opções de mamas em português (Portugal)
  const mamasEmPortugues: Record<MamasKey, string> = {
    natural: 'Natural',
    silicone: 'Silicone',
  };

  // Mapeamento dinâmico para exibição com tradução
  const mamasTraduzidas: Record<MamasKey, string> = {
    natural: t('breasts.natural'),
    silicone: t('breasts.silicone'),
  };

  // Opções para o filtro: id é o valor em português, name é o valor traduzido
  const mamasOptions: FilterOption[] = Object.keys(mamasEmPortugues).map((key) => ({
    id: mamasEmPortugues[key as MamasKey], // Valor fixo em português
    name: mamasTraduzidas[key as MamasKey], // Valor traduzido
  }));

  const handleMamasChange = async (selectedId: string) => {
    const mamasEmPortugues = selectedId; // O valor recebido já é o id em português

    // Atualiza o Redux
    dispatch(updateMamas(mamasEmPortugues));

    if (!userUID) {
      toast.error('Erro: usuário não identificado.');
      return;
    }

    try {
      // Salva no banco de dados
      await updateProfileData({ mamas: mamasEmPortugues }, userUID);
      toast.success(t('messages.mamasUpdated'), { position: 'top-right', autoClose: 1000 });

      if (onChange) {
        onChange(mamasEmPortugues); // Passa o valor em português para o formulário
      }
    } catch (error) {
      console.error('Erro ao atualizar mamas:', error);
      toast.error(t('messages.mamasUpdateError'));
    }
  };

  // Valor exibido é o traduzido correspondente às mamas em português no Redux
  const displayedValue = mamasRedux
    ? mamasTraduzidas[
        Object.keys(mamasEmPortugues).find(
          (key) => mamasEmPortugues[key as MamasKey] === mamasRedux
        ) as MamasKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterB.breasts')} // Label traduzido
      options={mamasOptions}
      value={displayedValue} // Exibe o valor traduzido
      onChange={handleMamasChange}
      bgColor={bgColor}
      placeholder={t('filterB.select_breasts')} // Placeholder traduzido
    />
  );
};

export default FiltroMamas;