import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { ThemeCustom } from '@/config/theme2';

/**
 * Pantalla básica inicial para la sección de SIM's.
 */
export default function SimsScreen() {
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];
  const backgroundColor = theme.colors.background;
  const textColor = theme.colors.primaryText;

  return (
    <View style={[styles.container, { backgroundColor }]}>      
      <Text style={[styles.title, { color: textColor }]}>SIM's Screen</Text>
      <Text style={[styles.subtitle, { color: textColor }]}>
        Aquí irá el contenido de la sección de SIM's.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
