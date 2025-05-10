// src/components/molecules/CardProductItem/CardProductItem.tsx
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';
import { useModalPayment } from '@/context/modalpayment';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ProductTabParamList } from '@/navigation/ProductTabsNavigator';
import Button from '@/components/atoms/Button/Button';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import { useDarkModeTheme } from '@/hooks/useDarkModeTheme';
import { t } from 'i18next';
import { Product } from '@/components/molecules/ListOfProductCards/ListOfProductCards';
import { styles } from './CardProductItemStyles';

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
              onPress={() => openModalWithParams(product.id, themeMode, 'es')}
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
        <View style={{ marginTop: 20 }}>{renderImage()}</View>
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

        <View
          style={
            type === 'product'
              ? styles.productButtonWrapper
              : styles.defaultButtonWrapper
          }
        >
          <Button
            size="small"
            onClick={() => openModalWithParams(product.id, themeMode, 'es')}
            variant="primary"
          >
            {t('pages.home-tab.buy')}
          </Button>
        </View>

        <View style={styles.infoContainer}>
          <TouchableOpacity
            onPress={() => nav.navigate('ProductInfo', { id: product.id })}
          >
            <Text
              allowFontScaling={false}
              style={[styles.moreInfoText, { color: colors.primaryText }]}
            >
              {t('pages.home-tab.moreInfo')}
            </Text>
          </TouchableOpacity>

          <IconSvg height={9} width={12} color={colors.primaryText} type="arrowright" />
        </View>
      </View>
    </View>
  );
};

export default CardProductItem;