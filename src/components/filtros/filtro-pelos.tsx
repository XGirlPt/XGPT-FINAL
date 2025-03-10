import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePelos } from '../../backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import CommonFilter from './common-filter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Valor traduzido para exibição
}

interface FiltroPelosProps {
  onChange?: (value: string) => void;
  bgColor?: string;
}

type PelosKey = 'rapadinha' | 'parcialmente' | 'natural';

const FiltroPelos: React.FC<FiltroPelosProps> = ({ onChange, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const pelosRedux = useSelector((state: { profile?: { profile?: { pelos?: string; userUID?: string } } }) =>
    state.profile?.profile?.pelos || null
  );
  const userUID = useSelector((state: { profile?: { profile?: { pelos?: string; userUID?: string } } }) =>
    state.profile?.profile?.userUID
  );

  // Mapeamento fixo das opções de pelos em português (Portugal)
  const pelosEmPortugues: Record<PelosKey, string> = {
    rapadinha: 'rapadinha',
    parcialmente: 'Parcialmente',
    natural: 'Natural',
  };

  // Mapeamento dinâmico para exibição com tradução
  const pelosTraduzidos: Record<PelosKey, string> = {
    rapadinha: t('hair_removal.smooth'),
    parcialmente: t('hair_removal.partially_smooth'),
    natural: t('hair_removal.natural'),
  };

  // Opções para o filtro: id é o valor em português, name é o valor traduzido
  const pelosOptions: FilterOption[] = Object.keys(pelosEmPortugues).map((key) => ({
    id: pelosEmPortugues[key as PelosKey], // Valor fixo em português
    name: pelosTraduzidos[key as PelosKey], // Valor traduzido
  }));

  const handlePelosChange = async (selectedId: string) => {
    const pelosEmPortugues = selectedId; // O valor recebido já é o id em português

    // Atualiza o Redux
    dispatch(updatePelos(pelosEmPortugues));

    if (!userUID) {
      toast.error('Erro: usuário não identificado.');
      return;
    }

    try {
      // Salva no banco de dados
      await updateProfileData({ pelos: pelosEmPortugues }, userUID);
      toast.success(t('messages.pelosUpdated'), { position: 'top-right', autoClose: 1000 });

      if (onChange) {
        onChange(pelosEmPortugues); // Passa o valor em português para o formulário
      }
    } catch (error) {
      console.error('Erro ao atualizar pelos:', error);
      toast.error(t('messages.pelosUpdateError'));
    }
  };

  // Valor exibido é o traduzido correspondente aos pelos em português no Redux
  const displayedValue = pelosRedux
    ? pelosTraduzidos[
        Object.keys(pelosEmPortugues).find(
          (key) => pelosEmPortugues[key as PelosKey] === pelosRedux
        ) as PelosKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterP.hair_removal')} // Label traduzido
      options={pelosOptions}
      value={displayedValue} // Exibe o valor traduzido
      onChange={handlePelosChange}
      bgColor={bgColor}
      placeholder={t('filterP.select_hair_removal')} // Placeholder traduzido
    />
  );
};

export default FiltroPelos;