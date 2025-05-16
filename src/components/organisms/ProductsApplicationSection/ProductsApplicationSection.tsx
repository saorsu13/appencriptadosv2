// src/components/organisms/ProductsApplicationSection/ProductsApplicationSection.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { ThemeCustomType } from '@/config/theme2';

import ListOfProductCards from '@/components/molecules/ListOfProductCards/ListOfProductCards';
import SkeletonGrid from '@/components/molecules/SkeletonContent/SkeletonGrid';
import { getSecureProductsByCategory, ProductSecure } from '@/api/productsSecure';
import { styles } from './ProductsApplicationSectionStyles';
import { Product } from '@/features/product/types';

export default function ProductsApplicationSection() {
  const { colors } = useTheme<ThemeCustomType>();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [period, setPeriod] = useState<'1' | '6' | '12'>('1');

  const { data: productsAppSecure, isFetching } = useQuery<ProductSecure[]>({
    queryKey: ['productsAppSecure', 38],
    queryFn: () => getSecureProductsByCategory(38),
    staleTime: 0,
  });

  const listFormatted: Product[] = productsAppSecure?.map(p => ({
    id: p.id,
    title: p.name,
    price: parseFloat(p.price),
    currency: 'USD',                     
    image: p.images[0]?.src || '',
    description: p.short_description,
    category: p.categories[0]?.name || '',
  })) ?? [];


  const [category, setCategory] = useState<string>('all');
  const categories = [
    'all',
    ...Array.from(new Set(listFormatted.map(p => p.category))),
  ];

  const filteredList =
    category === 'all'
      ? listFormatted
      : listFormatted.filter(p => p.category === category);

  const AppBanner = require('@/assets/img/appban.png');

  return (
    <>
      <View style={styles.categorySelectorContainer}>
        <Picker
          selectedValue={category}
          onValueChange={val => setCategory(val)}
          style={[
            styles.categoryPicker,
            {
              backgroundColor: colors.backgroundSecondary,
              color: colors.primaryText,
            },
          ]}
          dropdownIconColor={colors.primaryText}
        >
          <Picker.Item label="Categoría" value="all" />
          {categories
            .filter(c => c !== 'all')
            .map(cat => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
        </Picker>
      </View>

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
        filteredList.length > 0 && (
          <View style={styles.listContainer}>
            <ListOfProductCards
              list={filteredList}
              type="product"
              widthImage={70}
              heightImage={70}
              showPeriodSelector={true}
            />
          </View>
        )
      )}
    </>
  );
}