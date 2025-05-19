import * as SecureStore from 'expo-secure-store';
import { Sim } from './simTypes';
import { getDefaultCurrencyValue } from '@/utils/currency';

const STORAGE_KEY = 'ENCRYPTED_SIMS';

export async function getSims(): Promise<Sim[]> {
  const json = await SecureStore.getItemAsync(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveSim(sim: Sim) {
  const sims = await getSims();
  const newSim: Sim = {
    ...sim,
    currency: sim.currency ?? getDefaultCurrencyValue(),
  };
  sims.push(newSim);
  await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(sims));
}

export async function updateSim(updatedSim: Sim) {
  const sims = await getSims();
  const merged = sims.filter(s => s.idSim !== updatedSim.idSim);
  merged.push({
    ...updatedSim,
    currency: updatedSim.currency ?? getDefaultCurrencyValue(),
  });
  await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(merged));
}

export async function deleteSim(idSim : string) {
  const sims = await getSims();
  const updated = sims.filter(s => s.idSim !== idSim );
  await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
}

