// src/utils/apiClient.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://encriptados.es';
const TOKEN_KEY = 'authToken';
const EXPIRY_KEY = 'authTokenExpiry';

async function getValidToken(): Promise<string> {
  const now = Date.now();
  let [token, expiry] = await AsyncStorage.multiGet([TOKEN_KEY, EXPIRY_KEY])
    .then(pairs => pairs.map(([, v]) => v));

  if (!token || (expiry && now >= +expiry)) {
    // Renueva token
    const resp = await fetch(`${BASE_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'encriptados',
        password: 'Ftts nz44 lqsB SDSu nX0T mEHf'
      }),
    });
    if (!resp.ok) throw new Error(`Login falló: ${resp.status}`);
    const data = await resp.json();
    token = data.token;
    expiry = String(now + 1000 * 60 * 60 * 3); // +3 h
    await AsyncStorage.multiSet([[TOKEN_KEY, token], [EXPIRY_KEY, expiry]]);
    console.log('🔄 Token renovado.');
  } else {
    console.log('🔓 Token válido.');
  }
  return token!;
}

export async function apiFetch<T>(
  endpoint: string,
  opts: RequestInit = {}
): Promise<T> {
  const token = await getValidToken();
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status} en ${endpoint}: ${text}`);
  }
  return await res.json();
}
