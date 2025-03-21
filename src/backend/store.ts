import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import storage from './storage';
import supabase from './database/supabase';
import { loginSuccess, logoutAction } from './reducers/profileSlice';
import rootReducer, { RootReducerState } from './reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['tracking'],
};

const persistedReducer = persistReducer<RootReducerState>(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  supabase.auth.getSession().then(({ data, error }) => {
    if (!error && data.session) {
      const user = data.session.user;
      store.dispatch(
        loginSuccess({
          email: user.email || '',
          token: data.session.access_token,
          user: { uid: user.id },
        })
      );
    } else {
      store.dispatch(logoutAction());
    }
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      store.dispatch(
        loginSuccess({
          email: session.user.email || '',
          token: session.access_token,
          user: { uid: session.user.id },
        })
      );
    } else if (event === 'SIGNED_OUT') {
      store.dispatch(logoutAction());
    }
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];