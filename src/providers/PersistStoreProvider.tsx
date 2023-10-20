'use client';

import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../store/index';

interface PersistStoreProviderProps {
  children: React.ReactNode;
}

const PersistStoreProvider = ({ children }: PersistStoreProviderProps) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};

export default PersistStoreProvider;
