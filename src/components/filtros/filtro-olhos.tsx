import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOlhos } from '../../backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import CommonFilter from './common-filter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Valor traduzido para exibição
}

interface FiltroOlhosProps {
  onChange?: (value: string) => void;
  bgColor?: string;
}

type OlhosKey = 'castanhos' | 'pretos' | 'azuis' | 'verdes';

const FiltroOlhos: React.FC<FiltroOlhosProps> = ({ onChange, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const olhosRedux = useSelector((state: { profile?: { profile?: { olhos?: string; userUID?: string } } }) =>
    state.profile?.profile?.olhos || null
  );
  const userUID = useSelector((state: { profile?: { profile?: { olhos?: string; userUID?: string } } }) =>
    state.profile?.profile?.userUID
  );

  // Mapeamento fixo das opções de olhos em português (Portugal)
  const olhosEmPortugues: Record<OlhosKey, string> = {
    castanhos: 'Castanhos',
    pretos: 'Pretos',
    azuis: 'Azuis',
    verdes: 'Verdes',
  };

  // Mapeamento dinâmico para exibição com tradução
  const olhosTraduzidos: Record<OlhosKey, string> = {
    castanhos: t('eyes.brown'),
    pretos: t('eyes.black'),
    azuis: t('eyes.blue'),
    verdes: t('eyes.green'),
  };

  // Opções para o filtro: id é o valor em português, name é o valor traduzido
  const olhosOptions: FilterOption[] = Object.keys(olhosEmPortugues).map((key) => ({
    id: olhosEmPortugues[key as OlhosKey], // Valor fixo em português
    name: olhosTraduzidos[key as OlhosKey], // Valor traduzido
  }));

  const handleOlhosChange = async (selectedId: string) => {
    const olhosEmPortugues = selectedId; // O valor recebido já é o id em português

    // Atualiza o Redux
    dispatch(updateOlhos(olhosEmPortugues));

    if (!userUID) {
      toast.error('Erro: usuário não identificado.');
      return;
    }

    try {
      // Salva no banco de dados
      await updateProfileData({ olhos: olhosEmPortugues }, userUID);
      toast.success(t('messages.olhosUpdated'), { position: 'top-right', autoClose: 1000 });

      if (onChange) {
        onChange(olhosEmPortugues); // Passa o valor em português para o formulário
      }
    } catch (error) {
      console.error('Erro ao atualizar olhos:', error);
      toast.error(t('messages.olhosUpdateError'));
    }
  };

  // Valor exibido é o traduzido correspondente aos olhos em português no Redux
  const displayedValue = olhosRedux
    ? olhosTraduzidos[
        Object.keys(olhosEmPortugues).find(
          (key) => olhosEmPortugues[key as OlhosKey] === olhosRedux
        ) as OlhosKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterOlhos.eye_color')} // Label traduzido (ajustado para consistência)
      options={olhosOptions}
      value={displayedValue} // Exibe o valor traduzido
      onChange={handleOlhosChange}
      bgColor={bgColor}
      placeholder={t('filter.select_eye_color')} // Placeholder traduzido (ajustado para consistência)
    />
  );
};

export default FiltroOlhos;