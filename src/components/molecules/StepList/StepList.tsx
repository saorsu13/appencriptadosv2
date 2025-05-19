// src/components/molecules/StepList/StepList.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '@/config/theme';
import { useDarkModeTheme } from '@/hooks/useDarkModeTheme';
import { ThemeMode } from '@/context/theme';

interface StepListProps {
  title: string;
  items: string[];
}

const StepList: React.FC<StepListProps> = ({ title, items }) => {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;

  // Colores según modo
  const backgroundColor = isDark
    ? theme.colors.darkBlack03               // tu fondo oscuro
    : theme.colors.placeholderLightBackground;  // p.ej. #F8F8F8 en claro

  const textColor = isDark
    ? theme.colors.listTitle       // color para título en oscuro
    : theme.colors.mainText        // color principal en claro

  const itemColor = isDark
    ? theme.colors.contentSummary  // color de ítem en oscuro
    : theme.colors.mainText;       // mismo color en claro

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text allowFontScaling={false} style={[styles.title, { color: textColor }]}>
        {title}
      </Text>

      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <Text allowFontScaling={false} style={[styles.itemIndex, { color: itemColor }]}>
            {index + 1}.
          </Text>
          <Text allowFontScaling={false} style={[styles.itemText, { color: itemColor }]}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default StepList;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 14,
    marginVertical: 8,
  },
  title: {
    ...theme.textVariants.titleList,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  itemIndex: {
    ...theme.textVariants.titleList,
    marginRight: 6,
  },
  itemText: {
    ...theme.textVariants.captionCard,
    flex: 1,
  },
});