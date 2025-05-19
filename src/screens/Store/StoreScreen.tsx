// src/screens/Store/StoreScreen.tsx
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { ThemeCustom } from '@/config/theme2';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';

import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import FilterMenu from '@/components/molecules/FilterMenu/FilterMenu';
import ProductsSimSection from '@/components/organisms/ProductsSimSection/ProductsSimSection';
import ProductsAplicationSection from '@/components/organisms/ProductsApplicationSection/ProductsApplicationSection';
import ProductsSystemsSection from '@/components/organisms/ProductsSystemsSection/ProductsSystemsSection';
import ProductsRoutersSection from '@/components/organisms/ProductsRoutersSection/ProductsRoutersSection';
// import ProductsPhoneSection from '@/components/organisms/ProductsPhoneSection/ProductsPhoneSection';
import { useAppSelector } from '@/hooks/hooksStoreRedux';
import { SECTIONS } from '@/features/menuCurrentProduct/menuCurrentProductSlice';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';

export default function StoreScreen() {
  console.log('🛑 [StoreScreen] Start render');

  const navigation = useNavigation();
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const [query, setQuery] = useState('');
  const { t } = useTranslation();

  // Obtiene la sección actual
  const currentSection = useAppSelector(state => state.menuCurrentProduct.currentProduct);
  console.log('🛑 [StoreScreen] currentSection:', currentSection);

  // Configura título en cabecera
  useLayoutEffect(() => {
    console.log('🛑 [StoreScreen] useLayoutEffect set title');
    navigation.setOptions({
      title: t('pages.home-tab.ourProducts'),
    });
  }, [navigation, t]);

  // Elige componente según sección
   let SectionComponent = null;
  if (currentSection === SECTIONS.SIM) {
    console.log('🛑 [StoreScreen] Showing ProductsSimSection');
    SectionComponent = <ProductsSimSection />;
  } else if (currentSection === SECTIONS.APPLICATION) {
    console.log('🛑 [StoreScreen] Showing ProductsAplicationSection');
    SectionComponent = <ProductsAplicationSection />;
  } else if (currentSection === SECTIONS.SYSTEMS) {
   SectionComponent = <ProductsSystemsSection />;
   console.log('🛑 [StoreScreen] Showing ProductsSystemsSection');
//  } else if (currentSection === SECTIONS.ROUTERS) {
//    SectionComponent = <ProductsRoutersSection />;
//    console.log('🛑 [StoreScreen] Showing ProductsRoutersSection');
  // } else if (currentSection === SECTIONS.PHONE) {
  //   console.log('🛑 [StoreScreen] Showing ProductsPhoneSection');
  //   SectionComponent = <ProductsPhoneSection />;
  } else {
    console.log('🛑 [StoreScreen] No Section matched');
  }

  const handleSearch = () => {
    // lanzar búsqueda o filtrado con `query`
    console.log('Buscando:', query);
  };
  
  return (
    <ScrollView
      nestedScrollEnabled
      style={[
        styles.scroll,
        { backgroundColor: colors.background }
      ]}
    >
      <HeaderEncrypted title={t('pages.home-tab.ourProducts')} settingsLink="SettingsMain" />

      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmit={handleSearch}
      />

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
