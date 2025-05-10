// src/components/molecules/FilterMenu/FilterMenu.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useAppSelector, useAppDispatch } from '@/hooks/hooksStoreRedux';
import { SECTIONS, setProduct } from '@features/menuCurrentProduct/menuCurrentProductSlice';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { ThemeCustom } from '@/config/theme2';
import { t } from 'i18next';

export default function FilterMenu() {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const selectedValue = useAppSelector(state => state.menuCurrentProduct.currentProduct);
  const dispatch = useAppDispatch();

  return (
    <View style={[styles.menuContainer, { backgroundColor: colors.backgroundAlternate }]}>
      <TouchableOpacity
        style={[
          styles.menuItem,
          selectedValue === SECTIONS.APPLICATION && { backgroundColor: colors.backgroundSecondary },
        ]}
        onPress={() => dispatch(setProduct(SECTIONS.APPLICATION))}
      >
        <Text
          allowFontScaling={false}
          style={[
            styles.menuText,
            selectedValue === SECTIONS.APPLICATION && { color: colors.primaryText },
          ]}
        >
          Apps
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItem,
          selectedValue === SECTIONS.SIM && { backgroundColor: colors.backgroundSecondary },
        ]}
        onPress={() => dispatch(setProduct(SECTIONS.SIM))}
      >
        <Text
          allowFontScaling={false}
          style={[
            styles.menuText,
            selectedValue === SECTIONS.SIM && { color: colors.primaryText },
          ]}
        >
          SIMs
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItem,
          selectedValue === SECTIONS.PHONE && { backgroundColor: colors.backgroundSecondary },
        ]}
        onPress={() => dispatch(setProduct(SECTIONS.PHONE))}
      >
        <Text
          allowFontScaling={false}
          style={[
            styles.menuText,
            selectedValue === SECTIONS.PHONE && { color: colors.primaryText },
          ]}
        >
          {t('pages.home-tab.cellPhone')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    columnGap: 10,
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  menuItem: {
    height: 60,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  menuText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
