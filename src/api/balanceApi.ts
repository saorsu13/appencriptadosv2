import api from "@/config/api";
import { BalanceResponse } from '@/types/balance';

export async function fetchBalance(
  id: string | number,
  currency: string,
  country = 'CO'
): Promise<BalanceResponse> {
  const resp = await api.post<BalanceResponse>(
    '/getSimBalance',
    { id, currency_code: currency, country }
  );
  if (!resp.ok) throw new Error(resp.problem);
  if (resp.data === undefined) {
    throw new Error('No se recibió data de balance');
  }
  return resp.data;
}
