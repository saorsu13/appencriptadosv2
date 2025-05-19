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
import MenuIcon from '@/assets/icons/MenuIcon';
import UserCircleIcon from '@/assets/icons/UserCircleIcon';

const rawOwner =
  Constants.manifest?.owner ||
  Constants.expoConfig?.owner ||
  'encriptados';

const { width: screenWidth } = Dimensions.get('window');

type HeaderEncryptedProps = {
  iconBack?: string | (() => void);
  title?: string;
  settingsLink?: string;
  owner?: 'app-fantasma' | 'encriptados';
};

export default function HeaderEncrypted({
  iconBack,
  title,
  settingsLink,
  owner,
}: HeaderEncryptedProps) {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<Record<string, { simId?: string }>, string>>();
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const currentSim = useAppSelector((s) => s.sims.currentSim);
  const insets = useSafeAreaInsets();

  // Elegimos color de fondo según el modo
  const buttonBg = themeMode === ThemeMode.Dark ? '#3E3E3E' : '#10B4E7';

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
  };

  // Handler de volver
  const handleBack = () => {
    if (typeof iconBack === 'function') {
      iconBack();
    } else if (typeof iconBack === 'string') {
      navigation.navigate(iconBack);
    } else {
      navigation.goBack();
    }
  };

  // Handler de settings
  const handleSettings = () => {
    if (settingsLink) {
      navigation.navigate('Settings', {
        screen: 'SettingsMain',
      });
    }
  };

  const goToLoginStore = () => {
     navigation.navigate('LoginStore');
   };

  // Decidir qué botón mostrar y si mostrarlo
  let LeftButton: React.ReactNode = null;
  if (iconBack) {
    // Si me pasaron iconBack
    LeftButton = (
      <TouchableOpacity
        style={[styles.iconButton, { backgroundColor: buttonBg }]}
        onPress={handleBack}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <IconSvg type="arrowback" width={20} height={20} color={colors.white} />
      </TouchableOpacity>
    );
  } else if (settingsLink) {
    // Si solo me pasaron settingsLink
    LeftButton = (
      <TouchableOpacity
        style={[styles.iconButton, { backgroundColor: buttonBg }]}
        onPress={handleSettings}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <MenuIcon width={20} height={25} color={colors.white} />
      </TouchableOpacity>
    );
  }
  // Si no hay iconBack ni settingsLink, LeftButton queda null

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {LeftButton}

      <View style={styles.titleWrap}>
        {title ? (
          <Text
            style={[
              styles.titleText,
              { color: isDark ? colors.white : colors.neutro },
            ]}
          >
            {title}
          </Text>
        ) : (
          getLogo()
        )}
      </View>

      <TouchableOpacity
        style={[styles.iconButton, { backgroundColor: buttonBg }]}
        onPress={goToLoginStore}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <UserCircleIcon width={20} height={20} color={colors.white} />
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
    borderRadius: 8,
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
