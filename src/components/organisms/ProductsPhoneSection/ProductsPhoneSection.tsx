// src/components/organisms/ProductsPhoneSection/ProductsPhoneSection.tsx
import React from 'react';
import { View, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import type { ThemeCustomType } from '@/config/theme2';
import { Product } from '@/features/product/types';

import ListOfProductCards from '@/components/molecules/ListOfProductCards/ListOfProductCards';
import SkeletonGrid from '@/components/molecules/SkeletonContent/SkeletonGrid';
import { getProducts } from '@/api/productsTab';
import { styles } from './ProductsPhoneSectionStyles';
import { getSecureProductsByCategory, ProductSecure } from '@/api/productsSecure';

/**
 * Sección de Productos para teléfono
 */
export default function ProductsPhoneSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { colors } = useTheme<ThemeCustomType>();

  // Query de productos categoría 'mobile'

  const { data: productsSim, isFetching } = useQuery<ProductSecure[]>({
    queryKey: ['productsSimSecure', 35], 
    queryFn: () => getSecureProductsByCategory(35),
    staleTime: 0,
  });
  const PhoneBanner = require('@/assets/img/phoneban.png');

  return (
    <>
      <View style={styles.bannerContainer}>
        <Image
          source={PhoneBanner}
          resizeMode="cover"
          style={styles.bannerImage}
        />
      </View>

      <View style={styles.listContainer}>
        {isFetching ? (
          <View style={styles.loader}>
            <SkeletonGrid
              widthImage={100}
              heightImage={95}
              columns={1}
              rows={2}
              gap={12}
              borderRadius={5}
              boneColor="rgba(255, 255, 255, 0.25)"
            />
          </View>
        ) : (
          productsSim && productsSim.length > 0 && (
            <ListOfProductCards
              heightImage={70}
              widthImage={70}
              list={productsSim.map(p => ({
                id: p.id,
                title: p.name,
                price: parseFloat(p.price) || 0,
                currency: 'USD', // O leerlo de meta_data si quieres
                image: p.images[0]?.src || '',
                category: p.categories[0]?.name || '',
                description: p.short_description || '', // ✅ ahora sí
                banner: '', // 🧹 no viene en ProductSecure, le ponemos string vacío
                features: [], // 🧹 si quieres luego parseamos de meta_data
                advantages: [], // 🧹 igual
                generaltitle: '', // 🧹 igual
                generaldescription: '', // 🧹 igual
                faqs: [], // 🧹 igual
              }))}

              type="product"
            />
          )
        )}
      </View>
    </>
  );
}
