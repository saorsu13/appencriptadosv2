// src/screens/Home/SettingsMain/DeleteAccessPasswordH.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { ThemeCustom } from '@/config/theme2';
import { useDarkModeTheme } from '@/context/theme';
import { useMenu } from '@/context/menuprovider';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import PinInputDeleteScreenHome from '@/components/molecules/PinInputScreenHome/PinInputDeleteScreenHome';

export default function DeleteAccessPassword() {
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];
  const backgroundColor = theme.colors.background;
  const { isMenuVisible } = useMenu();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {isMenuVisible && (
        <HeaderEncrypted iconBack="SettingsMain" />
      )}
      <PinInputDeleteScreenHome mode="delete"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
