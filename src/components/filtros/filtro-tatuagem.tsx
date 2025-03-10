import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTatuagem } from '../../backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import CommonFilter from './common-filter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Valor traduzido para exibição
}

interface FiltroTatuagemProps {
  onChange?: (value: string) => void; // Alterado para ser consistente com FiltroSigno
  bgColor?: string;
}

type TatuagemKey = 'com_tatuagens' | 'sem_tatuagens';

const FiltroTatuagem: React.FC<FiltroTatuagemProps> = ({ onChange, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const tatuagemRedux = useSelector((state: { profile?: { profile?: { tatuagem?: string; userUID?: string } } }) =>
    state.profile?.profile?.tatuagem || null
  );
  const userUID = useSelector((state: { profile?: { profile?: { tatuagem?: string; userUID?: string } } }) =>
    state.profile?.profile?.userUID
  );

  // Mapeamento fixo das opções de tatuagem em português (Portugal)
  const tatuagensEmPortugues: Record<TatuagemKey, string> = {
    com_tatuagens: 'Com tatuagens',
    sem_tatuagens: 'Sem tatuagens',
  };

  // Mapeamento dinâmico para exibição com tradução
  const tatuagensTraduzidas: Record<TatuagemKey, string> = {
    com_tatuagens: t('tattoos.with_tattoos'),
    sem_tatuagens: t('tattoos.without_tattoos'),
  };

  // Opções para o filtro: id é o valor em português, name é o valor traduzido
  const tatuagemOptions: FilterOption[] = Object.keys(tatuagensEmPortugues).map((key) => ({
    id: tatuagensEmPortugues[key as TatuagemKey], // Valor fixo em português
    name: tatuagensTraduzidas[key as TatuagemKey], // Valor traduzido
  }));

  const handleTatuagemChange = async (selectedId: string) => {
    const tatuagemEmPortugues = selectedId; // O valor recebido já é o id em português

    // Atualiza o Redux
    dispatch(updateTatuagem(tatuagemEmPortugues));

    if (!userUID) {
      toast.error('Erro: usuário não identificado.');
      return;
    }

    try {
      // Salva no banco de dados
      await updateProfileData({ tatuagem: tatuagemEmPortugues }, userUID);
      toast.success(t('messages.tatuagemUpdated'), { position: 'top-right', autoClose: 1000 });

      if (onChange) {
        onChange(tatuagemEmPortugues); // Passa o valor em português para o formulário
      }
    } catch (error) {
      console.error('Erro ao atualizar tatuagem:', error);
      toast.error(t('messages.tatuagemUpdateError'));
    }
  };

  // Valor exibido é o traduzido correspondente ao tatuagem em português no Redux
  const displayedValue = tatuagemRedux
    ? tatuagensTraduzidas[
        Object.keys(tatuagensEmPortugues).find(
          (key) => tatuagensEmPortugues[key as TatuagemKey] === tatuagemRedux
        ) as TatuagemKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterT.tattoos')} // Label traduzido
      options={tatuagemOptions}
      value={displayedValue} // Exibe o valor traduzido
      onChange={handleTatuagemChange}
      bgColor={bgColor}
      placeholder={t('filterT.select_tattoos')} // Placeholder traduzido
    />
  );
};

export default FiltroTatuagem;