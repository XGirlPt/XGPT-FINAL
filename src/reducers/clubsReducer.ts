import {
  UPDATE_CLUBS_NOME,
  UPDATE_CLUBS_NUMERO,
  UPDATE_CLUBS_TELEFONE,
  UPDATE_CLUBS_UID,
  UPDATE_CLUBS_EMAIL,
  LOGOUT_CLUBS,
} from "../actions/ClubsActions";

// Define the state type
interface ClubsState {
  nome: string;
  numero: string;
  email: string;
  telefone: string;
  userUID: string | null;
}

// Define the action payload types
interface UpdateClubsNomeAction {
  type: typeof UPDATE_CLUBS_NOME;
  payload: string;
}

interface UpdateClubsNumeroAction {
  type: typeof UPDATE_CLUBS_NUMERO;
  payload: string;
}

interface UpdateClubsTelefoneAction {
  type: typeof UPDATE_CLUBS_TELEFONE;
  payload: string;
}

interface UpdateClubsUidAction {
  type: typeof UPDATE_CLUBS_UID;
  payload: string | null;
}

interface UpdateClubsEmailAction {
  type: typeof UPDATE_CLUBS_EMAIL;
  payload: string;
}

interface LogoutClubsAction {
  type: typeof LOGOUT_CLUBS;
}

// Combine the action types in a union
type ClubsActionTypes =
  | UpdateClubsNomeAction
  | UpdateClubsNumeroAction
  | UpdateClubsTelefoneAction
  | UpdateClubsUidAction
  | UpdateClubsEmailAction
  | LogoutClubsAction;

// Define the initial state
const initialState: ClubsState = {
  nome: "",
  numero: "",
  email: "",
  telefone: "",
  userUID: null,
};

// Define the reducer for clubs
const clubsReducer = (
  state = initialState,
  action: ClubsActionTypes
): ClubsState => {
  switch (action.type) {
    case UPDATE_CLUBS_NOME:
      return {
        ...state,
        nome: action.payload,
      };

    case UPDATE_CLUBS_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    case UPDATE_CLUBS_NUMERO:
      return {
        ...state,
        numero: action.payload,
      };

    case UPDATE_CLUBS_TELEFONE:
      return {
        ...state,
        telefone: action.payload,
      };

    case UPDATE_CLUBS_UID:
      return {
        ...state,
        userUID: action.payload,
      };

    case LOGOUT_CLUBS:
      return {
        ...state,
        userUID: null,
        email: "",
        // Clear other club-related states
        nome: "",
        numero: "",
        telefone: "",
      };

    default:
      return state;
  }
};

export default clubsReducer;
