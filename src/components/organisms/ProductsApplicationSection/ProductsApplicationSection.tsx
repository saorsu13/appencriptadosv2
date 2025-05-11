// src/components/organisms/ProductsApplicationSection/ProductsApplicationSection.tsx
import React from 'react';
import { View, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { ThemeCustomType } from '@/config/theme2';

import ListOfProductCards from '@/components/molecules/ListOfProductCards/ListOfProductCards';
import SkeletonGrid from '@/components/molecules/SkeletonContent/SkeletonGrid';
import { getProducts } from '@/api/productsTab';
import { styles } from './ProductsApplicationSectionStyles';
import { Product } from '@/features/product/types';

/**
 * Sección de Productos de Aplicación
 */
export default function ProductsApplicationSection() {

  const { colors } = useTheme<ThemeCustomType>();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Query de productos categoría 'app'
  const { data: productsApp, isFetching } = useQuery<Product[]>({
    queryKey: ['productsApp', currentLanguage],
    queryFn: () => getProducts('app', currentLanguage),
    staleTime: 0,
  });

  // Banner de aplicaciones
  const AppBanner = require('@/assets/img/appban.png');

  const listFormatted: Product[] = productsApp?.map(product => ({
    id: product.id,
    title: product.title,
    price: Number(product.price) ?? 0,
    currency: product.currency ?? '',
    image: product.image ?? '',
    description: product.description ?? '',
    category: product.category ?? 'app',
  })) ?? [];

  return (
    <>
      <View style={styles.bannerContainer}>
        <Image
          source={AppBanner}
          resizeMode="cover"
          style={styles.bannerImage}
        />
      </View>

      <View>
        {isFetching ? (
          <View style={styles.loaderContainer}>
            <SkeletonGrid
              widthImage={70}
              heightImage={70}
              borderRadius={5}
              gap={12}
              columns={2}
              rows={2}
              boneColor="rgba(255, 255, 255, 0.25)"
            />
          </View>
        ) : (
          listFormatted.length > 0 && (
            <View style={styles.listContainer}>
              <ListOfProductCards
                list={listFormatted}
                type="product"
                widthImage={70}
                heightImage={70}
              />
            </View>
          )
        )}
      </View>
    </>
  );
}
