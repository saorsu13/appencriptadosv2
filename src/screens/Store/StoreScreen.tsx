// src/screens/Store/StoreScreen.tsx
import React, { useLayoutEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { ThemeCustom } from '@/config/theme2';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';

import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import FilterMenu from '@/components/molecules/FilterMenu/FilterMenu';
import ProductsSimSection from '@/components/organisms/ProductsSimSection/ProductsSimSection';
// import ProductsAplicationSection from '@/components/organisms/ProductsAplicationSection/ProductsAplicationSection';
// import ProductsPhoneSection from '@/components/organisms/ProductsPhoneSection/ProductsPhoneSection';
import { useAppSelector } from '@/hooks/hooksStoreRedux';
import { SECTIONS } from '@/features/menuCurrentProduct/menuCurrentProductSlice';

export default function StoreScreen() {
  const navigation = useNavigation();
  const { themeMode } = useDarkModeTheme();
    const isDark = themeMode === ThemeMode.Dark;
    const theme = ThemeCustom[themeMode];
    const { colors } = theme;
  const { t } = useTranslation();

  // Obtiene la sección actual
  const currentSection = useAppSelector(state => state.menuCurrentProduct.currentProduct);

  // Configura título en cabecera
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('pages.home-tab.ourProducts'),
    });
  }, [navigation, t]);

  // Elige componente según sección
  let SectionComponent = null;
  if (currentSection === SECTIONS.SIM) {
    SectionComponent = <ProductsSimSection />;
  } else if (currentSection === SECTIONS.APPLICATION) {
    // SectionComponent = <ProductsAplicationSection />;
  } else if (currentSection === SECTIONS.PHONE) {
    // SectionComponent = <ProductsPhoneSection />;
  }

  return (
    <ScrollView
      nestedScrollEnabled
      style={[
        styles.scroll,
        { backgroundColor: colors.background }
      ]}
    >
      <HeaderEncrypted settingsLink="" />

      <View style={styles.titleWrap}>
        <Text style={[styles.titleText, { color: colors.primaryText }]}>  
          {t('pages.home-tab.ourProducts')}
        </Text>
      </View>

      <View style={styles.filterWrap}>
        <FilterMenu />
      </View>

      <View style={styles.sectionWrap}>
        {SectionComponent}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  titleWrap: {
    marginTop: 16,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '600',
  },
  filterWrap: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  sectionWrap: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
