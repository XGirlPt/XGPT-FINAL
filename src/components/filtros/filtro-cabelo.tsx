import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCabelo } from '../../backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import CommonFilter from './common-filter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Valor traduzido para exibição
}

interface FiltroCabeloProps {
  onChange?: (value: string) => void;
  bgColor?: string;
}

type CabeloKey = 'preto' | 'loiro' | 'castanho' | 'ruivo' | 'outro';

const FiltroCabelo: React.FC<FiltroCabeloProps> = ({ onChange, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const cabeloRedux = useSelector((state: { profile?: { profile?: { cabelo?: string; userUID?: string } } }) =>
    state.profile?.profile?.cabelo || null
  );
  const userUID = useSelector((state: { profile?: { profile?: { cabelo?: string; userUID?: string } } }) =>
    state.profile?.profile?.userUID
  );

  // Mapeamento fixo das opções de cabelo em português (Portugal)
  const cabelosEmPortugues: Record<CabeloKey, string> = {
    preto: 'Preto',
    loiro: 'Loiro',
    castanho: 'Castanho',
    ruivo: 'Ruivo',
    outro: 'Outro',
  };

  // Mapeamento dinâmico para exibição com tradução
  const cabelosTraduzidos: Record<CabeloKey, string> = {
    preto: t('hair.black'),
    loiro: t('hair.blonde'),
    castanho: t('hair.brown'),
    ruivo: t('hair.red'),
    outro: t('hair.other'),
  };

  // Opções para o filtro: id é o valor em português, name é o valor traduzido
  const cabeloOptions: FilterOption[] = Object.keys(cabelosEmPortugues).map((key) => ({
    id: cabelosEmPortugues[key as CabeloKey], // Valor fixo em português
    name: cabelosTraduzidos[key as CabeloKey], // Valor traduzido
  }));

  const handleCabeloChange = async (selectedId: string) => {
    const cabeloEmPortugues = selectedId; // O valor recebido já é o id em português

    // Atualiza o Redux
    dispatch(updateCabelo(cabeloEmPortugues));

    if (!userUID) {
      toast.error('Erro: usuário não identificado.');
      return;
    }

    try {
      // Salva no banco de dados
      await updateProfileData({ cabelo: cabeloEmPortugues }, userUID);
      toast.success(t('messages.cabeloUpdated'), { position: 'top-right', autoClose: 1000 });

      if (onChange) {
        onChange(cabeloEmPortugues); // Passa o valor em português para o formulário
      }
    } catch (error) {
      console.error('Erro ao atualizar cabelo:', error);
      toast.error(t('messages.cabeloUpdateError'));
    }
  };

  // Valor exibido é o traduzido correspondente ao cabelo em português no Redux
  const displayedValue = cabeloRedux
    ? cabelosTraduzidos[
        Object.keys(cabelosEmPortugues).find(
          (key) => cabelosEmPortugues[key as CabeloKey] === cabeloRedux
        ) as CabeloKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filter.hair_color')} // Label traduzido
      options={cabeloOptions}
      value={displayedValue} // Exibe o valor traduzido
      onChange={handleCabeloChange}
      bgColor={bgColor}
      placeholder={t('filter.select_hair_color')} // Placeholder traduzido
    />
  );
};

export default FiltroCabelo;