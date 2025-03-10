import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAltura } from '../../backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import CommonFilter from './common-filter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Valor traduzido para exibição
}

interface FiltroAlturaProps {
  onChange?: (value: string) => void;
  bgColor?: string;
}

type AlturaKey = 'menor_160' | 'cerca_165' | 'maior_170';

const FiltroAltura: React.FC<FiltroAlturaProps> = ({ onChange, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const alturaRedux = useSelector((state: { profile?: { profile?: { altura?: string; userUID?: string } } }) =>
    state.profile?.profile?.altura || null
  );
  const userUID = useSelector((state: { profile?: { profile?: { altura?: string; userUID?: string } } }) =>
    state.profile?.profile?.userUID
  );

  // Mapeamento fixo das opções de altura em português (Portugal)
  const alturasEmPortugues: Record<AlturaKey, string> = {
    menor_160: '< 1,60m',
    cerca_165: '+ / - 1,65m',
    maior_170: '> 1,70m',
  };

  // Mapeamento dinâmico para exibição com tradução
  const alturasTraduzidas: Record<AlturaKey, string> = {
    menor_160: t('height.less_than_160'),
    cerca_165: t('height.around_165'),
    maior_170: t('height.more_than_170'),
  };

  // Opções para o filtro: id é o valor em português, name é o valor traduzido
  const alturaOptions: FilterOption[] = Object.keys(alturasEmPortugues).map((key) => ({
    id: alturasEmPortugues[key as AlturaKey], // Valor fixo em português
    name: alturasTraduzidas[key as AlturaKey], // Valor traduzido
  }));

  const handleAlturaChange = async (selectedId: string) => {
    const alturaEmPortugues = selectedId; // O valor recebido já é o id em português

    // Atualiza o Redux
    dispatch(updateAltura(alturaEmPortugues));

    if (!userUID) {
      toast.error('Erro: usuário não identificado.');
      return;
    }

    try {
      // Salva no banco de dados
      await updateProfileData({ altura: alturaEmPortugues }, userUID);
      toast.success(t('messages.alturaUpdated'), { position: 'top-right', autoClose: 1000 });

      if (onChange) {
        onChange(alturaEmPortugues); // Passa o valor em português para o formulário
      }
    } catch (error) {
      console.error('Erro ao atualizar altura:', error);
      toast.error(t('messages.alturaUpdateError'));
    }
  };

  // Valor exibido é o traduzido correspondente à altura em português no Redux
  const displayedValue = alturaRedux
    ? alturasTraduzidas[
        Object.keys(alturasEmPortugues).find(
          (key) => alturasEmPortugues[key as AlturaKey] === alturaRedux
        ) as AlturaKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filter.height')} // Label traduzido
      options={alturaOptions}
      value={displayedValue} // Exibe o valor traduzido
      onChange={handleAlturaChange}
      bgColor={bgColor}
      placeholder={t('filter.select_height')} // Placeholder traduzido
    />
  );
};

export default FiltroAltura;