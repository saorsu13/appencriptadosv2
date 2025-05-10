// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider as RestyleProvider } from '@shopify/restyle';
import AppNavigator from './src/navigation/AppNavigator';
import { DarkModeProvider, useDarkModeTheme } from './src/context/theme';
import { ThemeCustom } from './src/config/theme2';
import { Provider } from 'react-redux';
import { store } from './src/store'; 

// Este componente interno lee el modo y aplica el theme correcto
function Root() {
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];

  return (
    <RestyleProvider theme={theme}>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      <AppNavigator />
    </RestyleProvider>
  );
}

export default function App() {
  return (
    <DarkModeProvider>
      <Provider store={store}>
        <Root />
      </Provider>
    </DarkModeProvider>
  );
}
