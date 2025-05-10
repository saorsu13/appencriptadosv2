// src/components/organisms/ProductsPhoneSection/ProductsPhoneSection.tsx
import React from 'react';
import { View, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import type { ThemeCustomType } from '@/config/theme2';
import type { Product } from '@/components/molecules/ListOfProductCards/ListOfProductCards';

import ListOfProductCards from '@/components/molecules/ListOfProductCards/ListOfProductCards';
import SkeletonGrid from '@/components/molecules/SkeletonContent/SkeletonGrid';
import { getProducts } from '@/api/productsTab';
import { styles } from './ProductsPhoneSectionStyles';

/**
 * Sección de Productos para teléfono
 */
export default function ProductsPhoneSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { colors } = useTheme<ThemeCustomType>();

  // Query de productos categoría 'mobile'
  const { data: productsPhone, isFetching } = useQuery<Product[]>({
    queryKey: ['productsPhone', lang],
    queryFn: () => getProducts('mobile', lang),
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
          productsPhone && productsPhone.length > 0 && (
            <ListOfProductCards
              list={productsPhone}
              type="phone"
              widthImage={150}
              heightImage={150}
            />
          )
        )}
      </View>
    </>
  );
}
