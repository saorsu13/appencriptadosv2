// src/screens/Balance/BalanceSettings/CreateAccessPassword.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeCustom } from '@/config/theme2';
import { useMenu } from '@/context/menuprovider';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import PinInputScreen from '@/components/molecules/PinInputScreen/PinInputScreen';
import { useDarkModeTheme } from '@/context/theme';

export default function CreateAccessPassword() {
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const { isMenuVisible } = useMenu();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isMenuVisible && (
        <HeaderEncrypted iconBack="BalanceSettings" />
      )}
      <PinInputScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
