// src/api/cryptomusApi.ts
import api from '@/config/api';

interface CreateInvoicePayload {
  productId: string;
  // Si envías monto, moneda, callbackUrl, etc., agrégalos
}

interface CreateInvoiceResponse {
  payUrl: string;
}

export const createCryptomusInvoice = async (
  payload: CreateInvoicePayload
): Promise<CreateInvoiceResponse> => {
  const response = await api.post<CreateInvoiceResponse>(
    'cryptomus/create-invoice',
    payload
  );
  if (!response.ok || !response.data) {
    throw new Error(
      response.problem || 'Error creando invoice en Cryptomus'
    );
  }
  return response.data;
};

// 🔍 Explicación

// Damos por hecho que tu backend expone POST /wp-json/api/v1/cryptomus/create-invoice que recibe { productId } y responde { payUrl }.

// El payUrl es la URL a la que debes redirigir al usuario para que complete el pago con Cryptomus.


// POST /wp-json/api/v1/cryptomus/create-invoice

// Body: { productId: string }

// Responde: { payUrl: string }