import api from '@/config/api';
import { useMutation } from '@tanstack/react-query';

export function useNetworkProfile() {
  return useMutation({
    mutationFn: async ({ simId, profile }: { simId: string; profile: string }) => {
      console.log('🚀 Enviando cambio de perfil de red...');
      console.log('➡️ SIM ID:', simId);
      console.log('➡️ Nuevo perfil:', profile);

      const response = await api.post('/changeProfile', {
        id: simId,
        switch: profile,
      });

      if (response.problem) {
        console.error('❌ Error en /changeProfile:', response.problem);
        throw new Error(response.problem);
      }

      console.log('✅ Cambio de perfil exitoso:', response.data);
      return response.data;
    },
  });
}
