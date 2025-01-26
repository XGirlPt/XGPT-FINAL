// rootReducer.ts
import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import clubsReducer from "./clubsReducer";
import userAndClubReducer from "./userAndClubReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
  clubs: clubsReducer,
  userAndClub: userAndClubReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
