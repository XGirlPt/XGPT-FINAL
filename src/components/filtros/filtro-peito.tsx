import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSeios } from '../../backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import CommonFilter from './common-filter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Valor traduzido para exibição
}

interface FiltroPeitoProps {
  onChange?: (value: string) => void;
  bgColor?: string;
}

type PeitoKey = 'pequeno' | 'grande' | 'xxl';

const FiltroPeito: React.FC<FiltroPeitoProps> = ({ onChange, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const seiosRedux = useSelector((state: { profile?: { profile?: { seios?: string; userUID?: string } } }) =>
    state.profile?.profile?.seios || null
  );
  const userUID = useSelector((state: { profile?: { profile?: { seios?: string; userUID?: string } } }) =>
    state.profile?.profile?.userUID
  );

  // Mapeamento fixo das opções de tamanho de peito em português (Portugal)
  const peitosEmPortugues: Record<PeitoKey, string> = {
    pequeno: 'Pequeno (A-B)',
    grande: 'Grande (C-D)',
    xxl: 'XXL (E+)',
  };

  // Mapeamento dinâmico para exibição com tradução
  const peitosTraduzidos: Record<PeitoKey, string> = {
    pequeno: t('breast_size.small'),
    grande: t('breast_size.large'),
    xxl: t('breast_size.xxl'),
  };

  // Opções para o filtro: id é o valor em português, name é o valor traduzido
  const peitoOptions: FilterOption[] = Object.keys(peitosEmPortugues).map((key) => ({
    id: peitosEmPortugues[key as PeitoKey], // Valor fixo em português
    name: peitosTraduzidos[key as PeitoKey], // Valor traduzido
  }));

  const handleSeiosChange = async (selectedId: string) => {
    const peitoEmPortugues = selectedId; // O valor recebido já é o id em português

    // Atualiza o Redux
    dispatch(updateSeios(peitoEmPortugues));

    if (!userUID) {
      toast.error('Erro: usuário não identificado.');
      return;
    }

    try {
      // Salva no banco de dados
      await updateProfileData({ seios: peitoEmPortugues }, userUID);
      toast.success(t('messages.seiosUpdated'), { position: 'top-right', autoClose: 1000 });

      if (onChange) {
        onChange(peitoEmPortugues); // Passa o valor em português para o formulário
      }
    } catch (error) {
      console.error('Erro ao atualizar tamanho do peito:', error);
      toast.error(t('messages.seiosUpdateError'));
    }
  };

  // Valor exibido é o traduzido correspondente ao tamanho do peito em português no Redux
  const displayedValue = seiosRedux
    ? peitosTraduzidos[
        Object.keys(peitosEmPortugues).find(
          (key) => peitosEmPortugues[key as PeitoKey] === seiosRedux
        ) as PeitoKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterB.breast_size')} // Label traduzido
      options={peitoOptions}
      value={displayedValue} // Exibe o valor traduzido
      onChange={handleSeiosChange}
      bgColor={bgColor}
      placeholder={t('filterB.select_breast_size')} // Placeholder traduzido
    />
  );
};

export default FiltroPeito;