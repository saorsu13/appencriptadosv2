// src/hooks/useSubscriberData.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getSubscriberData } from '@/api/subscriberApi';
import type { SubscriberResponse } from '@/types/subscriber';

export const useSubscriberData = (
  id: string,
  options?: Partial<UseQueryOptions<SubscriberResponse, Error>>
) => {
  return useQuery<SubscriberResponse, Error>({
    queryKey: ['subscriber', id],
    queryFn: () => getSubscriberData(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
    ...options,
  });
};
