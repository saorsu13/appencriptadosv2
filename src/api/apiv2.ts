// src/api/apiv2.ts

const BASE_URL_V2 = "https://encriptados.io/wp-json/wp/v2/";
const JSON_HEADERS = { "Content-Type": "application/json" };

const apiv2 = {
  get: async <T = any>(endpoint: string): Promise<T> => {
    const res = await fetch(`${BASE_URL_V2}${endpoint}`, {
      method: "GET",
      headers: JSON_HEADERS,
    });
    if (!res.ok) throw new Error(`GET ${endpoint} failed (${res.status})`);
    return (await res.json()) as T;
  },

  post: async <T = any, B = any>(endpoint: string, body: B): Promise<T> => {
    const res = await fetch(`${BASE_URL_V2}${endpoint}`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${endpoint} failed (${res.status})`);
    return (await res.json()) as T;
  },
};

export default apiv2;
