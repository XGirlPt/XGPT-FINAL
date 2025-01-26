import {
  FETCH_USER_AND_CLUB_DATA,
  SET_USER_AND_CLUB_DATA,
  SET_USER_AND_CLUB_ERROR,
} from "../actions/userAndClubActions";

// Define the state type
interface UserAndClubState {
  userData: any | null;
  clubData: any | null;
  error: string | null;
  loading: boolean;
}

// Define the action payload types
interface FetchUserAndClubDataAction {
  type: typeof FETCH_USER_AND_CLUB_DATA;
}

interface SetUserAndClubDataAction {
  type: typeof SET_USER_AND_CLUB_DATA;
  payload: {
    userData: any;
    clubData: any;
  };
}

interface SetUserAndClubErrorAction {
  type: typeof SET_USER_AND_CLUB_ERROR;
  payload: string;
}

// Combine the action types in a union
type UserAndClubActionTypes =
  | FetchUserAndClubDataAction
  | SetUserAndClubDataAction
  | SetUserAndClubErrorAction;

// Define the initial state
const initialState: UserAndClubState = {
  userData: null,
  clubData: null,
  error: null,
  loading: false,
};

// Define the reducer
const userAndClubReducer = (
  state = initialState,
  action: UserAndClubActionTypes
): UserAndClubState => {
  switch (action.type) {
    case FETCH_USER_AND_CLUB_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_USER_AND_CLUB_DATA:
      return {
        ...state,
        userData: action.payload.userData,
        clubData: action.payload.clubData,
        loading: false,
        error: null,
      };
    case SET_USER_AND_CLUB_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userAndClubReducer;
