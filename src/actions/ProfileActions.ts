export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const REGISTER_USER = "REGISTER_USER";
export const ADD_PROFILE_DATA = "ADD_PROFILE_DATA";
export const UPDATE_NOME = "UPDATE_NOME";
export const UPDATE_USER_ID = "UPDATE_USER_ID";
export const UPDATE_IDADE = "UPDATE_IDADE";
export const UPDATE_ALTURA = "UPDATE_ALTURA";
export const UPDATE_CABELO = "UPDATE_CABELO";
export const UPDATE_CORPO = "UPDATE_CORPO";
export const UPDATE_MAMAS = "UPDATE_MAMAS";
export const UPDATE_OLHOS = "UPDATE_OLHOS";
export const UPDATE_ORIGEM = "UPDATE_ORIGEM";
export const UPDATE_SEIOS = "UPDATE_SEIOS";
export const UPDATE_TATUAGEM = "UPDATE_TATUAGEM";
export const UPDATE_TELEFONE = "UPDATE_TELEFONE";
export const UPDATE_PELOS = "UPDATE_PELOS";
export const UPDATE_DISTRITO = "UPDATE_DISTRITO";

export const UPDATE_PHOTOS = "UPDATE_PHOTOS";
export const UPDATE_VPHOTOS = "UPDATE_VPHOTOS";

export const UPDATE_STORIES = "UPDATE_STORIES";


export const UPDATE_TARIFA = "UPDATE_TARIFA";
export const SET_USER_ID = "SET_USER_ID";
export const UPDATE_PAGAMENTO = "UPDATE_PAGAMENTO";
export const UPDATE_SERVICO = "UPDATE_SERVICO";
export const UPDATE_LINGUA = "UPDATE_LINGUA";

export const UPDATE_CIDADE = "UPDATE_CIDADE";
export const UPDATE_ADRESS = "UPDATE_ADRESS";
export const UPDATE_LATITUDE = "UPDATE_LATITUDE";
export const UPDATE_LONGITUDE = "UPDATE_LONGITUDE";


export const UPDATE_TAG = "UPDATE_TAG"
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";


export const SET_PHOTO_URL = "SET_PHOTO_URL";
export const SET_VPHOTO_URL = "SET_VPHOTO_URL";
export const SET_STORY_URL = "SET_STORY_URL";


export const UPDATE_SIGNO = "UPDATE_SIGNO";
export const UPDATE_PROFILES = "UPDATE_PROFILES";
export const SET_SELECTED_PROFILE = "SET_SELECTED_PROFILE";


export const loginSuccess = (userData: { email: string; token: string; user: any }) => {
  if (!userData || !userData.token || !userData.email) {
    console.error("Dados de login incompletos:", userData);
    return {
      type: LOGIN_FAILURE,
      payload: "Dados de login incompletos",
    };
  }

  return {
    type: LOGIN_SUCCESS,
    payload: userData
  };
};

export const loginFailure = (error: any) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('email');
  return {
    type: LOGOUT,
  };
};


export const registerUser = (userUID: string, email: string) => ({
  type: REGISTER_USER,
  payload: {
    userUID: userUID,
    email: email,
  },
});

export const addProfileData = (data: any) => ({
  type: ADD_PROFILE_DATA,
  payload: data,
});

export const updateNome = (nome: string) => ({
  type: UPDATE_NOME,
  payload: nome,
});

export const updateuserUID = (userUID: string) => ({
  type: UPDATE_USER_ID,
  payload: userUID,
});

export const updateIdade = (idade: string) => ({
  type: UPDATE_IDADE,
  payload: idade,
});

export const updateAltura = (altura: any) => ({
  type: UPDATE_ALTURA,
  payload: altura,
});

export const updateCabelo = (cabelo: any) => ({
  type: UPDATE_CABELO,
  payload: cabelo,
});

export const updateCorpo = (corpo: any) => ({
  type: UPDATE_CORPO,
  payload: corpo,
});

export const updateMamas = (mamas: any) => ({
  type: UPDATE_MAMAS,
  payload: mamas,
});

export const updateOlhos = (olhos: any) => ({
  type: UPDATE_OLHOS,
  payload: olhos,
});

export const updateOrigem = (origem: any) => ({
  type: UPDATE_ORIGEM,
  payload: origem,
});

export const updateSeios = (seios: any) => ({
  type: UPDATE_SEIOS,
  payload: seios,
});

export const updateTatuagem = (tatuagem: any) => ({
  type: UPDATE_TATUAGEM,
  payload: tatuagem,
});

export const updateTelefone = (telefone: any) => ({
  type: UPDATE_TELEFONE,
  payload: telefone,
});

export const updatePelos = (pelos: any) => ({
  type: UPDATE_PELOS,
  payload: pelos,
});

export const updateSigno = (signo: any) => ({
  type: UPDATE_SIGNO,
  payload: signo,
});

export const updateDistrito = (distrito: any) => ({
  type: UPDATE_DISTRITO,
  payload: distrito,
});

export const updatePhotos = (photos: any) => ({
  type: UPDATE_PHOTOS,
  payload: photos,
});

export const updateVPhotos = (vphotos: any) => ({
  type: UPDATE_VPHOTOS,
  payload: vphotos,
});


export const updateStories = (stories: any) => ({
  type: UPDATE_STORIES,
  payload: stories,
});

export const updateTarifa = (tarifa: any) => ({
  type: UPDATE_TARIFA,
  payload: tarifa,
});

export const setuserUID = (userUID: any) => ({
  type: SET_USER_ID,
  payload: userUID,
});
export const updatePagamento = (pagamento: any) => ({
  type: UPDATE_PAGAMENTO,
  payload: pagamento,
});

export const updateServico = (servico: any) => ({
  type: UPDATE_SERVICO,
  payload: servico,
});

export const updateLingua = (lingua: any) => ({
  type: UPDATE_LINGUA,
  payload: lingua,
});

export const updateCidade = (cidade: any) => ({
  type: UPDATE_CIDADE,
  payload: cidade,
});

export const updateAdress = (adress: any) => ({
  type: UPDATE_ADRESS,
  payload: adress,
});

export const updateLatitude = (latitude: any) => ({
  type: UPDATE_LATITUDE,
  payload: latitude,
});

export const updateLongitude = (longitude: any) => ({
  type: UPDATE_LONGITUDE,
  payload: longitude,
});


export const updateTag = (tag: any) => ({
  type: UPDATE_TAG,
  payload: tag,
});

export const updateDescription = (description: any) => ({
  type: UPDATE_DESCRIPTION,
  payload: description,
});

export const setPhotoURL = (url: any) => ({
  type: SET_PHOTO_URL,
  payload: url,
});

export const setVPhotoURL = (url: any) => ({
  type: SET_VPHOTO_URL,
  payload: url,
});

export const setStoryURL = (url: any) => ({
  type: SET_STORY_URL,
  payload: url,
});

export const updateProfiles = (profiles: any) => {
  console.log("Atualizando perfis com:", profiles);
  // Adicione uma verificação para garantir que cada perfil tem um campo photos definido para testes
  const enhancedProfiles = profiles.map((profile: any) => ({
    ...profile,
    photoURL: profile.photoURL,
    storyURL: profile.storyURL,
    vphotoURL: profile.vphotoURL
    
  }));
  return {
    type: UPDATE_PROFILES,
    payload: enhancedProfiles,
  };
};

export const setSelectedProfile = (profile: any) => ({
  type: SET_SELECTED_PROFILE, // Este tipo precisa ser tratado em seu reducer
  payload: profile,
});



