import { useAuth } from '../../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '@/hooks/hooksStoreRedux';
import { addSim, updateCurrentSim, setSims } from '@/features/sims/simSlice';
import { Sim } from '@/features/sims/simTypes';
import { generateSimId } from '@/features/sims/simUtils';
import { saveSim } from '@/features/sims/simService';
import { loginSim } from '@/features/simAuth/simAuthSlice';

export function useSimLogin() {
  const { setToken } = useAuth();
  const dispatch = useAppDispatch();

  async function login(simNumber: string) {
    if (!simNumber) throw new Error('SIM requerida');
    const isValid = simNumber.length === 6 || simNumber.length === 19;
    if (!isValid) throw new Error('SIM inválida');

    const sim: Sim = {
      idSim: generateSimId(),
      name: 'SIM local',
      simName: 'SIM local',
      iccid: simNumber,
      provider: simNumber.length === 19 ? 'telco-vision' : 'tottoli',
      code: 'local',
    };
    await saveSim(sim);
    dispatch(addSim(sim));
    dispatch(updateCurrentSim(sim.idSim));
    dispatch(setSims([sim]));

    dispatch(loginSim({ iccid: sim.iccid }));

    await AsyncStorage.setItem('currentICCID', sim.iccid);

    setToken(sim.iccid);
  }

  return { login };
}