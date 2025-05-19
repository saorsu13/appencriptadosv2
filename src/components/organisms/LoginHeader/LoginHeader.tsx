import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { LoginStyles } from '@/styles/LoginStyles/LoginStyles';

const LoginHeader: React.FC = () => {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const { t } = useTranslation();

  const bg = isDark
    ? require('@/assets/img/login-header.png')
    : require('@/assets/img/login-header-light.png');

  return (
    <View style={LoginStyles.containerHeader}>
      <ImageBackground
        source={bg}
        style={LoginStyles.containerHeaderImage}
        imageStyle={LoginStyles.background}
      >
        <Text style={LoginStyles.containerHeaderTitle}>
          {t('pages.login.header.title')}
        </Text>
        <Text style={LoginStyles.containerHeaderMessage}>
          {t('pages.login.header.message')}
        </Text>
      </ImageBackground>
    </View>
  );
};

export default LoginHeader;