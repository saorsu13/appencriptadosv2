import { useQuery } from '@tanstack/react-query';
import api from '@/config/api';

export function useGetSimBalance(simId: string, currencyCode: string, country: string) {
  return useQuery({
    queryKey: ['getSimBalance', simId, currencyCode, country],
    queryFn: async () => {
      if (!simId || !currencyCode || !country) return undefined;

      const response = await api.post('/getSimBalance', {
        id: simId,
        currency_code: currencyCode,
        country: country,
      });

      if (response.problem || !response.data) {
        throw new Error('Error al obtener el balance');
      }

      return response.data;
    },
    enabled: Boolean(simId && currencyCode && country),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
