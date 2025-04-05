// src/backend/actions/ProfileActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../database/supabase';
import { setUserUID } from '../reducers/profileSlice';
import { profileDataService } from '@/backend/services/profileDataService';
import {
  logoutAction,
  updateNome,
  updateEmail,
  updateIdade,
  updateTelefone,
  updateOrigem,
  updateDistrito,
  updateCidade,
  updateAltura,
  updateCabelo,
  updateCorpo,
  updateOlhos,
  updateSeios,
  updateTatuagem,
  updateMamas,
  updatePelos,
  updateSigno,
  updateTarifa,
  updateDescription,
  updatePremium,
  updateCertificado,
  updateLive,
  updatePhotos,
  updateStories,
  updateLingua,
  updatePagamento,
  updateServico,
  updatePeso,
  updateAddress,
  updateLatitude,
  updateLongitude,
  updateComment,
  setSelectedProfile,
  updateFeaturedUntil,
  updateArticleAuthorBadge,
} from '../reducers/profileSlice';
import { Profile, UserProfileData } from '@/backend/types';



// Thunk para login
export const login = createAsyncThunk(
  'profile/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return {
        userUID: data.user.id,
        email: data.user.email,
        token: data.session.access_token,
      };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Erro ao fazer login');
    }
  }
);

// Thunk para logout
export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'profile/logout',
  async (_, { dispatch, rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();
    if (error) return rejectWithValue(error.message);
    dispatch(logoutAction());
  }
);

// Thunk para registro
export const register = createAsyncThunk<
  { email: string; userUID: string },
  { email: string; password: string },
  { rejectValue: string }
>(
  'profile/register',
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return rejectWithValue(error.message);
    if (!data.user) return rejectWithValue('Nenhum utilizador retornado após registo');

    const userProfileData: UserProfileData = {
      userUID: data.user.id,
      email: data.user.email || email,
      nome: '',
      idade: '',
      tarifa: '',
      altura: '',
      cabelo: '',
      corpo: '',
      olhos: '',
      origem: '',
      seios: '',
      tatuagem: '',
      mamas: '',
      pelos: '',
      signo: '',
      distrito: '',
      cidade: '',
      address: '',
      longitude: '',
      latitude: '',
      telefone: '',
      pagamento: '',
      servico: '',
      lingua: '',
      description: '',
      certificado: false,
      status: null,
      premium: false,
    };

    const profileError = await profileDataService.createProfile(userProfileData);
    if (profileError) return rejectWithValue('Erro ao criar perfil no banco de dados');
    return { userUID: data.user.id, email: data.user.email || email };
  }
);

// Thunk para atualizar o status premium
export const updatePremiumStatus = createAsyncThunk(
  'profile/updatePremiumStatus',
  async ({ userUID, premium }: { userUID: string; premium: boolean }, { dispatch, rejectWithValue }) => {
    try {
      const { error } = await supabase.from('ProfilesData').update({ premium }).eq('userUID', userUID);
      if (error) throw new Error(error.message);
      dispatch(updatePremium(premium));
      return premium;
    } catch (error: any) {
      console.error('Erro ao atualizar premium:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk para atualizar article_author_badge


// Thunk para atualizar featured_until
export const updateFeaturedUntilThunk = createAsyncThunk(
  'profile/updateFeaturedUntil',
  async (featuredUntil: string | null, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as any;
    const userUID = state.profile.userUID;
    if (!userUID) return rejectWithValue('Usuário não identificado');

    try {
      const { error } = await supabase
        .from('ProfilesData')
        .update({ featured_until: featuredUntil })
        .eq('userUID', userUID);
      if (error) throw new Error(error.message);
      dispatch(updateFeaturedUntil(featuredUntil));
      return featuredUntil;
    } catch (error: any) {
      console.error('Erro ao atualizar featured_until:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk genérico para atualizar um campo individual
export const updateProfileField = createAsyncThunk(
  'profile/updateField',
  async ({ field, value }: { field: string; value: any }, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as any;
    const userUID = state.profile.userUID;
    if (!userUID) return rejectWithValue('Usuário não identificado');

    try {
      const updateData = { [field]: value };
      const { error } = await supabase.from('ProfilesData').update(updateData).eq('userUID', userUID);
      if (error) throw new Error(error.message);

      switch (field) {
        case 'nome': dispatch(updateNome(value)); break;
        case 'email': dispatch(updateEmail(value)); break;
        case 'idade': dispatch(updateIdade(value)); break;
        case 'telefone': dispatch(updateTelefone(value)); break;
        case 'origem': dispatch(updateOrigem(value)); break;
        case 'distrito': dispatch(updateDistrito(value)); break;
        case 'cidade': dispatch(updateCidade(value)); break;
        case 'altura': dispatch(updateAltura(value)); break;
        case 'cabelo': dispatch(updateCabelo(value)); break;
        case 'corpo': dispatch(updateCorpo(value)); break;
        case 'olhos': dispatch(updateOlhos(value)); break;
        case 'seios': dispatch(updateSeios(value)); break;
        case 'tatuagem': dispatch(updateTatuagem(value)); break;
        case 'mamas': dispatch(updateMamas(value)); break;
        case 'pelos': dispatch(updatePelos(value)); break;
        case 'signo': dispatch(updateSigno(value)); break;
        case 'tarifa': dispatch(updateTarifa(value)); break;
        case 'description': dispatch(updateDescription(value)); break;
        case 'certificado': dispatch(updateCertificado(value)); break;
        case 'live': dispatch(updateLive(value)); break;
        case 'peso': dispatch(updatePeso(value)); break;
        case 'address': dispatch(updateAddress(value)); break;
        case 'latitude': dispatch(updateLatitude(value)); break;
        case 'longitude': dispatch(updateLongitude(value)); break;
        default: break;
      }
      return { field, value };
    } catch (error: any) {
      console.error('Erro no thunk updateProfileField:', error.message);
      return rejectWithValue(error.message || 'Erro ao atualizar o campo');
    }
  }
);

// Thunk para atualizar arrays (ex.: photos, stories, lingua)
export const updateProfileArrayField = createAsyncThunk(
  'profile/updateArrayField',
  async ({ field, value }: { field: string; value: string[] }, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as any;
    const userUID = state.profile.userUID;
    if (!userUID) return rejectWithValue('Usuário não identificado');

    try {
      const { error } = await supabase.from('ProfilesData').update({ [field]: value }).eq('userUID', userUID);
      if (error) throw new Error(error.message);

      switch (field) {
        case 'photos': dispatch(updatePhotos(value)); break;
        case 'stories': dispatch(updateStories(value)); break;
        case 'lingua': dispatch(updateLingua(value)); break;
        case 'pagamento': dispatch(updatePagamento(value)); break;
        case 'servico': dispatch(updateServico(value)); break;
        case 'comment': dispatch(updateComment(value)); break;
        default: break;
      }
      return { field, value };
    } catch (error: any) {
      console.error('Erro no updateProfileArrayField:', error.message);
      return rejectWithValue(error.message || 'Erro ao atualizar o array');
    }
  }
);

// Thunk para buscar perfil selecionado por profileName
export const fetchSelectedProfile = createAsyncThunk(
  'profile/fetchSelectedProfile',
  async (profileName: string, { dispatch, rejectWithValue }) => {
    try {
      const { profile, isCertified } = await profileDataService.fetchProfile(profileName);
      if (!profile.userUID) {
        console.error('Erro: Perfil não tem userUID', profile);
        throw new Error('Perfil não associado a um utilizador válido');
      }
      const profileWithExtras = { ...profile, isCertified };
      dispatch(setSelectedProfile(profileWithExtras));
      return profileWithExtras;
    } catch (error: any) {
      console.error('Erro ao buscar perfil selecionado:', error.message);
      return rejectWithValue(error.message);
    }
  }
);




// Thunk para atualização em lote de múltiplos campos
export const updateProfileFields = createAsyncThunk(
  'profile/updateFields',
  async (fields: Record<string, any>, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as any;
    const userUID = state.profile.userUID;
    if (!userUID) return rejectWithValue('Usuário não identificado');
    try {
      const { error } = await supabase.from('ProfilesData').update(fields).eq('userUID', userUID);
      if (error) throw new Error(error.message);
      Object.entries(fields).forEach(([field, value]) => {
        switch (field) {
          case 'nome': dispatch(updateNome(value)); break;
          case 'email': dispatch(updateEmail(value)); break;
          case 'idade': dispatch(updateIdade(value)); break;
          case 'telefone': dispatch(updateTelefone(value)); break;
          case 'origem': dispatch(updateOrigem(value)); break;
          case 'distrito': dispatch(updateDistrito(value)); break;
          case 'cidade': dispatch(updateCidade(value)); break;
          case 'altura': dispatch(updateAltura(value)); break;
          case 'cabelo': dispatch(updateCabelo(value)); break;
          case 'corpo': dispatch(updateCorpo(value)); break;
          case 'olhos': dispatch(updateOlhos(value)); break;
          case 'seios': dispatch(updateSeios(value)); break;
          case 'tatuagem': dispatch(updateTatuagem(value)); break;
          case 'mamas': dispatch(updateMamas(value)); break;
          case 'pelos': dispatch(updatePelos(value)); break;
          case 'signo': dispatch(updateSigno(value)); break;
          case 'tarifa': dispatch(updateTarifa(value)); break;
          case 'description': dispatch(updateDescription(value)); break;
          case 'certificado': dispatch(updateCertificado(value)); break;
          case 'live': dispatch(updateLive(value)); break;
          case 'photos': dispatch(updatePhotos(value)); break;
          case 'stories': dispatch(updateStories(value)); break;
          case 'lingua': dispatch(updateLingua(value)); break;
          case 'pagamento': dispatch(updatePagamento(value)); break;
          case 'servico': dispatch(updateServico(value)); break;
          case 'peso': dispatch(updatePeso(value)); break;
          case 'address': dispatch(updateAddress(value)); break;
          case 'latitude': dispatch(updateLatitude(value)); break;
          case 'longitude': dispatch(updateLongitude(value)); break;
          case 'comment': dispatch(updateComment(value)); break;
          case 'premium': dispatch(updatePremium(value)); break;
          default: break;
        }
      });
      return fields;
    } catch (error: any) {
      console.error('Erro no updateProfileFields:', error.message);
      return rejectWithValue('Erro ao atualizar os campos');
    }
  }
);

// Thunk para carregar os dados do perfil do usuário logado
export const fetchProfileData = createAsyncThunk(
  'profile/fetchProfileData',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as any;
    const userUID = state.profile.userUID;
    if (!userUID) return rejectWithValue('Usuário não identificado');

    try {
      const { data: profileData, error: profileError } = await supabase
        .from('ProfilesData')
        .select('*')
        .eq('userUID', userUID)
        .single();

      if (profileError) throw new Error(profileError.message);
      if (!profileData) return rejectWithValue('Nenhum dado encontrado para o usuário');

      const { data: photoData, error: photoError } = await supabase
        .from('profilephoto')
        .select('imageurl')
        .eq('userUID', userUID);

      if (photoError) throw new Error(photoError.message);

      const { data: storyData, error: storyError } = await supabase
        .from('stories')
        .select('storyurl')
        .eq('userUID', userUID);

      if (storyError) throw new Error(storyError.message);

      const { data: vPhotoData, error: vPhotoError } = await supabase
        .from('VPhoto')
        .select('imageurl')
        .eq('userUID', userUID);

      if (vPhotoError) throw new Error(vPhotoError.message);

      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('profileuid', userUID);

      if (commentsError) throw new Error(commentsError.message);

      const profileWithExtras: Profile = {
        ...profileData,
        photos: photoData?.map((photo) => photo.imageurl) || [],
        stories: storyData?.map((story) => story.storyurl) || [],
        vphotos: vPhotoData?.map((vphoto) => vphoto.imageurl) || [],
        photoURL: photoData?.map((photo) => photo.imageurl) || [],
        vphotoURL: vPhotoData?.map((vphoto) => vphoto.imageurl) || [],
        storyURL: storyData?.map((story) => story.storyurl) || [],
        comment: commentsData?.map((comment) => comment.comment) || [],
        id: profileData.id,
        tarifa: profileData.tarifa || 0,
        lingua: profileData.lingua || [],
        telefone: profileData.telefone || '',
        email: profileData.email || '',
        idade: profileData.idade || 0,
        altura: profileData.altura || '',
        distrito: profileData.distrito || '',
        origem: profileData.origem || '',
        cidade: profileData.cidade || '',
        address: profileData.address || '',
        latitude: profileData.latitude || 0,
        longitude: profileData.longitude || 0,
        peso: profileData.peso || '',
        tatuagem: profileData.tatuagem || '',
        pelos: profileData.pelos || '',
        olhos: profileData.olhos || '',
        seios: profileData.seios || '',
        mamas: profileData.mamas || '',
        signo: profileData.signo || '',
        pagamento: profileData.pagamento || [],
        inactive: profileData.status === false,
        certificado: profileData.certificado || false,
        live: profileData.live || false,
        premium: profileData.premium || false,
        article_author_badge: profileData.article_author_badge || false,
        featured_until: profileData.featured_until || null,
      };

      dispatch(updateNome(profileWithExtras.nome || null));
      dispatch(updateEmail(profileWithExtras.email || null));
      dispatch(updateIdade(profileWithExtras.idade || null));
      dispatch(updateTelefone(profileWithExtras.telefone || null));
      dispatch(updateCidade(profileWithExtras.cidade || null));
      dispatch(updateDistrito(profileWithExtras.distrito || null));
      dispatch(updateOrigem(profileWithExtras.origem || null));
      dispatch(updateAltura(profileWithExtras.altura || null));
      dispatch(updateMamas(profileWithExtras.mamas || null));
      dispatch(updateCorpo(profileWithExtras.corpo || null));
      dispatch(updateCabelo(profileWithExtras.cabelo || null));
      dispatch(updateOlhos(profileWithExtras.olhos || null));
      dispatch(updateSeios(profileWithExtras.seios || null));
      dispatch(updatePelos(profileWithExtras.pelos || null));
      dispatch(updateTatuagem(profileWithExtras.tatuagem || null));
      dispatch(updateSigno(profileWithExtras.signo || null));
      dispatch(updateTarifa(profileWithExtras.tarifa || null));
      dispatch(updateDescription(profileWithExtras.description || null));
      dispatch(updateLive(profileWithExtras.live || false));
      dispatch(updateAddress(profileWithExtras.address || null));
      dispatch(updateLatitude(profileWithExtras.latitude || null));
      dispatch(updateLongitude(profileWithExtras.longitude || null));
      dispatch(updatePhotos(profileWithExtras.photos || []));
      dispatch(updateStories(profileWithExtras.stories || []));
      dispatch(updateLingua(profileWithExtras.lingua || null));
      dispatch(updatePagamento(profileWithExtras.pagamento || null));
      dispatch(updateServico(profileWithExtras.servico || null));
      dispatch(updatePeso(profileWithExtras.peso || null));
      dispatch(updateComment(profileWithExtras.comment || null));
      dispatch(updateCertificado(profileWithExtras.certificado || false));
      dispatch(updatePremium(profileWithExtras.premium || false));
      dispatch(updateFeaturedUntil(profileWithExtras.featured_until));

      return profileWithExtras;
    } catch (error: any) {
      console.error('Erro ao carregar dados do perfil:', error.message);
      return rejectWithValue(error.message);
    }
  }
);