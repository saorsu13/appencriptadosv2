// src/screens/Product/ProductScreen.tsx
import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  BackHandler,
  Platform
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Button from '@/components/atoms/Button/Button';

import { getProductsById } from '@/api/productsTab';
import { setLoading } from '@/features/loading/loadingSlice';
import { useModalPayment } from '@/context/modalpayment';
import CardInfo from '@/components/molecules/CardInfo/CardInfo';
import CarouselFeatures from '@/components/molecules/CarouselFeatures/CarouselFeatures';
import FAQAccordion from '@/components/molecules/FAQAccordion/FAQAccordion';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import type { Product } from '@/features/product/types';
import type { ProductTabParamList } from '@/navigation/types';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';
import { useDarkModeTheme } from '@/hooks/useDarkModeTheme';
import type { FeatureItem } from '@/components/molecules/CarouselFeatures/CarouselFeatureItem';
import { t } from 'i18next';

// Props tipadas para la pantalla ProductInfo
type Props = NativeStackScreenProps<ProductTabParamList, 'ProductInfo'>;

export default function ProductInfoScreen({ route }: Props) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { openModalWithParams } = useModalPayment();
  const { colors } = useTheme<ThemeCustomType>();
  const { themeMode } = useDarkModeTheme();

 useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      navigation.goBack();
      return true;
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      subscription.remove();
    };
  }, [navigation])
);


 const { data, isFetching } = useQuery<Product>({
  queryKey: ['productById', id],
  queryFn: () => getProductsById(id),
});

  if (isFetching) {
    dispatch(setLoading(true));
    return <View style={[styles.container, { backgroundColor: colors.background }]} />;
  }

  const product = data!;

  console.log('🛑 [productScreen] render');
  return (
    <>
      {/* 4) Header con botón back */}
      <HeaderEncrypted iconBack="StoreMain" />

      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Banner principal */}
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={{ uri: product.banner }}
            style={styles.banner}
            resizeMode="cover"
          />
        </View>

        {/* Título y descripción general */}
        <View style={[styles.descriptionCard, { backgroundColor: colors.backgroundSecondary }]}>
          <Text style={[styles.mainTitle, { color: colors.primaryText }]}>
            {product.generaltitle}
          </Text>
          <Text style={[styles.mainDescription, { color: colors.secondaryText }]}>
            {product.generaldescription}
          </Text>
        </View>

        {/* Imagen, título, precio y botón Buy */}
        <View style={[styles.detailCard, { backgroundColor: colors.backgroundSecondary }]}>
          <ImageBackground
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
          <Text style={[styles.productTitle, { color: colors.primaryText }]}>
            {product.title}
          </Text>
          <Text style={[styles.productPrice, { color: colors.secondaryText }]}>
            {t('pages.home-tab.from')} ${product.price} {product.currency}
          </Text>
          <View style={styles.buyButton}>
            <Button
              size="small"
              variant="primary"
              onClick={() => openModalWithParams(product.id.toString(), themeMode, 'es')}
            >
              {t('pages.home-tab.buy')}
            </Button>


          </View>
        </View>

        {/* Características */}
        {Array.isArray(product.features) && product.features.length > 0 && (
          <CarouselFeatures features={product.features as FeatureItem[]} />
        )}

        {/* Ventajas */}
        {product.advantages?.map((adv) => (
          <CardInfo
            key={adv.title}
            title={adv.title}
            description={adv.description}
            imageSource={adv.image}
          />
        ))}

        {/* FAQs */}
        {Array.isArray(product.faqs) && product.faqs.length > 0 && (
          <FAQAccordion data={product.faqs ?? []} />
        )}

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bannerContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  banner: { flex: 1, borderRadius: 10, overflow: 'hidden' },
  descriptionCard: { marginHorizontal: 16, padding: 20, borderRadius: 10, marginBottom: 20 },
  mainTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  mainDescription: { fontSize: 14, textAlign: 'center' },
  detailCard: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: { width: 120, height: 120, marginBottom: 16 },
  productTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  productPrice: { fontSize: 16, marginBottom: 12 },
  buyButton: { width: '60%' },
});