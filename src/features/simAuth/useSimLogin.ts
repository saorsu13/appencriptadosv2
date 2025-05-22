import { useAuth } from '../../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector, useAppDispatch } from '@/hooks/hooksStoreRedux';
import { addSim, updateCurrentSim, setSims } from '@/features/sims/simSlice';
import { Sim } from '@/features/sims/simTypes';
import { generateSimId } from '@/features/sims/simUtils';
import { saveSim } from '@/features/sims/simService';
import { loginSim } from '@/features/simAuth/simAuthSlice';

export function useSimLogin() {
  const { setToken } = useAuth();
  const dispatch = useAppDispatch();
  const existingSims = useAppSelector(state => state.sims.sims);

  async function login(simNumber: string) {
    if (!simNumber) throw new Error('SIM requerida');
    const isValid = simNumber.length === 6 || simNumber.length === 19;
    if (!isValid) throw new Error('SIM inválida');

    const simYaExiste = existingSims.find(sim => sim.iccid === simNumber);

    if (simYaExiste) {
      console.log('[LOGIN] SIM ya existe, usando SIM existente');
      dispatch(updateCurrentSim(simYaExiste.idSim));
      await AsyncStorage.setItem('currentICCID', simYaExiste.idSim);
      return;
    }
    
    const sim: Sim = {
      idSim: generateSimId(),
      name: 'SIM local',
      simName: 'SIM local',
      iccid: simNumber,
      provider: simNumber.length === 19 ? 'telco-vision' : 'tottoli',
      code: 'local',
    };
    console.log('[LOGIN] SIM generada:', sim);
    await saveSim(sim);
    console.log('[LOGIN] SIM guardada en storage local');
    dispatch(addSim(sim));
    dispatch(updateCurrentSim(sim.idSim));
    dispatch(setSims([sim]));
    console.log('[LOGIN] SIM enviada a Redux');
    dispatch(loginSim({ iccid: sim.iccid }));
    console.log('[LOGIN] Estado de autenticación actualizado');
    await AsyncStorage.setItem('currentICCID', sim.iccid);
    console.log('[LOGIN] currentICCID guardado en AsyncStorage:', sim.iccid);
    setToken(sim.iccid);
    console.log('[LOGIN] Token establecido en contexto');
    return sim;
  }

  return { login };
}