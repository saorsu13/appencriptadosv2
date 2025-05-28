// App.tsx
import 'src/config/i18n/i18n';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from '@/context/menuprovider';
import { DarkModeProvider, useDarkModeTheme } from './src/context/theme';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { ModalPaymentProvider } from '@/context/modalpayment';
import { ModalProvider } from '@/context/modal';
import AppNavigator from './src/navigation/AppNavigator';
import ModalPaymentController from '@/components/molecules/ModalPayment/ModalPaymentController';
import ModalController from '@/context/ModalController';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as RestyleProvider } from '@shopify/restyle';
import { ThemeCustom } from './src/config/theme2';
import { StatusBar } from 'expo-status-bar';

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
        <ModalController />
      </RestyleProvider>
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <DarkModeProvider>
          <Provider store={store}>
            <ModalPaymentProvider>
              <ModalProvider>
                <Root />
              </ModalProvider>
            </ModalPaymentProvider>
          </Provider>
        </DarkModeProvider>
      </MenuProvider>
    </SafeAreaProvider>
  );
}
