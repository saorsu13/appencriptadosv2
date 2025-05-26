import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '@/hooks/hooksStoreRedux';
import { SECTIONS, setProduct } from '@features/menuCurrentProduct/menuCurrentProductSlice';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { ThemeCustom } from '@/config/theme2';
import { t } from 'i18next';

const FilterMenu = () => {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const selectedValue = useAppSelector(state => state.menuCurrentProduct.currentProduct);
  const dispatch = useAppDispatch();

  const menuItems = [
    { label: t('filterMenu.apps'), value: SECTIONS.APPLICATION },
    { label: t('filterMenu.simCards'), value: SECTIONS.SIM },
    { label: t('filterMenu.systems'), value: SECTIONS.SYSTEMS },
    // { label: t('pages.home-tab.routers'), value: SECTIONS.ROUTERS },
  ];

  return (
    <View style={[styles.menuContainer, { backgroundColor: colors.backgroundAlternate }]}>
      {menuItems.map(({ label, value }) => {
        const isSelected = selectedValue === value;
        return (
          <TouchableOpacity
            key={value}
            style={[
              styles.menuItem,
              isSelected && { backgroundColor: colors.white }
            ]}
            onPress={() => dispatch(setProduct(value))}
          >
            <Text
              allowFontScaling={false}
              style={[
                styles.menuText,
                isSelected ? { color: '#000' } : { color: colors.secondaryText }
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default FilterMenu;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  menuItem: {
    flex: 1,
    marginHorizontal: 2,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  menuText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
