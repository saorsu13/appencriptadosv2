// src/components/organisms/ProductsSystemsSection/ProductsSystemsSection.tsx
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
import { styles } from './ProductsSystemsSectionStyles';

export default function ProductsSystemsSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language; // disponible para traducciones futuras
  const { colors } = useTheme<ThemeCustomType>();

  // Query de productos categoría 'systems' (ID 35)
  const { data: productsSystems, isFetching } = useQuery<ProductSecure[]>({
    queryKey: ['productsSystemsSecure', 35],
    queryFn: () => getSecureProductsByCategory(35),
    staleTime: 0,
  });

  // Banner para sistemas — asegura tener este asset en assets/img
  // const SystemsBanner = require('@/assets/img/systemban.png');

  return (
    <>
      <View style={styles.bannerContainer}>
        {/* <Image
          source={SystemsBanner}
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
          productsSystems && productsSystems.length > 0 && (
            <ListOfProductCards
              heightImage={70}
              widthImage={70}
              list={productsSystems.map(p => ({
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
