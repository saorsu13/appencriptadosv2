// src/navigation/ProductTabsNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsSimSection from '@/components/organisms/ProductsSimSection/ProductsSimSection';
import ProductInfoScreen from '@/screens/Store/ProductScreen';
import { useTranslation } from 'react-i18next';
import { ThemeCustomType } from '@/config/theme2';
import { useTheme } from '@shopify/restyle';

/**
 * Parámetros de navegación para ProductTabs
 */
export type ProductTabParamList = {
  ProductsList: undefined; // Pantalla de lista de productos
  ProductInfo: { id: string }; // Pantalla de información de un producto
};

const Stack = createNativeStackNavigator<ProductTabParamList>();

/**
 * Navigator para la sección de Productos
 */
export default function ProductTabsNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme<ThemeCustomType>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundSecondary },
        headerTintColor: colors.primaryText,
      }}
    >
      <Stack.Screen
        name="ProductsList"
        component={ProductsSimSection}
        options={{ title: t('pages.home-tab.products') }}
      />
      <Stack.Screen
        name="ProductInfo"
        component={ProductInfoScreen}
        options={{ title: t('pages.home-tab.moreInfo') }}
      />
    </Stack.Navigator>
  );
}
