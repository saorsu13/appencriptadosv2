// src/api/subscriberApi.ts
import { SubscriberResponse } from '@/types/subscriber';

const API_BASE_URL = 'https://encriptados.es/wp-json/encriptados/v1';

export const getSubscriberData = async (
  id: string
): Promise<SubscriberResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
      body: JSON.stringify({
        id,
        currency_code: '',
        country: '',
      }),
    });

    if (!response.ok) {
      throw new Error(`❌ Error en el request: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.providers?.length) {
      console.warn('⚠️ Respuesta vacía o sin providers.');
      return { providers: [] };
    }

    return {
      providers: data.providers,
    };
  } catch (error) {
    console.error('🚨 Error en getSubscriberData:', error);
    throw error;
  }
};
