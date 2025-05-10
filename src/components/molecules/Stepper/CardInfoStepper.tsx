// src/components/molecules/Stepper/CardInfoStepper.tsx
import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';
import { styles } from './CardInfoStepperStyles';

export interface CardInfoProps {
  imageSource?: ReactElement;
  vectorComponent?: ReactElement;
  description?: string;
  title: string;
  titleColor?: string;
  descriptionColor?: string;
  state?: ReactElement;
  background?: string;
  borderColor?: string;
}

const CardInfoStepper: React.FC<CardInfoProps> = ({
  imageSource,
  vectorComponent,
  background,
  borderColor,
  description,
  title,
  state,
  titleColor,
  descriptionColor,
}) => {
  const { colors } = useTheme<ThemeCustomType>();

  return (
    <View
      style={[
        styles.cardContainer,
        { borderColor: borderColor, borderWidth: borderColor ? 2 : 0, borderRadius: 10 },
      ]}
    >
      <View style={[styles.innerContainer, { backgroundColor: background }]}>  
        <View style={styles.topRow}>
          <View style={[styles.imageContainer, { backgroundColor: colors.primaryColor }]}> 
            {imageSource}
          </View>

          <Text
            allowFontScaling={false}
            style={[styles.titleText, { color: titleColor || colors.strokeBorder }]}
          >
            {title}
          </Text>
        </View>

        {description && (
          <View style={styles.bottomRow}>
            <Text
              allowFontScaling={false}
              style={[styles.descriptionText, { color: descriptionColor || colors.secondaryText }]}
            >
              {description}
            </Text>
          </View>
        )}

        {state && (
          <View style={styles.priceContainer}>
            <Text
              allowFontScaling={false}
              style={[styles.priceText, { color: colors.primaryColor }]}
            >
              {state}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CardInfoStepper;