// src/screens/Home/SettingsMain/CreateAccessPasswordH.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeCustom } from '@/config/theme2';
import { useDarkModeTheme } from '@/context/theme';
import { useMenu } from '@/context/menuprovider';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
// import PinInputScreen from '@/components/molecules/PinInputScreen/PinInputScreen';

export default function CreateAccessPassword() {
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];
  const backgroundColor = theme.colors.background;
  const { isMenuVisible } = useMenu();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {isMenuVisible && (
        <HeaderEncrypted iconBack="SettingsMain" />
      )}
      {/* <PinInputScreen mode="create"/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
