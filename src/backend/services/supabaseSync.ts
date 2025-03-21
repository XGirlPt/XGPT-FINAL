import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../database/supabase';
import {
  updatePremium,
  updatePhotos,
  updateStories,
  updateServico,
  updateTag,
  updateNome,
  updateEmail,
  updateIdade,
  updateAltura,
  updateCabelo,
  updateCidade,
  updateAddress,
  updateDistrito,
  updateLatitude,
  updateLongitude,
  updateMamas,
  updateOrigem,
  updateSigno,
  updateCorpo,
  updateOlhos,
  updateSeios,
  updateTatuagem,
  updateTelefone,
  updatePelos,
  updateLingua,
  updatePagamento,
  updateDescription,
  updateTarifa,
  updatePeso,
  updateComment,
  updateCertificado,
  updateLive,
} from '../reducers/profileSlice';

export const useSupabaseSync = () => {
  const dispatch = useDispatch();
  const userUID = useSelector((state: any) => state.profile.userUID);

  useEffect(() => {
    if (!userUID) return;

    const subscription = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'ProfilesData',
          filter: `userUID=eq.${userUID}`, // Corrigido de "id" para "userUID"
        },
        (payload) => {
          const newProfile = payload.new;
          dispatch(updatePremium(newProfile.premium || false));
          dispatch(updatePhotos(newProfile.photos || []));
          dispatch(updateStories(newProfile.stories || []));
          dispatch(updateServico(newProfile.servico || []));
          dispatch(updateTag(newProfile.tag || null));
          dispatch(updateNome(newProfile.nome || null));
          dispatch(updateEmail(newProfile.email || null));
          dispatch(updateIdade(newProfile.idade || null));
          dispatch(updateAltura(newProfile.altura || null));
          dispatch(updateCabelo(newProfile.cabelo || null));
          dispatch(updateCidade(newProfile.cidade || null));
          dispatch(updateAddress(newProfile.address || null));
          dispatch(updateDistrito(newProfile.distrito || null));
          dispatch(updateLatitude(newProfile.latitude || null));
          dispatch(updateLongitude(newProfile.longitude || null));
          dispatch(updateMamas(newProfile.mamas || null));
          dispatch(updateOrigem(newProfile.origem || null));
          dispatch(updateSigno(newProfile.signo || null));
          dispatch(updateCorpo(newProfile.corpo || null));
          dispatch(updateOlhos(newProfile.olhos || null));
          dispatch(updateSeios(newProfile.seios || null));
          dispatch(updateTatuagem(newProfile.tatuagem || null));
          dispatch(updateTelefone(newProfile.telefone || null));
          dispatch(updatePelos(newProfile.pelos || null));
          dispatch(updateLingua(newProfile.lingua || null));
          dispatch(updatePagamento(newProfile.pagamento || null));
          dispatch(updateDescription(newProfile.description || null));
          dispatch(updateTarifa(newProfile.tarifa || null));
          dispatch(updatePeso(newProfile.peso || null));
          dispatch(updateComment(newProfile.comment || null));
          dispatch(updateCertificado(newProfile.certificado || false));
          dispatch(updateLive(newProfile.live || null));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userUID, dispatch]);
};