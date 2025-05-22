// src/hooks/useRestoreSimAuth.ts
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from './hooksStoreRedux';
import { restoreSimAuth } from '@/features/simAuth/simAuthSlice';

export function useRestoreSimAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const restoreAuth = async () => {
      const iccid = await AsyncStorage.getItem('currentICCID');
      const isLogged = !!iccid;
      dispatch(restoreSimAuth(isLogged));
      console.log('[useRestoreSimAuth] Restaurando estado de autenticación SIM:', isLogged);
    };
    restoreAuth();
  }, []);
}
