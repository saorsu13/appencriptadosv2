// src/components/molecules/SettingsMenuItem/SettingsMenuItem.tsx

import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import theme from '@/config/theme';

type Props = {
  title: string;
  value?: string;
  path?: string;         // ahora opcional, porque usaremos onPress directo
  onPress?: () => void; // prop para callback personalizado
};

export default function SettingsMenuItem({
  title,
  value,
  path,
  onPress: customOnPress,
}: Props) {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const navigation = useNavigation<NavigationProp<any>>();

  // decide qué hacer al pulsar: tu onPress o navegar a path
  const handlePress = () => {
    if (customOnPress) {
      customOnPress();
    } else if (path) {
      navigation.navigate(path);
    }
  };

  // estilos dinámicos
  const containerBodyStyle: ViewStyle = {
    ...styles.containerBody,
    backgroundColor: isDark
      ? theme.colors.darkBlack01
      : theme.lightMode.colors.blueLight,
    borderColor: isDark
      ? theme.colors.darkBlack01
      : theme.lightMode.colors.borderBlueLight,
  };

  const titleStyle: TextStyle = {
    ...styles.title,
    color: isDark
      ? theme.colors.contrast
      : theme.lightMode.colors.blueDark,
  };

  const valueStyle: TextStyle = {
    ...styles.value,
    color: isDark
      ? theme.colors.SettingsOptionItemValue
      : theme.lightMode.colors.blueDark,
  };

  const arrowStyle: ViewStyle = {
    ...styles.arrow,
    borderColor: isDark
      ? theme.colors.contrast
      : theme.lightMode.colors.blueDark,
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={containerBodyStyle}>
        <Text allowFontScaling={false} style={titleStyle}>
          {title}
        </Text>
        <View style={styles.settingValue}>
          {value != null && (
            <Text allowFontScaling={false} style={valueStyle}>
              {value}
            </Text>
          )}
          <View style={arrowStyle} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  containerBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    paddingVertical: 20,
    borderWidth: 0.5,
    borderRadius: 14,
  },
  title: {
    ...theme.textVariants.captionCard,
  },
  value: {
    ...theme.textVariants.small,
    fontWeight: '600',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    transform: [{ rotate: '45deg' }],
    marginLeft: 10,
  },
});
