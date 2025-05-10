// src/components/organisms/WelcomeProducts/WelcomeProducts.tsx
import React, { ReactNode } from 'react';
import { ImageSourcePropType, ImageBackground, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './WelcomeProductsStyles';

export interface WelcomeProductsProps {
  title: string;
  description: string;
  icon: ReactNode;
  background: ImageSourcePropType;
}

const WelcomeProducts: React.FC<WelcomeProductsProps> = ({
  title,
  description,
  icon,
  background,
}) => (
  <ImageBackground
    source={background}
    resizeMode="contain"
    style={styles.container}
  >
    <LinearGradient
      colors={[
        'rgba(0, 0, 0, 0.8)',
        'transparent',
      ]}
      style={styles.topGradient}
    />
    <View style={styles.overlay} />
    <View style={styles.content}>
      <Text allowFontScaling={false} style={styles.textTitle}>
        {title}
      </Text>
      {icon}
      <Text allowFontScaling={false} style={styles.textDescription}>
        {description}
      </Text>
    </View>
    <LinearGradient
      colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
      style={styles.bottomGradient}
    />
  </ImageBackground>
);

export default WelcomeProducts;
