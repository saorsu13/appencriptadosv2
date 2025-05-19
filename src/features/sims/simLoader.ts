import { getSims } from './simService';
import { setSims } from './simSlice';
import { AppDispatch } from '@/store';

export async function loadSimsToRedux(dispatch: AppDispatch) {
  const sims = await getSims();
  dispatch(setSims(sims));
}
