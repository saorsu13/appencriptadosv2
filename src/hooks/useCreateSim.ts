// src/hooks/useCreateSim.ts

import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateSimId } from '@/features/sims/simUtils';
import { setSims, updateCurrentSim } from '@/features/sims/simSlice';
import { saveSim, getSims } from '@/features/sims/simService';
import { useAppDispatch } from './hooksStoreRedux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { redirectBasedOnProvider } from '@/utils/navigationUtils';

export function useCreateSim() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(false);

  const createSim = async (iccid: string) => {
    try {
      setIsLoading(true);

      const existingSims = await getSims();

      const existsSimWithIccid = existingSims.some(s => s.iccid === iccid);
      if (existsSimWithIccid) {
        console.warn('[HOOK] Ya existe una SIM con este ICCID');
        return { sim: null, success: false, error: 'duplicate' };
      }

      const idSim = generateSimId();
      const sim = {
        idSim,
        simName: 'SIM local',
        name: 'SIM local',
        iccid,
        provider: iccid.length === 19 ? 'telco-vision' : 'tottoli',
        code: 'local',
      };

      await saveSim(sim);
      const all = await getSims();

      dispatch(setSims(all));
      dispatch(updateCurrentSim(sim.idSim));
      await AsyncStorage.setItem('currentICCID', sim.idSim);

      return { sim, success: true };
    } catch (error) {
      console.error('[HOOK] Error creando SIM:', error);
      return { sim: null, success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const redirect = (provider: string) => {
    redirectBasedOnProvider(provider, navigation);
  };

  return {
    createSim,
    redirect,
    isLoading,
  };
}
