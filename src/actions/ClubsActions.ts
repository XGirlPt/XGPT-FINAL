export const UPDATE_CLUBS_NOME = "UPDATE_CLUBS_NOME";
export const UPDATE_CLUBS_NUMERO = "UPDATE_CLUBS_NUMERO";
export const UPDATE_CLUBS_TELEFONE = "UPDATE_CLUBS_TELEFONE";
export const UPDATE_CLUBS_UID = "UPDATE_CLUBS_UID"; // Alterei de UPDATE_CLUBS_USERUID para UPDATE_CLUBS_UID
export const UPDATE_CLUBS_EMAIL = "UPDATE_CLUBS_EMAIL";
export const LOGOUT_CLUBS = "LOGOUT_CLUBS";

export const updateClubsNome = (nome: string) => ({
  type: UPDATE_CLUBS_NOME,
  payload: nome,
});

export const updateClubsNumero = (numero: string) => ({
  type: UPDATE_CLUBS_NUMERO,
  payload: numero,
});

export const updateClubsTelefone = (telefone: string) => ({
  type: UPDATE_CLUBS_TELEFONE,
  payload: telefone,
});

export const updateClubsUserUID = (userUID: string) => ({
  type: UPDATE_CLUBS_UID,
  payload: userUID,
});

export const updateClubsEmail = (email: string) => ({
  type: UPDATE_CLUBS_EMAIL,
  payload: email,
});

export const logoutClubs = () => ({
  type: LOGOUT_CLUBS,
});
