// App.tsx
import 'src/config/i18n/i18n';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider as RestyleProvider } from '@shopify/restyle';
import AppNavigator from './src/navigation/AppNavigator';
import { DarkModeProvider, useDarkModeTheme } from './src/context/theme';
import { ThemeCustom } from './src/config/theme2';
import { Provider } from 'react-redux';
import { store } from './src/store'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ModalPaymentProvider } from '@/context/modalpayment';
import ModalPaymentController from '@/components/molecules/ModalPayment/ModalPaymentController';

// Este componente interno lee el modo y aplica el theme correcto
function Root() {
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];

  const queryClient = React.useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <RestyleProvider theme={theme}>
          <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
          <AppNavigator />
          <ModalPaymentController />
      </RestyleProvider>
    </QueryClientProvider>
  );
}

export default function App() {
  return (
     <SafeAreaProvider>
      <DarkModeProvider>
        <Provider store={store}>
          <ModalPaymentProvider> 
            <Root />
          </ModalPaymentProvider>
        </Provider>
      </DarkModeProvider>
    </SafeAreaProvider>
  );
}
