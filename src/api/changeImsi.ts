// src/Api/changeImsi.ts
import api from '@/config/api';

export interface ChangeImsiPayload {
  oldIccid: string;
  newIccid: string;
}

export async function changeImsiApi({
  oldIccid,
  newIccid
}: ChangeImsiPayload) {
  const response = await api.post('/changeImsi', {
    id: Number(oldIccid),
    switch: newIccid
  });
  if (response.problem) throw new Error(response.problem);
  return response.data;
}
