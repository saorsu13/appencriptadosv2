// src/components/molecules/FilterMenu/FilterMenu.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '@/hooks/hooksStoreRedux';
import { SECTIONS, setProduct } from '@features/menuCurrentProduct/menuCurrentProductSlice';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { ThemeCustom } from '@/config/theme2';
import { t } from 'i18next';

const SECTION_IDS: Record<string, number> = {
  [SECTIONS.APPLICATION]: 38,
  [SECTIONS.SIM]: 40,
  [SECTIONS.PHONE]: 35,
  [SECTIONS.ROUTERS]: 36,
};

export default function FilterMenu() {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const selectedValue = useAppSelector(state => state.menuCurrentProduct.currentProduct);
  const dispatch = useAppDispatch();

  const handlePress = (section: string) => {
    dispatch(setProduct(section));
    
    const sectionId = SECTION_IDS[section];
    console.log(`🛑 [FilterMenu] Selected section: ${section}, with ID: ${sectionId}`);

  };

  return (
    <View style={[styles.menuContainer, { backgroundColor: colors.backgroundAlternate }]}>
      <TouchableOpacity
        style={[
          styles.menuItem,
          selectedValue === SECTIONS.APPLICATION && { backgroundColor: colors.white },
        ]}
        onPress={() => handlePress(SECTIONS.APPLICATION)}
      >
        <Text
          allowFontScaling={false}
          style={[
            styles.menuText,
            selectedValue === SECTIONS.APPLICATION
              ? { color: '#000000' }
              : { color: colors.secondaryText },
          ]}
        >
          Apps
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItem,
          selectedValue === SECTIONS.SIM && { backgroundColor: colors.white },
        ]}
        onPress={() => handlePress(SECTIONS.SIM)}
      >
        <Text
          allowFontScaling={false}
          style={[
            styles.menuText,
            selectedValue === SECTIONS.SIM
              ? { color: '#000000' }
              : { color: colors.secondaryText },
          ]}
        >
          SIMs
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItem,
          selectedValue === SECTIONS.PHONE && { backgroundColor: colors.white },
        ]}
        onPress={() => handlePress(SECTIONS.PHONE)}
      >
        <Text
          allowFontScaling={false}
          style={[
            styles.menuText,
            selectedValue === SECTIONS.PHONE
              ? { color: '#000000' }
              : { color: colors.secondaryText },
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
    justifyContent: 'space-around',
    alignItems: 'center',
    columnGap: 10,
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  menuItem: {
    height: 50,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  menuText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
