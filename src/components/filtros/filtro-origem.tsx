import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrigem } from '../../backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import CommonFilter from './common-filter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Valor traduzido para exibição
}

interface FiltroOrigemProps {
  onChange?: (value: string) => void;
  bgColor?: string;
}

type OrigemKey = 'portuguesa' | 'brasileira' | 'espanhola' | 'africana' | 'latina' | 'oriental';

const FiltroOrigem: React.FC<FiltroOrigemProps> = ({ onChange, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const origemRedux = useSelector((state: { profile?: { profile?: { origem?: string; userUID?: string } } }) =>
    state.profile?.profile?.origem || null
  );
  const userUID = useSelector((state: { profile?: { profile?: { origem?: string; userUID?: string } } }) =>
    state.profile?.profile?.userUID
  );

  // Mapeamento fixo das opções de origem em português (Portugal)
  const origensEmPortugues: Record<OrigemKey, string> = {
    portuguesa: 'Portuguesa',
    brasileira: 'Brasileira',
    espanhola: 'Espanhola',
    africana: 'Africana',
    latina: 'Latina',
    oriental: 'Oriental',
  };

  // Mapeamento dinâmico para exibição com tradução
  const origensTraduzidas: Record<OrigemKey, string> = {
    portuguesa: t('origin.portuguese'),
    brasileira: t('origin.brazilian'),
    espanhola: t('origin.spanish'),
    africana: t('origin.african'),
    latina: t('origin.latin'),
    oriental: t('origin.oriental'),
  };

  // Opções para o filtro: id é o valor em português, name é o valor traduzido
  const origemOptions: FilterOption[] = Object.keys(origensEmPortugues).map((key) => ({
    id: origensEmPortugues[key as OrigemKey], // Valor fixo em português
    name: origensTraduzidas[key as OrigemKey], // Valor traduzido
  }));

  const handleOrigemChange = async (selectedId: string) => {
    const origemEmPortugues = selectedId; // O valor recebido já é o id em português

    // Atualiza o Redux
    dispatch(updateOrigem(origemEmPortugues));

    if (!userUID) {
      toast.error('Erro: usuário não identificado.');
      return;
    }

    try {
      // Salva no banco de dados
      await updateProfileData({ origem: origemEmPortugues }, userUID);
      toast.success(t('messages.origemUpdated'), { position: 'top-right', autoClose: 1000 });

      if (onChange) {
        onChange(origemEmPortugues); // Passa o valor em português para o formulário
      }
    } catch (error) {
      console.error('Erro ao atualizar origem:', error);
      toast.error(t('messages.origemUpdateError'));
    }
  };

  // Valor exibido é o traduzido correspondente à origem em português no Redux
  const displayedValue = origemRedux
    ? origensTraduzidas[
        Object.keys(origensEmPortugues).find(
          (key) => origensEmPortugues[key as OrigemKey] === origemRedux
        ) as OrigemKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filter.origin')} // Label traduzido
      options={origemOptions}
      value={displayedValue} // Exibe o valor traduzido
      onChange={handleOrigemChange}
      bgColor={bgColor}
      placeholder={t('filter.select_origin')} // Placeholder traduzido
    />
  );
};

export default FiltroOrigem;