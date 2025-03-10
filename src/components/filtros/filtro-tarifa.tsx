import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTarifa } from '../../backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import CommonFilter from './common-filter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FilterOption {
  id: string; // Valor numérico como string
  name: string; // Valor traduzido para exibição
  value: number; // Valor numérico para salvar no banco
}

interface FiltroTarifaProps {
  bgColor?: string;
  buttonPadding?: string;
  rounded?: string;
  onChange?: (value: string) => void;
}

type TarifaKey = '50' | '100' | '200' | '500' | 'more_than_500';

const FiltroTarifa: React.FC<FiltroTarifaProps> = ({ onChange, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const tarifaRedux = useSelector((state: { profile?: { profile?: { tarifa?: number; userUID?: string } } }) =>
    state.profile?.profile?.tarifa || null
  );
  const userUID = useSelector((state: { profile?: { profile?: { tarifa?: number; userUID?: string } } }) =>
    state.profile?.profile?.userUID
  );

  // Mapeamento fixo das tarifas em valores numéricos (para salvar no banco)
  const tarifasEmValores: Record<TarifaKey, number> = {
    '50': 50,
    '100': 100,
    '200': 200,
    '500': 500,
    'more_than_500': 501,
  };

  // Mapeamento dinâmico para exibição com tradução
  const tarifasTraduzidas: Record<TarifaKey, string> = {
    '50': t('tarifa.50'),
    '100': t('tarifa.100'),
    '200': t('tarifa.200'),
    '500': t('tarifa.500'),
    'more_than_500': t('tarifa.more_than_500'),
  };

  // Opções para o filtro: id é o valor numérico como string, name é o valor traduzido
  const tarifaOptions: FilterOption[] = Object.keys(tarifasEmValores).map((key) => ({
    id: String(tarifasEmValores[key as TarifaKey]), // Valor numérico como string
    name: tarifasTraduzidas[key as TarifaKey], // Texto traduzido
    value: tarifasEmValores[key as TarifaKey], // Valor numérico
  }));

  const handleTarifaChange = async (selectedId: string) => {
    const selectedOption = tarifaOptions.find((opt) => opt.id === selectedId);

    if (selectedOption) {
      const newTarifa = selectedOption.value; // Valor numérico para salvar

      // Atualiza Redux
      dispatch(updateTarifa(newTarifa));

      if (!userUID) {
        toast.error('Erro: usuário não identificado.');
        return;
      }

      try {
        // Salva no banco de dados
        await updateProfileData({ tarifa: newTarifa }, userUID);
        toast.success(t('messages.tarifaUpdated'), { position: 'top-right', autoClose: 1000 });

        // Chama a prop onChange se existir, passando o valor numérico como string
        if (onChange) {
          onChange(String(newTarifa));
        }
      } catch (error) {
        console.error('Erro ao atualizar tarifa:', error);
        toast.error(t('messages.tarifaUpdateError'));
      }
    }
  };

  // Valor exibido é o texto traduzido correspondente ao valor numérico no Redux
  const displayedValue = tarifaRedux
    ? tarifasTraduzidas[
        Object.keys(tarifasEmValores).find(
          (key) => tarifasEmValores[key as TarifaKey] === tarifaRedux
        ) as TarifaKey
      ]
    : null;

  return (
    <CommonFilter
      label={t('filterTarifa.tarifa')}
      options={tarifaOptions}
      value={displayedValue} // Texto traduzido (ex.: "À partir de 50€")
      onChange={handleTarifaChange}
      bgColor={bgColor}
      placeholder={t('filterTarifa.select_tarifa')} // "Selecionar uma tarifa"
    />
  );
};

export default FiltroTarifa;