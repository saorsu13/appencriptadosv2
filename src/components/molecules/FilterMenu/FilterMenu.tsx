// src/components/molecules/FilterMenu/FilterMenu.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
      {/* Apps */}
      <TouchableOpacity
        style={[styles.menuItem, selectedValue === SECTIONS.APPLICATION && { backgroundColor: colors.white }]}
        onPress={() => dispatch(setProduct(SECTIONS.APPLICATION))}
      >
        <Text style={[styles.menuText, selectedValue === SECTIONS.APPLICATION ? { color: '#000' } : { color: colors.secondaryText }]}>
          Apps
        </Text>
      </TouchableOpacity>

      {/* SIMs */}
      <TouchableOpacity
        style={[styles.menuItem, selectedValue === SECTIONS.SIM && { backgroundColor: colors.white }]}
        onPress={() => dispatch(setProduct(SECTIONS.SIM))}
      >
        <Text style={[styles.menuText, selectedValue === SECTIONS.SIM ? { color: '#000' } : { color: colors.secondaryText }]}>
          SIMs
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={[
          styles.menuItem,
          selectedValue === SECTIONS.PHONE && { backgroundColor: colors.white },
        ]}
        onPress={() => dispatch(setProduct(SECTIONS.PHONE))}
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
      </TouchableOpacity> */}

      {/* Sistemas */}
     <TouchableOpacity
       style={[styles.menuItem, selectedValue === SECTIONS.SYSTEMS && { backgroundColor: colors.white }]}
       onPress={() => dispatch(setProduct(SECTIONS.SYSTEMS))}
     >
       <Text style={[styles.menuText, selectedValue === SECTIONS.SYSTEMS ? { color: '#000' } : { color: colors.secondaryText }]}>
         Sistemas
       </Text>
     </TouchableOpacity>

     {/* Routers */}
     <TouchableOpacity
       style={[styles.menuItem, selectedValue === SECTIONS.ROUTERS && { backgroundColor: colors.white }]}
       onPress={() => dispatch(setProduct(SECTIONS.ROUTERS))}
     >
       <Text style={[styles.menuText, selectedValue === SECTIONS.ROUTERS ? { color: '#000' } : { color: colors.secondaryText }]}>
         Routers
       </Text>
     </TouchableOpacity>
    </View>
  );
}

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
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
