import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '@/store';
import { resetSimState } from '@/features/sims/simSlice';

interface AuthContextProps {
  token: string | null;
  setToken: (token: string) => void;
  signOut: () => void;
  forceLogout: () => void;
}

const AuthContext = createContext<AuthContextProps>({ 
  token: null, 
  setToken: () => {}, 
  signOut: () => {}, 
  forceLogout: () => {} 
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  const setToken = async (newToken: string) => {
    setTokenState(newToken);
    await AsyncStorage.setItem('authToken', newToken);
  };
  
  const signOut = async () => {
    setTokenState(null);
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('currentICCID');
  };
  
  const forceLogout = async () => {
    await signOut();
    store.dispatch(resetSimState());
  };

  return (
    <AuthContext.Provider value={{ token, setToken, signOut, forceLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);