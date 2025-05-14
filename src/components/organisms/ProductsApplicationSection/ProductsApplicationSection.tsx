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

  // Estado para el periodo (1/6/12 meses)
  const [period, setPeriod] = useState<'1' | '6' | '12'>('1');

  // Query de productos categoría 'app'
  const { data: productsApp, isFetching } = useQuery<Product[]>({
    queryKey: ['productsApp', currentLanguage],
    queryFn: () => getProducts('app', currentLanguage),
    staleTime: 0,
  });

  // Formateamos la lista de productos
  const listFormatted: Product[] = productsApp?.map(product => ({
    id: product.id,
    title: product.title,
    price: Number(product.price) ?? 0,
    currency: product.currency ?? '',
    image: product.image ?? '',
    description: product.description ?? '',
    category: product.category ?? 'app',
  })) ?? [];

  // Estado y valores para el filtro de categoría
  const [category, setCategory] = useState<string>('all');
  const categories = [
    'all',
    ...Array.from(new Set(listFormatted.map(p => p.category))),
  ];

  // Filtramos según la categoría seleccionada
  const filteredList =
    category === 'all'
      ? listFormatted
      : listFormatted.filter(p => p.category === category);

  // Banner de aplicaciones (si lo necesitas más abajo)
  const AppBanner = require('@/assets/img/appban.png');

  return (
    <>
      {/* ——— SELECT DE CATEGORÍAS ——— */}
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

      {/* ——— GRID O SKELETON ——— */}
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