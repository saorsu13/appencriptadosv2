// src/components/molecules/CardItem/CardItem.tsx

import React, { ReactNode, cloneElement, isValidElement } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import SkeletonContent from '@/components/molecules/SkeletonContent/SkeletonContent';
import { cardItemStyles as styles } from './CardItemStyles';

type Props = {
  icon?: ReactNode;
  title: string;
  message?: string;
  caption?: string;
  style?: Record<string, any>;
  loading?: boolean;
  onClick?: () => void;
};

export default function CardItem({
  icon,
  title,
  message,
  caption,
  style,
  loading = true,
  onClick,
}: Props) {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;

  // color del borde en modo oscuro (debe coincidir con styles.containerBody.borderColor)
  const darkBorderColor = '#00FFC2';

  // Si el icono es un elemento válido, le clona la prop `color` en dark mode
  const coloredIcon = isValidElement(icon)
    ? cloneElement(icon as React.ReactElement<any>, {
        color: isDark ? darkBorderColor : (icon as any).props.color,
      })
    : icon;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onClick}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.containerBody,
          !isDark && styles.containerBodyLight,
        ]}
      >
        {coloredIcon}

        {loading ? (
          <SkeletonContent
            containerStyle={styles.skeletonTitle}
            layout={[{ key: 'title', width: 50, height: 28, borderRadius: 5 }]}
            boneColor="rgba(255,255,255,0.25)"
          />
        ) : (
          <Text style={[styles.title, !isDark && styles.titleLight]}>
            {title}
          </Text>
        )}

        {message && (
          <Text
            style={[
              styles.description,
              !isDark && styles.descriptionLight,
            ]}
          >
            {message}
          </Text>
        )}
      </View>

      {loading ? (
        <SkeletonContent
          containerStyle={styles.skeletonCaption}
          layout={[{ key: 'caption', width: 50, height: 14, borderRadius: 5 }]}
          boneColor="rgba(255,255,255,0.25)"
        />
      ) : (
        <Text style={[styles.caption, !isDark && styles.captionLight]}>
          {caption || ' '}
        </Text>
      )}
    </TouchableOpacity>
  );
}
