import { combineReducers } from 'redux';
import profileReducer from './profileSlice';

export interface RootReducerState {
  profile: import('./profileSlice').ProfileState;
}

const rootReducer = combineReducers({
  profile: profileReducer,
});

export default rootReducer;