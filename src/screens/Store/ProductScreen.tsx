// src/screens/Product/ProductScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ProductTabParamList } from '@/navigation/ProductTabsNavigator';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';
import { t } from 'react-i18next';

// Props tipadas para la pantalla ProductInfo
type Props = NativeStackScreenProps<ProductTabParamList, 'ProductInfo'>;

export default function ProductInfoScreen({ route }: Props) {
  const { id } = route.params;
  const { colors } = useTheme<ThemeCustomType>();

  // TODO: usar getProductsById o hook para obtener datos del producto

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>      
      <Text style={[styles.title, { color: colors.primaryText }]}>        
        {t('pages.home-tab.productDetail')}      
      </Text>      
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>        
        {t('pages.home-tab.productId')}: {id}      
      </Text>    
    </View>  );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
