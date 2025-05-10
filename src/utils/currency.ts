// src/utils/currency.ts
import countries from '@/constants/countries';

export function getDefaultCurrencyValue() {
  const found = countries.find(c => c.value.split('-')[1] === 'COP');
  return found?.value ?? 'co-COP';
}
