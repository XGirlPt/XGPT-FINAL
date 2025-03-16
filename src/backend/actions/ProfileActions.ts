// ProfileActions.tsx

// Constantes de ação (em maiúsculas, seguindo a convenção Redux)
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_USER = 'REGISTER_USER';
export const ADD_PROFILE_DATA = 'ADD_PROFILE_DATA';
export const UPDATE_NOME = 'UPDATE_NOME';
export const UPDATE_USER_ID = 'UPDATE_USER_ID';
export const UPDATE_IDADE = 'UPDATE_IDADE';
export const UPDATE_ALTURA = 'UPDATE_ALTURA';
export const UPDATE_CABELO = 'UPDATE_CABELO';
export const UPDATE_CORPO = 'UPDATE_CORPO';
export const UPDATE_MAMAS = 'UPDATE_MAMAS';
export const UPDATE_OLHOS = 'UPDATE_OLHOS';
export const UPDATE_ORIGEM = 'UPDATE_ORIGEM';
export const UPDATE_SEIOS = 'UPDATE_SEIOS';
export const UPDATE_TATUAGEM = 'UPDATE_TATUAGEM';
export const UPDATE_TELEFONE = 'UPDATE_TELEFONE';
export const UPDATE_PELOS = 'UPDATE_PELOS';
export const UPDATE_DISTRITO = 'UPDATE_DISTRITO';
export const UPDATE_PHOTOS = 'UPDATE_PHOTOS';
export const UPDATE_VPHOTOS = 'UPDATE_VPHOTOS';
export const UPDATE_STORIES = 'UPDATE_STORIES';
export const UPDATE_TARIFA = 'UPDATE_TARIFA';
export const SET_USER_ID = 'SET_USER_ID';
export const UPDATE_PAGAMENTO = 'UPDATE_PAGAMENTO';
export const UPDATE_SERVICO = 'UPDATE_SERVICO';
export const UPDATE_LINGUA = 'UPDATE_LINGUA';
export const UPDATE_CIDADE = 'UPDATE_CIDADE';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS'; // Corrigido de 'UPDATE_address'
export const UPDATE_LATITUDE = 'UPDATE_LATITUDE';
export const UPDATE_LONGITUDE = 'UPDATE_LONGITUDE';
export const UPDATE_TAG = 'UPDATE_TAG';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
export const SET_PHOTO_URL = 'SET_PHOTO_URL';
export const SET_VPHOTO_URL = 'SET_VPHOTO_URL';
export const SET_STORY_URL = 'SET_STORY_URL';
export const UPDATE_SIGNO = 'UPDATE_SIGNO';
export const UPDATE_PROFILES = 'UPDATE_PROFILES';
export const SET_SELECTED_PROFILE = 'SET_SELECTED_PROFILE';
export const SET_PREMIUM = 'SET_PREMIUM';

// Interface para tipagem de perfis (usada em updateProfiles e setSelectedProfile)
interface Profile {
  photoURL?: string;
  storyURL?: string;
  vphotoURL?: string;
  // Adicione outros campos conforme necessário
}

// Ação de login bem-sucedido
export const loginSuccess = (userData: { email: string; token: string; user: any }) => {
  if (!userData || !userData.token || !userData.email) {
    console.error('Dados de login incompletos:', userData);
    return {
      type: LOGIN_FAILURE,
      payload: 'Dados de login incompletos',
    };
  }
  localStorage.setItem('userToken', userData.token);
  localStorage.setItem('email', userData.email);
  return {
    type: LOGIN_SUCCESS,
    payload: {
      ...userData,
      profileData: {
        isAuthenticated: true, // Certifica-te que isto está aqui
      },
    },
  };
};

// Ação de falha no login
export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Ação de logout
export const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('email');
  return {
    type: LOGOUT,
  };
};

// Ação para registrar utilizador
export const registerUser = (userUID: string, email: string) => ({
  type: REGISTER_USER,
  payload: {
    userUID,
    email,
  },
});

// Ação para adicionar dados ao perfil
export const addProfileData = (data: Partial<Profile>) => ({
  type: ADD_PROFILE_DATA,
  payload: data,
});

// Ações de atualização de campos específicos
export const updateNome = (nome: string | null) => ({
  type: UPDATE_NOME,
  payload: nome,
});

export const updateuserUID = (userUID: string) => ({
  type: UPDATE_USER_ID,
  payload: userUID,
});

export const updateIdade = (idade: number | null) => ({
  type: UPDATE_IDADE,
  payload: idade,
});

export const updateAltura = (altura: number | null) => ({
  type: UPDATE_ALTURA,
  payload: altura,
});

export const updateCabelo = (cabelo: string | null) => ({
  type: UPDATE_CABELO,
  payload: cabelo,
});

export const updateCorpo = (corpo: string | null) => ({
  type: UPDATE_CORPO,
  payload: corpo,
});

export const updateMamas = (mamas: string | null) => ({
  type: UPDATE_MAMAS,
  payload: mamas,
});

export const updateOlhos = (olhos: string | null) => ({
  type: UPDATE_OLHOS,
  payload: olhos,
});

export const updateOrigem = (origem: string | null) => ({
  type: UPDATE_ORIGEM,
  payload: origem,
});

export const updateSeios = (seios: string | null) => ({
  type: UPDATE_SEIOS,
  payload: seios,
});

export const updateTatuagem = (tatuagem: string | null) => ({
  type: UPDATE_TATUAGEM,
  payload: tatuagem,
});

export const updateTelefone = (telefone: string | null) => ({
  type: UPDATE_TELEFONE,
  payload: telefone,
});

export const updatePelos = (pelos: string | null) => ({
  type: UPDATE_PELOS,
  payload: pelos,
});

export const updateSigno = (signo: string | null) => ({
  type: UPDATE_SIGNO,
  payload: signo,
});

export const updateDistrito = (distrito: string | null) => ({
  type: UPDATE_DISTRITO,
  payload: distrito,
});

export const updatePhotos = (photos: string[]) => ({
  type: UPDATE_PHOTOS,
  payload: photos,
});

export const updateVPhotos = (vphotos: string[]) => ({
  type: UPDATE_VPHOTOS,
  payload: vphotos,
});

export const updateStories = (stories: string[]) => ({
  type: UPDATE_STORIES,
  payload: stories,
});

export const updateTarifa = (tarifa: string | null) => ({
  type: UPDATE_TARIFA,
  payload: tarifa,
});

export const setuserUID = (userUID: string) => ({
  type: SET_USER_ID,
  payload: userUID,
});

export const updatePagamento = (pagamento: string | null) => ({
  type: UPDATE_PAGAMENTO,
  payload: pagamento,
});

export const updateServico = (servico: string | null) => ({
  type: UPDATE_SERVICO,
  payload: servico,
});

export const updateLingua = (lingua: string | null) => ({
  type: UPDATE_LINGUA,
  payload: lingua,
});

export const updateCidade = (cidade: string | null) => ({
  type: UPDATE_CIDADE,
  payload: cidade,
});

export const updateAddress = (address: string | null) => ({
  type: UPDATE_ADDRESS, // Corrigido para usar a constante correta
  payload: address,
});

export const updateLatitude = (latitude: number | null) => ({
  type: UPDATE_LATITUDE,
  payload: latitude,
});

export const updateLongitude = (longitude: number | null) => ({
  type: UPDATE_LONGITUDE,
  payload: longitude,
});

export const updateTag = (tag: string | null) => ({
  type: UPDATE_TAG,
  payload: tag,
});

export const updateDescription = (description: string | null) => ({
  type: UPDATE_DESCRIPTION,
  payload: description,
});

export const setPhotoURL = (url: string[]) => ({
  type: SET_PHOTO_URL,
  payload: url,
});

export const setVPhotoURL = (url: string[]) => ({
  type: SET_VPHOTO_URL,
  payload: url,
});

export const setStoryURL = (url: string[]) => ({
  type: SET_STORY_URL,
  payload: url,
});

export const setPremium = (isPremium: boolean) => ({
  type: SET_PREMIUM, // Usando a constante definida
  payload: isPremium,
});

export const updateProfiles = (profiles: Profile[]) => {
  console.log('Atualizando perfis com:', profiles);
  const enhancedProfiles = profiles.map((profile) => ({
    ...profile,
    photoURL: profile.photoURL || '',
    storyURL: profile.storyURL || '',
    vphotoURL: profile.vphotoURL || '',
  }));
  return {
    type: UPDATE_PROFILES,
    payload: enhancedProfiles,
  };
};

export const setSelectedProfile = (profile: Profile) => ({
  type: SET_SELECTED_PROFILE,
  payload: profile,
});