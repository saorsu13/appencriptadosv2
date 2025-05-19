import uuid from 'react-native-uuid';

export function generateSimId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `sim-${timestamp}-${random}`;
}


export function isValidIccid(iccid: string): boolean {
  return /^[0-9]{6}$/.test(iccid) || /^[0-9]{19}$/.test(iccid);
}

