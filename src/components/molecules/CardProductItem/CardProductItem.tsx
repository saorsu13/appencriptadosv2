// src/components/molecules/CardProductItem/CardProductItem.tsx
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';
import { useModalPayment } from '@/context/modalpayment';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ProductTabParamList } from '@/navigation/types';
import Button from '@/components/atoms/Button/Button';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import { useDarkModeTheme } from '@/hooks/useDarkModeTheme';
import { t } from 'i18next';
import { Product } from '@/features/product/types';
import { styles } from './CardProductItemStyles';
import AddCart from '@/assets/icons/AddCart';

export type TypeOfProduct = 'phone' | 'product' | 'offers';

export interface CardProductItemProps {
  product: Product;
  type: TypeOfProduct;
  widthImage: number;
  heightImage: number;
  isFirstItem: boolean;
}

const navigation = () => useNavigation<NativeStackNavigationProp<ProductTabParamList>>();


const CardProductItem: React.FC<CardProductItemProps> = ({
  product,
  type,
  widthImage,
  heightImage,
  isFirstItem,
}) => {
  const { openModalWithParams } = useModalPayment();
  const { colors } = useTheme<ThemeCustomType>();
  const { themeMode } = useDarkModeTheme();
  const nav = navigation();


  const renderImage = () => {
    if (product.image.endsWith('.svg')) {
      return (
        <SvgUri
          uri={product.image}
          width={widthImage}
          height={heightImage}
          style={[styles.imageBackground, { width: widthImage, height: heightImage }]}
        />
      );
    }
    return (
      <ImageBackground
        source={{ uri: product.image }}
        resizeMode="contain"
        style={[styles.imageBackground, { width: widthImage, height: heightImage }]}
      />
    );
  };

  if (type === 'offers') {
    return (
      <View style={[styles.cardContainer, isFirstItem && styles.fullWidthCard]}>
        <View style={[styles.innerContainer, { backgroundColor: colors.white }]}>
          <View style={{ marginTop: 20 }}>{renderImage()}</View>

          <Text allowFontScaling={false} style={styles.offerText}>
            Plan de datos para SIM Encriptada + eSIM gratis
          </Text>
          <View style={styles.offerPriceRow}>
            <Text allowFontScaling={false} style={styles.offerPriceText}>
              $25.00
            </Text>
            <Text allowFontScaling={false} style={styles.offerBonusText}>
              + 25% de saldo
            </Text>
          </View>

          <View style={styles.offerButtonWrapper}>
            <TouchableOpacity
              style={[styles.offerButton, { backgroundColor: colors.primaryColor }]}
              onPress={() => {
                console.log('🛒 Botón Comprar (Offer) presionado', product.id);
                openModalWithParams(product.id.toString(), themeMode, 'es');
              }}
            >
              <Text allowFontScaling={false} style={styles.buttonText}>
                {t('pages.home-tab.buy')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.cardContainer,
        type === 'phone' && styles.phoneContainer,
        isFirstItem && styles.fullWidthCard,
      ]}
    >
      <View style={[styles.innerContainer, { backgroundColor: colors.backgroundSecondary }]}>
        <View style={styles.imageWrapper}>{renderImage()}</View>
        <Text
          allowFontScaling={false}
          style={[styles.productNameText, { color: colors.primaryText }]}
        >
          {product.title}
        </Text>
        <Text
          allowFontScaling={false}
          style={[styles.productPriceText, { color: colors.secondaryText }]}
        >
          {t('pages.home-tab.from')} ${product.price} {product.currency}
        </Text>

        <View style={styles.separator} />

        <View style={styles.productButtonWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.buyButton,
              {
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: colors.primaryColor,
                alignItems: 'center',
              },
            ]}
            onPress={() => openModalWithParams(product.id.toString(), themeMode, 'es')}
          >
            <Text style={[styles.buttonText]}>
              {t('pages.home-tab.buy')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.cartButton,
              {
                flexDirection: 'row',      // para alinear icono + texto
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: colors.white,
              },
            ]}
            onPress={() => console.log('Añadir a carrito', product.id)}
          >
            <AddCart width={20} height={22} color={colors.background} />
            <Text style={[styles.buttonText, { color: colors.background, marginLeft: 5 }]}>
              Añadir a carrito
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <TouchableOpacity
            onPress={() => nav.navigate('ProductInfo', { id: product.id.toString() })}
          >
            <Text
              allowFontScaling={false}
              style={[styles.moreInfoText]}
            >
              {t('pages.home-tab.moreInfo')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardProductItem;