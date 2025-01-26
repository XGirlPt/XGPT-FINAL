export const FETCH_USER_AND_CLUB_DATA = "FETCH_USER_AND_CLUB_DATA";
export const SET_USER_AND_CLUB_DATA = "SET_USER_AND_CLUB_DATA";
export const SET_USER_AND_CLUB_ERROR = "SET_USER_AND_CLUB_ERROR";

export const fetchUserAndClubData = () => ({
  type: FETCH_USER_AND_CLUB_DATA,
});

export const setUserAndClubData = (userData: any, clubData: any) => ({
  type: SET_USER_AND_CLUB_DATA,
  payload: {
    userData,
    clubData,
  },
});

export const setUserAndClubError = (error: any) => ({
  type: SET_USER_AND_CLUB_ERROR,
  payload: error,
});
