import { useAppDispatch } from '@/hooks/hooksStoreRedux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { useAuth } from '@/context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateCurrentSim, deleteSim, setSims } from '@/features/sims/simSlice';
import { deleteSim as deleteSimFromStorage } from '@/features/sims/simService';
import { Sim } from '@/features/sims/simTypes';
import { logoutSim as logoutSimAuth } from '@/features/simAuth/simAuthSlice';


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
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'RootTabs',
                state: {
                  index: 2, // Sims tab
                  routes: [
                    {
                      name: 'Sims',
                      state: {
                        routes: [{ name: 'SimsList' }],
                      },
                    },
                  ],
                },
              },
            ],
          })
        );
      } else if (sim.provider === 'telco-vision') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'BalanceStack',
                state: {
                  routes: [{ name: 'BalanceMain' }],
                },
              },
            ],
          })
        );
      }
    };

  
    const logoutSimGlobal = async () => {
      console.log('[SimManager] 🔒 Cerrando sesión global de SIM...');
      await AsyncStorage.removeItem('currentICCID');
      dispatch(updateCurrentSim(null));
      dispatch(setSims([]));
      dispatch(logoutSimAuth());

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'RootTabs',
              state: {
                index: 2,
                routes: [{ name: 'Sims', state: { routes: [{ name: 'SimLogin' }] } }],
              },
            },
          ],
        })
      );
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
      await logoutSimGlobal();
      return false;
      }
    };
  
    return {
      restoreSimFromStorage,
      changeSim,
      deleteSimAndRedirect,
      logoutSimGlobal,

    };
  }
  