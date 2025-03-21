// FiltroDistrito.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonFilter from './common-filter';
import { updateDistrito, } from '@/backend/reducers/profileSlice';
import { updateProfileData } from '@/backend/services/profileService';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Mesmo valor fixo em português para exibição
}

interface FiltroDistritoProps {
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
  bgColor?: string;
}

type DistritoKey =
  | 'lisboa'
  | 'porto'
  | 'aveiro'
  | 'beja'
  | 'braganca'
  | 'braga'
  | 'casteloBranco'
  | 'coimbra'
  | 'evora'
  | 'guarda'
  | 'leiria'
  | 'santarem'
  | 'setubal'
  | 'vianaDoCastelo'
  | 'vilaReal'
  | 'viseu'
  | 'madeira'
  | 'acores';

const FiltroDistrito: React.FC<FiltroDistritoProps> = ({ onChange, value, disabled, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const distritoRedux = useSelector(
    (state: { profile?: { profile?: { distrito?: string; userUID?: string } } }) =>
      state.profile?.profile?.distrito || ''
  );
  const userUID = useSelector(
    (state: { profile?: { profile?: { distrito?: string; userUID?: string } } }) =>
      state.profile?.profile?.userUID
  );

  // Mapeamento fixo dos distritos em português (Portugal)
  const distritosEmPortugues: Record<DistritoKey, string> = {
    lisboa: 'Lisboa',
    porto: 'Porto',
    aveiro: 'Aveiro',
    beja: 'Beja',
    braganca: 'Bragança',
    braga: 'Braga',
    casteloBranco: 'Castelo Branco',
    coimbra: 'Coimbra',
    evora: 'Évora',
    guarda: 'Guarda',
    leiria: 'Leiria',
    santarem: 'Santarém',
    setubal: 'Setúbal',
    vianaDoCastelo: 'Viana do Castelo',
    vilaReal: 'Vila Real',
    viseu: 'Viseu',
    madeira: 'Madeira',
    acores: 'Açores',
  };

  // Opções para o filtro: id e name são o mesmo valor em português
  const distritoOptions: FilterOption[] = Object.keys(distritosEmPortugues).map((key) => ({
    id: distritosEmPortugues[key as DistritoKey], // Valor fixo em português
    name: distritosEmPortugues[key as DistritoKey], // Mesmo valor em português para exibição
  }));

  const handleDistritoChange = async (selectedId: string) => {
    const distritoEmPortugues = selectedId; // O valor recebido já é o id em português

    // Atualiza o Redux
    dispatch(updateDistrito(distritoEmPortugues));

    if (!userUID) {
      toast.error('Erro: usuário não identificado.');
      return;
    }

    try {
      // Salva no banco de dados
      await updateProfileData({ distrito: distritoEmPortugues }, userUID);
      toast.success(t('messages.distritoUpdated'), { position: 'top-right', autoClose: 1000 });

      if (onChange) {
        onChange(distritoEmPortugues); // Passa o valor em português para o formulário
      }
    } catch (error) {
      console.error('Erro ao atualizar distrito:', error);
      toast.error(t('messages.distritoUpdateError'));
    }
  };

  return (
    <CommonFilter
      label={t('filter.district')} // Label traduzido
      options={distritoOptions}
      value={value || distritoRedux} // Prioriza o valor do formulário, fallback para Redux
      onChange={handleDistritoChange}
      bgColor={bgColor}
      placeholder={t('filter.select_district')} // Placeholder traduzido
      disabled={disabled} // Desativa se useAddress estiver ativo
    />
  );
};

export default FiltroDistrito;