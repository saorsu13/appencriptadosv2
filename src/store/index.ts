// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { menuCurrentProductReducer } from '@/features/menuCurrentProduct/menuCurrentProductSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import simReducer from '@/features/sims/simSlice';
import settingsReducer from './settingsSlice';

// import {
//   settingsReducer,
//   modalResetStateReducer
// } from '@/features/settingsSlice/settingsSlice';
import { activePasswordRequiredReducer } from '@/features/activePasswordRequired/activePasswordRequiredSlice'; 


const rootReducer = combineReducers({
  sims: simReducer,
  settings: settingsReducer,
  menuCurrentProduct: menuCurrentProductReducer,
  // settings:        settingsReducer,
  // modalReset:      modalResetStateReducer,
  activePasswordRequired: activePasswordRequiredReducer,

});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'sims',
    'networkProfile',
    'settings',
    'modalReset',
    'activePasswordRequired',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }), // para redux-persist
});

export const persistor = persistStore(store);

// Tipos TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
