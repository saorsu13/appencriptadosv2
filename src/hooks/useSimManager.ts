import { useAppDispatch } from '@/hooks/hooksStoreRedux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { useAuth } from '@/context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateCurrentSim, deleteSim } from '@/features/sims/simSlice';
import { deleteSim as deleteSimFromStorage } from '@/features/sims/simService';
import { Sim } from '@/features/sims/simTypes';


export function useSimManager() {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { forceLogout } = useAuth();
  
    const restoreSimFromStorage = async (sims: Sim[]) => {
      const savedSimId = await AsyncStorage.getItem('currentICCID');
      if (!savedSimId) return;
  
      const sim = sims.find(s => s.idSim === savedSimId);
      if (sim) {
        dispatch(updateCurrentSim(sim.idSim));
        console.log('[RESTORE] SIM restaurada:', sim.idSim);
      }
    };
  
    const changeSim = async (sim: Sim) => {
      dispatch(updateCurrentSim(sim.idSim));
      await AsyncStorage.setItem('currentICCID', sim.idSim);
      console.log('[SIM] SIM seleccionada:', sim.idSim);
  
      if (sim.provider === 'tottoli') {
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } else if (sim.provider === 'telco-vision') {
        navigation.reset({ index: 0, routes: [{ name: 'Balance' }] });
      }
    };
  
    const deleteSimAndRedirect = async (
      sim: Sim,
      sims: Sim[]
    ): Promise<boolean> => {
      await deleteSimFromStorage(sim.idSim);
      dispatch(deleteSim(sim.idSim));
      console.log('[SIM] Eliminada:', sim.idSim);
  
      const remaining = sims.filter(s => s.idSim !== sim.idSim);
      if (remaining.length > 0) {
        const nextSim = remaining[0];
        await changeSim(nextSim);
        return true;
      } else {
        dispatch(updateCurrentSim(null)); 
        await AsyncStorage.removeItem('currentICCID');
        return false;
      }
    };
  
    return {
      restoreSimFromStorage,
      changeSim,
      deleteSimAndRedirect,
    };
  }
  