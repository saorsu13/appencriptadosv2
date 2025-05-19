// src/screens/Home/SettingsMain/SettingsMain.tsx

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { useAppSelector } from '@/hooks/hooksStoreRedux';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import SettingsMenuItem from '@/components/molecules/SettingsMenuItem/SettingsMenuItem';
import theme from '@/config/theme';

const baseMsg = 'pages.settings';

export default function SettingsMain() {
  const { themeMode, toggleThemeMode } = useDarkModeTheme();
  const { t } = useTranslation();
  const currentLang = useAppSelector((state) => state.settings.lang);
  const navigation = useNavigation<
    NativeStackNavigationProp<RootStackParamList, 'Settings'>
  >();

  const backgroundColor =
    themeMode === ThemeMode.Light
      ? theme.lightMode.colors.white
      : theme.colors.mainBackground;

  return (
    <ScrollView
      style={[{ backgroundColor }]}
      contentContainerStyle={styles.container}
    >
      <HeaderEncrypted
        owner="encriptados"
        title={t('pages.settings.title')}
        iconBack={() => navigation.goBack()}
      />

      <View style={styles.containerBody}>
        <SettingsMenuItem
          title={t(`${baseMsg}.language`)}
          value={t(`${baseMsg}.${currentLang}`)}
          path="LanguageConf"
        />

        <SettingsMenuItem
          title={t('pages.home.requiredpassword')}
          path="AccessPassword"
        />
         <SettingsMenuItem
          title={t(`${baseMsg}.theme`)}
          value={
            themeMode === ThemeMode.Light
              ? t(`${baseMsg}.lightMode`)
              : t(`${baseMsg}.darkMode`)
          }
          onPress={toggleThemeMode}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  containerBody: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 15,
    gap: 10,
  },
});
