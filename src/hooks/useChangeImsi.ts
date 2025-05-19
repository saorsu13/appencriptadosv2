// src/hooks/useChangeImsi.ts
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { useAppDispatch } from '@/hooks/hooksStoreRedux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeImsiApi } from '@/api/changeImsi';               // ajusta mayúsculas/minúsculas según tu estructura
import { updateCurrentSim } from '@/features/sims/simSlice';
import { setLoading } from '@/features/loading/loadingSlice';

export type ChangeImsiInput = {
  oldIccid: string;
  newIccid: string;
};

/**
 * Hook para cambiar la IMSI activa.
 * mutationFn recibe ChangeImsiInput y devuelve el newIccid (string).
 */
export function useChangeImsi(): UseMutationResult<
  string,              // TData
  Error,               // TError
  ChangeImsiInput,     // TVariables
  unknown              // TContext
> {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<string, Error, ChangeImsiInput, unknown>({
    // --> mutationFn en la propia options:
    mutationFn: async ({ oldIccid, newIccid }) => {
      dispatch(setLoading(true));
      await changeImsiApi({ oldIccid, newIccid });
      return newIccid;
    },
    onSuccess: async (newIccid) => {
      // 1) Actualizar Redux
      dispatch(updateCurrentSim(newIccid));
      // 2) Persistir en AsyncStorage
      await AsyncStorage.setItem('currentICCID', newIccid);
      // 3) Invalidar cache de la lista de SIMs
      queryClient.invalidateQueries({ queryKey: ['listSubscriber'] });
      dispatch(setLoading(false));
    },
    onError: (error) => {
      dispatch(setLoading(false));
      console.error('Error cambiando IMSI:', error);
    },
  });
}
