import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/config/theme';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import { alertStyles as styles } from './AlertStyles';

type Props = {
  message?: string;
  type: 'warning' | 'error' | 'info';
  description: string;
  showIcon?: boolean;
};

export default function Alert({
  message,
  type,
  description,
  showIcon = false,
}: Props) {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const { colors } = useTheme<Theme>();

  const textColor = type === 'warning'
    ? colors.warningText
    : colors.contrast;

  const backgroundColor = isDark
    ? colors.darkBlack03
    : "#f8eac8";

  const icon = type === 'warning'
    ? <IconSvg color={colors.warningIcon} type="verificationwarning" width={25} height={25}/>
    : null;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {showIcon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.content}>
        {message != null && (
          <Text style={[styles.title, { color: textColor }]}>
            {message}
          </Text>
        )}
        <Text style={[styles.description, { color: textColor }]}>
          {description}
        </Text>
      </View>
    </View>
  );
}
