// src/components/molecules/HeaderEncrypted/HeaderEncrypted.tsx
import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Constants from 'expo-constants';

import IconSvg from '../IconSvg/IconSvg';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { ThemeCustom } from '@/config/theme2';
import { useAppSelector } from '@/hooks/hooksStoreRedux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const rawOwner =
  Constants.manifest?.owner ||
  Constants.expoConfig?.owner ||
  'encriptados';

const { width: screenWidth } = Dimensions.get('window');

type HeaderEncryptedProps = {
  iconBack?: string;
  title?: string;
  settingsLink?: string;
  owner?: 'app-fantasma' | 'encriptados';
};

export default function HeaderEncrypted({
  iconBack = '',
  title,
  settingsLink = '',
  owner,
}: HeaderEncryptedProps) {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<Record<string, { simId?: string }>, string>>();
  const { themeMode, toggleThemeMode: toggleTheme } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const currentSim = useAppSelector((s) => s.sims.currentSim);
  const insets = useSafeAreaInsets();

  // Calculamos el ICCID resuelto...
  const simIdFromParams = route.params?.simId;
  let resolvedSimId: string | undefined;
  if (simIdFromParams) {
    resolvedSimId = simIdFromParams;
  } else if (
    currentSim &&
    typeof currentSim === 'object' &&
    'iccid' in currentSim
  ) {
    resolvedSimId = (currentSim as { iccid: string }).iccid;
  } else if (typeof currentSim === 'string') {
    resolvedSimId = currentSim;
  }

  const resolvedOwner = owner || rawOwner;

  // Handler de navegación atrás
  const handleBack = () => {
    if (iconBack && iconBack !== 'none') {
      navigation.replace(iconBack);
      return;
    }
    if ((currentSim as any)?.provider === 'telco-vision' && resolvedSimId) {
      navigation.replace('Balance', { simId: resolvedSimId });
    } else {
      navigation.replace('Home');
    }
  };

  // Handler de settings
  const handleSettings = () => {
    if (!settingsLink) return;
    navigation.navigate(
      settingsLink,
      resolvedSimId ? { simId: resolvedSimId } : {}
    );
  };

  // Logo dinámico
  const getLogo = () => {
    if (resolvedOwner === 'encriptados') {
      const dynamicWidth = screenWidth < 350 ? 160 : screenWidth < 400 ? 180 : 200;
      const dynamicHeight = (dynamicWidth * 30) / 180;
      return (
        <Image
          source={
            themeMode === ThemeMode.Dark
              ? require('@/assets/img/encriptados_logo_b.png')
              : require('@/assets/img/encriptados_logo.png')
          }
          style={{ width: dynamicWidth, height: dynamicHeight, resizeMode: 'contain' }}
        />
      );
    }
    return (
      <Image
        source={
          themeMode === ThemeMode.Dark
            ? require('@/assets/img/logo-l.png')
            : require('@/assets/img/logo-d.png')
        }
        style={{ width: 230, height: 35, resizeMode: 'contain' }}
      />
    );
  };

  // Elegimos color de fondo según el modo
  const buttonBg = themeMode === ThemeMode.Dark ? '#3E3E3E' : '#10B4E7';

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.backgroundSecondary }]}>
      <TouchableOpacity
        style={[styles.iconButton, { backgroundColor: buttonBg }]}
        onPress={iconBack && iconBack !== 'none' ? handleBack : handleSettings}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <IconSvg
          type={iconBack && iconBack !== 'none' ? 'arrowback' : 'settings'}
          height={iconBack && iconBack !== 'none' ? 20 : 25}
          width={iconBack && iconBack !== 'none' ? 20 : 25}
          color={colors.white}
        />
      </TouchableOpacity>

      <View style={styles.titleWrap}>
        {title ? (
          <Text
            style={[
              styles.titleText,
              { color: isDark ? '#FFFFFF' : '#000000' },
            ]}>
            {title}
          </Text>
        ) : (
          getLogo()
        )}
      </View>

      <TouchableOpacity
        style={[styles.iconButton, { backgroundColor: buttonBg }]}
        onPress={toggleTheme}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <IconSvg type="contrast" width={25} height={25} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
