// src/screens/Balance/BalanceSettings/DeleteAccessPassword.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeCustom } from '@/config/theme2';
import { useMenu } from '@/context/menuprovider';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import PinInputDeleteScreen from '@/components/molecules/PinInputScreen/PinInputDeleteScreen';
import { useDarkModeTheme } from '@/context/theme';

export default function DeleteAccessPassword() {
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const { isMenuVisible } = useMenu();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isMenuVisible && (
        <HeaderEncrypted iconBack="BalanceSettings" />
      )}
      <PinInputDeleteScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
