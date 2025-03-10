import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCorpo } from '../../backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import CommonFilter from './common-filter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Valor traduzido para exibição
}

interface FiltroCorpoProps {
  onChange?: (value: string) => void;
  bgColor?: string;
}

type CorpoKey = 'normal' | 'atletico' | 'magro' | 'curvilineo' | 'xxl';

const FiltroCorpo: React.FC<FiltroCorpoProps> = ({ onChange, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const corpoRedux = useSelector((state: { profile?: { profile?: { corpo?: string; userUID?: string } } }) =>
    state.profile?.profile?.corpo || null
  );
  const userUID = useSelector((state: { profile?: { profile?: { corpo?: string; userUID?: string } } }) =>
    state.profile?.profile?.userUID
  );

  // Mapeamento fixo das opções de corpo em português (Portugal)
  const corposEmPortugues: Record<CorpoKey, string> = {
    normal: 'Normal',
    atletico: 'Atlética',
    magro: 'Magro',
    curvilineo: 'Curvilínea',
    xxl: 'XXL',
  };

  // Mapeamento dinâmico para exibição com tradução
  const corposTraduzidos: Record<CorpoKey, string> = {
    normal: t('filter.normal'),
    atletico: t('filter.athletic'),
    magro: t('filter.slim'),
    curvilineo: t('filter.curvy'),
    xxl: t('filter.xxl'),
  };

  // Opções para o filtro: id é o valor em português, name é o valor traduzido
  const corpoOptions: FilterOption[] = Object.keys(corposEmPortugues).map((key) => ({
    id: corposEmPortugues[key as CorpoKey], // Valor fixo em português
    name: corposTraduzidos[key as CorpoKey], // Valor traduzido
  }));

  const handleCorpoChange = async (selectedId: string) => {
    const corpoEmPortugues = selectedId; // O valor recebido já é o id em português

    // Atualiza o Redux
    dispatch(updateCorpo(corpoEmPortugues));

    if (!userUID) {
      toast.error('Erro: usuário não identificado.');
      return;
    }

    try {
      // Salva no banco de dados
      await updateProfileData({ corpo: corpoEmPortugues }, userUID);
      toast.success(t('messages.corpoUpdated'), { position: 'top-right', autoClose: 1000 });

      if (onChange) {
        onChange(corpoEmPortugues); // Passa o valor em português para o formulário
      }
    } catch (error) {
      console.error('Erro ao atualizar corpo:', error);
      toast.error(t('messages.corpoUpdateError'));
    }
  };

  // Valor exibido é o traduzido correspondente ao corpo em português no Redux
  const displayedValue = corpoRedux
    ? corposTraduzidos[
        Object.keys(corposEmPortugues).find(
          (key) => corposEmPortugues[key as CorpoKey] === corpoRedux
        ) as CorpoKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filter.body')} // Label traduzido
      options={corpoOptions}
      value={displayedValue} // Exibe o valor traduzido
      onChange={handleCorpoChange}
      bgColor={bgColor}
      placeholder={t('filter.select_body')} // Placeholder traduzido
    />
  );
};

export default FiltroCorpo;