import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatRoom, Message, Profile } from '@/backend/types';
import {
  login,
  logout,
  register,
  updatePremiumStatus,
  fetchProfileData,
  fetchSelectedProfile,
  updateProfileField,
  updateProfileArrayField,
  updateProfileFields,
} from '../actions/ProfileActions';
import { startChat, sendMessage, fetchChatMessages, fetchChatRooms } from '../actions/ChatActions'; // Corrigido aqui

// Interface do estado do perfil
export interface ProfileState {
  userUID: string | null;
  photos: string[];
  vphotos: string[];
  stories: string[];
  photoURL: string[];
  vphotoURL: string[];
  storyURL: string[];
  nome: string | null;
  email: string | null;
  idade: number | null;
  altura: string | null;
  cabelo: string | null;
  cidade: string | null;
  address: string | null;
  distrito: string | null;
  latitude: number | null;
  longitude: number | null;
  tag: string | null;
  mamas: string | null;
  origem: string | null;
  signo: string | null;
  corpo: string | null;
  olhos: string | null;
  seios: string | null;
  tatuagem: string | null;
  telefone: string | null;
  pelos: string | null;
  lingua: string[] | null;
  pagamento: string[] | null;
  servico: string[] | null;
  description: string | null;
  tarifa: number | null;
  premium: boolean;
  token: string | null;
  error: string | null;
  loading: boolean;
  isLoggedIn: boolean;
  profiles: Profile[] | null;
  selectedProfile: Profile | null;
  peso: string | null;
  comment: string[] | null;
  certificado: boolean;
  status: null | boolean;
  live: boolean | null;
  article_author_badge: boolean;
  featured_until: string | null;
  appliedFilters: {
    idade?: number[];
    tarifa?: number[];
    lingua?: string[];
    altura?: string;
    distrito?: string;
    origem?: string;
    olhos?: string;
    seios?: string;
    mamas?: string;
    pelos?: boolean;
    tatuagem?: boolean;
    certificado?: boolean;
  };
  chatRooms: ChatRoom[] | null;
  currentChatRoomId: string | null;
  messages: { [chatRoomId: string]: Message[] };
}

// Estado inicial
const initialState: ProfileState = {
  userUID: null,
  photos: [],
  vphotos: [],
  stories: [],
  photoURL: [],
  vphotoURL: [],
  storyURL: [],
  nome: null,
  email: null,
  idade: null,
  altura: null,
  cabelo: null,
  cidade: null,
  address: null,
  distrito: null,
  latitude: null,
  longitude: null,
  tag: null,
  mamas: null,
  origem: null,
  signo: null,
  corpo: null,
  olhos: null,
  seios: null,
  tatuagem: null,
  telefone: null,
  pelos: null,
  lingua: null,
  pagamento: null,
  servico: null,
  description: null,
  tarifa: null,
  premium: false,
  token: null,
  error: null,
  loading: false,
  isLoggedIn: false,
  profiles: null,
  selectedProfile: null,
  peso: null,
  comment: null,
  certificado: false,
  status: null,
  live: null,
  article_author_badge: false,
  featured_until: null,
  appliedFilters: {},
  chatRooms: null,
  currentChatRoomId: null,
  messages: {},
};

// Criação do slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserUID: (state, action: PayloadAction<string>) => {
      state.userUID = action.payload;
      state.isLoggedIn = true;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    updatePhotos: (state, action: PayloadAction<string[]>) => {
      state.photos = action.payload;
      state.photoURL = action.payload;
    },
    setPhotos: (state, action: PayloadAction<string[]>) => {
      state.photos = action.payload;
    },
    updateVPhotos: (state, action: PayloadAction<string[]>) => {
      state.vphotos = action.payload;
      state.vphotoURL = action.payload;
    },
    updateStories: (state, action: PayloadAction<string[]>) => {
      state.stories = action.payload;
      state.storyURL = action.payload;
    },
    updatePhotoURL: (state, action: PayloadAction<string[]>) => {
      state.photoURL = action.payload;
      state.photos = action.payload;
    },
    updateVPhotoURL: (state, action: PayloadAction<string[]>) => {
      state.vphotoURL = action.payload;
      state.vphotos = action.payload;
    },
    updateStoryURL: (state, action: PayloadAction<string[]>) => {
      state.storyURL = action.payload;
      state.stories = action.payload;
    },
    updateNome: (state, action: PayloadAction<string | null>) => {
      state.nome = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    updateIdade: (state, action: PayloadAction<number | null>) => {
      state.idade = action.payload;
    },
    updateAltura: (state, action: PayloadAction<string | null>) => {
      state.altura = action.payload;
    },
    updateCabelo: (state, action: PayloadAction<string | null>) => {
      state.cabelo = action.payload;
    },
    updateCidade: (state, action: PayloadAction<string | null>) => {
      state.cidade = action.payload;
    },
    updateAddress: (state, action: PayloadAction<string | null>) => {
      state.address = action.payload;
    },
    updateDistrito: (state, action: PayloadAction<string | null>) => {
      state.distrito = action.payload;
    },
    updateLatitude: (state, action: PayloadAction<number | null>) => {
      state.latitude = action.payload;
    },
    updateLongitude: (state, action: PayloadAction<number | null>) => {
      state.longitude = action.payload;
    },
    updateTag: (state, action: PayloadAction<string | null>) => {
      state.tag = action.payload;
    },
    updateMamas: (state, action: PayloadAction<string | null>) => {
      state.mamas = action.payload;
    },
    updateOrigem: (state, action: PayloadAction<string | null>) => {
      state.origem = action.payload;
    },
    updateSigno: (state, action: PayloadAction<string | null>) => {
      state.signo = action.payload;
    },
    updateCorpo: (state, action: PayloadAction<string | null>) => {
      state.corpo = action.payload;
    },
    updateOlhos: (state, action: PayloadAction<string | null>) => {
      state.olhos = action.payload;
    },
    updateSeios: (state, action: PayloadAction<string | null>) => {
      state.seios = action.payload;
    },
    updateTatuagem: (state, action: PayloadAction<string | null>) => {
      state.tatuagem = action.payload;
    },
    updateTelefone: (state, action: PayloadAction<string | null>) => {
      state.telefone = action.payload;
    },
    updatePelos: (state, action: PayloadAction<string | null>) => {
      state.pelos = action.payload;
    },
    updateLingua: (state, action: PayloadAction<string[] | null>) => {
      state.lingua = action.payload;
    },
    updatePagamento: (state, action: PayloadAction<string[] | null>) => {
      state.pagamento = action.payload;
    },
    updateServico: (state, action: PayloadAction<string[] | null>) => {
      state.servico = action.payload;
    },
    updateDescription: (state, action: PayloadAction<string | null>) => {
      state.description = action.payload;
    },
    updateTarifa: (state, action: PayloadAction<number | null>) => {
      state.tarifa = action.payload;
    },
    updatePremium: (state, action: PayloadAction<boolean>) => {
      state.premium = action.payload;
    },
    updatePeso: (state, action: PayloadAction<string | null>) => {
      state.peso = action.payload;
    },
    updateComment: (state, action: PayloadAction<string[] | null>) => {
      state.comment = action.payload;
    },
    updateCertificado: (state, action: PayloadAction<boolean>) => {
      state.certificado = action.payload;
    },
    updateStatus: (state, action: PayloadAction<null | boolean>) => {
      state.status = action.payload;
    },
    updateLive: (state, action: PayloadAction<boolean | null>) => {
      state.live = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<{ email: string; token: string; userUID: string }>) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.userUID = action.payload.userUID;
      state.isLoggedIn = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    logoutAction: () => initialState,
    registerUser: (state, action: PayloadAction<{ userUID: string; email: string }>) => {
      state.email = action.payload.email;
      state.userUID = action.payload.userUID;
      state.isLoggedIn = true;
    },
    addProfileData: (state, action: PayloadAction<Partial<ProfileState>>) => {
      Object.assign(state, action.payload);
    },
    setSelectedProfile: (state, action: PayloadAction<Profile | null>) => {
      state.selectedProfile = action.payload;
      console.log('Estado atualizado com setSelectedProfile:', state.selectedProfile);
    },
    setAppliedFilters: (state, action: PayloadAction<ProfileState['appliedFilters']>) => {
      state.appliedFilters = action.payload;
    },
    updateArticleAuthorBadge: (state, action: PayloadAction<boolean>) => {
      state.article_author_badge = action.payload;
    },
    updateFeaturedUntil: (state, action: PayloadAction<string | null>) => {
      state.featured_until = action.payload;
    },
    setCurrentChatRoom: (state, action: PayloadAction<string | null>) => {
      state.currentChatRoomId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token || null;
        state.email = action.payload.email;
        state.userUID = action.payload.userUID;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, () => {
        return initialState; // Resetar o estado completamente no logout
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.userUID = action.payload.userUID;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      })
      .addCase(updatePremiumStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePremiumStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.premium = action.payload;
        if (!action.payload) {
          state.photos = state.photos.slice(0, 3);
          state.stories = [];
          state.servico = state.servico ? state.servico.slice(0, 4) : null;
          state.tag = null;
        }
      })
      .addCase(updatePremiumStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao atualizar plano';
      })
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSelectedProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProfile = action.payload;
        console.log('fetchSelectedProfile fulfilled, selectedProfile:', state.selectedProfile);
      })
      .addCase(fetchSelectedProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfileField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileField.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfileField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfileArrayField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileArrayField.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfileArrayField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfileFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileFields.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfileFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(startChat.fulfilled, (state, action) => {
        if (!state.chatRooms) state.chatRooms = [];
        const existingRoom = state.chatRooms.find((room) => room.id === action.payload.id);
        if (!existingRoom) state.chatRooms.push(action.payload);
        state.currentChatRoomId = action.payload.id;
      })
      .addCase(startChat.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const chatRoomId = action.payload.chat_room_id;
        if (!state.messages[chatRoomId]) state.messages[chatRoomId] = [];
        state.messages[chatRoomId].push(action.payload);
        const room = state.chatRooms?.find((r) => r.id === chatRoomId);
        if (room) room.last_message_at = action.payload.created_at;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.messages[action.payload.chatRoomId] = action.payload.messages;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => { // Corrigido aqui
        state.chatRooms = action.payload;
      })
      .addCase(fetchChatRooms.rejected, (state, action) => { // Corrigido aqui
        state.error = action.payload as string;
      });
  },
});

// Exportar ações
export const {
  setUserUID,
  setLoggedIn,
  updatePhotos,
  updateVPhotos,
  updateStories,
  updatePhotoURL,
  updateVPhotoURL,
  updateStoryURL,
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
  updateTag,
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
  updateServico,
  updateDescription,
  updateTarifa,
  updatePremium,
  updatePeso,
  updateComment,
  updateCertificado,
  updateStatus,
  updateLive,
  loginSuccess,
  loginFailure,
  logoutAction,
  registerUser,
  addProfileData,
  setSelectedProfile,
  setAppliedFilters,
  updateArticleAuthorBadge,
  updateFeaturedUntil,
  setCurrentChatRoom,
} = profileSlice.actions;

export default profileSlice.reducer;