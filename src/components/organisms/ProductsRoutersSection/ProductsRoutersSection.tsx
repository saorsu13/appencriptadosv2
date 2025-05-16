// src/components/organisms/ProductsRoutersSection/ProductsRoutersSection.tsx
import React from 'react';
import { View, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import type { ThemeCustomType } from '@/config/theme2';
import type { ProductSecure } from '@/api/productsSecure';

import ListOfProductCards from '@/components/molecules/ListOfProductCards/ListOfProductCards';
import SkeletonGrid from '@/components/molecules/SkeletonContent/SkeletonGrid';
import { getSecureProductsByCategory } from '@/api/productsSecure';
import { styles } from './ProductsRoutersSectionStyles';

export default function ProductsRoutersSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language; // si más adelante quieres traducir algo
  const { colors } = useTheme<ThemeCustomType>();

  // Query de productos categoría 'routers' (ID 36)
  const { data: productsRouters, isFetching } = useQuery<ProductSecure[]>({
    queryKey: ['productsRoutersSecure', 36],
    queryFn: () => getSecureProductsByCategory(36),
    staleTime: 0,
  });

  // Banner para routers (puedes cambiar la imagen)
  // const RoutersBanner = require('@/assets/img/routerban.png');

  return (
    <>
      <View style={styles.bannerContainer}>
        {/* <Image
          source={RoutersBanner}
          resizeMode="cover"
          style={styles.bannerImage}
        /> */}
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
          productsRouters && productsRouters.length > 0 && (
            <ListOfProductCards
              heightImage={70}
              widthImage={70}
              list={productsRouters.map(p => ({
                id: p.id,
                title: p.name,
                price: parseFloat(p.price) || 0,
                currency: 'USD',
                image: p.images[0]?.src || '',
                category: p.categories[0]?.name || '',
                description: p.short_description || '',
                banner: '',
                features: [],
                advantages: [],
                generaltitle: '',
                generaldescription: '',
                faqs: [],
              }))}
              type="product"
            />
          )
        )}
      </View>
    </>
  );
}
