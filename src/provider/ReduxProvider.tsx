


'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/backend/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// Cria o store e o persistor fora do componente para garantir uma única instância
const store = makeStore();
const persistor = persistStore(store);

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
