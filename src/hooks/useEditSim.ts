// src/hooks/useEditSim.ts
import { useAppDispatch } from '@/hooks/hooksStoreRedux';
import { setSims, updateCurrentSim } from '@/features/sims/simSlice';
import { getSims, updateSim } from '@/features/sims/simService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { redirectBasedOnProvider } from '@/utils/navigationUtils';
import { Sim } from '@/features/sims/simTypes';

export function useEditSim() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const editSim = async (sim: Sim, newName: string): Promise<boolean> => {
    try {
      const updatedSim = { ...sim, simName: newName, name: newName };
      await updateSim(updatedSim);
      const all = await getSims();
      dispatch(setSims(all));
      dispatch(updateCurrentSim(updatedSim.idSim));
      await AsyncStorage.setItem('currentICCID', updatedSim.idSim);

      redirectBasedOnProvider(updatedSim.provider, navigation);
      return true;
    } catch (error) {
      console.error('[EditSim] Error al actualizar SIM:', error);
      return false;
    }
  };

  return { editSim };
}
