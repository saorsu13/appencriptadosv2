import { useQuery } from '@tanstack/react-query';
import { fetchBalance } from '@/api/balanceApi';
import { BalanceResponse, BalanceData } from '@/types/balance';

export function useBalance(
    id?: string,
    currency?: string,
    country?: string 
) {
  return useQuery<BalanceData, Error>({
    queryKey: ['balance',  id, currency, country],
    queryFn: async (): Promise<BalanceData> => {
      const r: BalanceResponse = await fetchBalance(id!, currency!, country!);
      return {
        data: {
          gb_availables: r.gb_availables,
          minutes_availables: Number(r.minutes_availables),
          imsi_changes_availables: r.imsi_changes_availables,
        },
        balance: r.balance,
        balance_internet: r.balance_internet,
        balance_minutes: r.balance_minutes,
        balance_imsi_changes: r.balance_imsi_changes,
        currency_code: r.currency_code,
      };
    },
    enabled: Boolean(id && currency),
  });
}
