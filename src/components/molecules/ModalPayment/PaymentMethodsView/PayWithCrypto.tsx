// src/components/molecules/ModalPayment/PaymentMethodsView/PayWithCrypto.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { createCryptomusInvoice } from '@/api/cryptomusApi';

interface PayWithCryptoProps {
  productId: string;
  closeModal: () => void;
  languageCode: string;
}

export default function PayWithCrypto({
  productId,
  closeModal,
  languageCode,
}: PayWithCryptoProps) {
  const [payUrl, setPayUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showWebView, setShowWebView] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { payUrl } = await createCryptomusInvoice({ productId });
        setPayUrl(payUrl);
        setShowWebView(true);
      } catch (err: any) {
        console.log('❌ Error creando invoice Cryptomus:', err.message);
        setErrorMessage(
          languageCode === 'es'
            ? 'No se pudo iniciar pago con Cryptomus.'
            : 'Could not start Cryptomus payment.'
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [productId, languageCode]);

  if (loading && !payUrl) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#10B4E7" />
        <Text style={styles.loaderText}>
          {languageCode === 'es' ? 'Generando pago...' : 'Generating payment...'}
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

  if (showWebView && payUrl) {
    return (
      <View style={styles.webviewWrapper}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            setShowWebView(false);
            closeModal();
          }}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <WebView
          source={{ uri: payUrl }}
          style={styles.webview}
          startInLoadingState
          renderLoading={() => (
            <ActivityIndicator size="large" color="#10B4E7" style={{ flex: 1 }} />
          )}
          onNavigationStateChange={(navState) => {
            // Opcional: si Cryptomus redirige a un successUrl o cancelUrl,
            // detectamos navState.url y cerramos el modal
            // Ejemplo (asumiendo que tu backend pone callback a “/success”):
            if (navState.url.includes('/success')) {
              closeModal();
              alert(
                languageCode === 'es'
                  ? '¡Pago con Cryptomus exitoso! 🎉'
                  : 'Cryptomus payment successful! 🎉'
              );
            }
          }}
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loaderText: {
    marginTop: 8,
    fontSize: 14,
    color: '#FFFFFF',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
  },
  webviewWrapper: {
    height: 400,
    marginVertical: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    zIndex: 10,
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  webview: {
    flex: 1,
  },
});
