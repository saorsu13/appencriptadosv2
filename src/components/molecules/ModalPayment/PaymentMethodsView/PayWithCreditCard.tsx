// src/components/molecules/ModalPayment/PaymentMethodsView/PayWithCreditCard.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { createPaymentIntent } from '@/api/paymentsApi';

interface PayWithCreditCardProps {
  productId: string;
  closeModal: () => void;
  languageCode: string;
}

export default function PayWithCreditCard({
  productId,
  closeModal,
  languageCode,
}: PayWithCreditCardProps) {
  const { confirmPayment } = useStripe();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Al montar el componente, creamos el PaymentIntent
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { clientSecret } = await createPaymentIntent({
          productId,
          // Si quieres mandar cantidad, moneda, cupones, inclúyelos aquí
        });
        setClientSecret(clientSecret);
      } catch (err: any) {
        console.log('❌ Error creando PaymentIntent:', err.message);
        setErrorMessage(
          languageCode === 'es'
            ? 'No se pudo iniciar el pago. Intenta más tarde.'
            : 'Could not start payment. Try again later.'
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [productId, languageCode]);

  const handleConfirmPayment = async () => {
    if (!clientSecret) return;
    setLoading(true);
    setErrorMessage('');
    try {
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            // Opcional: puedes pedir nombre, email, etc.
            name: 'Cliente Demo',
          },
        },
      });
      if (error) {
        console.log('❌ Error confirmPayment:', error);
        setErrorMessage(error.message || 'Error en el pago.');
      } else if (paymentIntent) {
        if (
          paymentIntent.status === 'Succeeded' ||
          paymentIntent.status === 'succeeded'
        ) {
          closeModal();
          alert(
            languageCode === 'es'
              ? '¡Pago exitoso con Stripe! 🎉'
              : 'Payment with Stripe succeeded! 🎉'
          );
        } else {
          setErrorMessage(
            `⚠️ Estado: ${paymentIntent.status}. Si se atora, intenta otra tarjeta.`
          );
        }
      }
    } catch (err: any) {
      console.log('❌ Excepción al confirmar pago:', err.message);
      setErrorMessage('Error inesperado, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Si todavía estamos esperando clientSecret, mostramos spinner
  if (loading && !clientSecret) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#10B4E7" />
        <Text style={styles.loaderText}>
          {languageCode === 'es' ? 'Iniciando pago...' : 'Starting payment...'}
        </Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* CardField de Stripe */}
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: languageCode === 'es' ? '4242 4242 4242 4242' : '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={styles.cardField}
      />

      <TouchableOpacity
        style={styles.payButton}
        onPress={handleConfirmPayment}
        disabled={loading || !clientSecret}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.payButtonText}>
            {languageCode === 'es' ? 'Pagar con Tarjeta' : 'Pay with Card'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  loaderContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loaderText: {
    marginTop: 8,
    fontSize: 14,
    color: '#FFFFFF',
  },
  cardField: {
    height: 50,
    marginVertical: 12,
  },
  payButton: {
    backgroundColor: '#10B4E7',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  errorContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
  },
});
