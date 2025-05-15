// src/components/organisms/ProductsSystemsSection/ProductsSystemsSection.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';

export default function ProductsSystemsSection() {
  const { t } = useTranslation();
  const { colors } = useTheme<ThemeCustomType>();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.primaryText }]}>
        {/* Aquí va tu lógica real de “Sistemas” */}
        {t('pages.home-tab.systemsPlaceholder') /* “Sistemas Section” */}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: '600'
  }
});
