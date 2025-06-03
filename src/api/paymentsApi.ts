// src/api/paymentsApi.ts
import api from '@/config/api';

interface CreatePaymentIntentPayload {
  productId: string;
  // Si necesitas enviar cantidad, cupones u otros datos, agrégalos aquí
}

interface CreatePaymentIntentResponse {
  clientSecret: string;
}

export const createPaymentIntent = async (
  payload: CreatePaymentIntentPayload
): Promise<CreatePaymentIntentResponse> => {
  const response = await api.post<CreatePaymentIntentResponse>(
    'payments/create-payment-intent',
    payload
  );
  if (!response.ok || !response.data) {
    throw new Error(
      response.problem || 'Error creando PaymentIntent en Stripe'
    );
  }
  return response.data;
};

// 🔍 Explicación

// Usamos tu instancia api de apisauce, cuyo baseURL es https://encriptados.io/wp-json/api/v1/.

// Damos por hecho que en tu backend existe la ruta POST /wp-json/api/v1/payments/create-payment-intent que recibe { productId } y contesta { clientSecret }.

// Si tu endpoint es diferente (por ejemplo, /api/payments/...), ajusta la URL en el primer parámetro de api.post().


// Para que este frontend funcione, tu servidor debe exponer:

// Stripe

// POST /wp-json/api/v1/payments/create-payment-intent

// Body: { productId: string } (o { productId, amount, coupon, ... })

// Responde: { clientSecret: string }