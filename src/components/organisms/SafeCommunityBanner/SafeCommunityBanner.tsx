// src/components/organisms/SafeCommunityBanner/SafeCommunityBanner.tsx
import React, { ReactNode } from 'react';
import { ImageBackground, View, Text, ImageSourcePropType } from 'react-native';
import { styles } from './SafeCommunityBannerStyles';

export interface SafeCommunityBannerProps {
  title: string;
  subtitle: string;
  description: string;
  icon?: ReactNode;
  background: ImageSourcePropType;
}

const SafeCommunityBanner: React.FC<SafeCommunityBannerProps> = ({
  title,
  subtitle,
  description,
  icon,
  background,
}) => (
  <ImageBackground
    source={background}
    resizeMode="cover"
    style={styles.container}
  >
    <View style={styles.overlay} />
    <View style={styles.content}>
      <Text allowFontScaling={false} style={styles.textTitle}>
        {title}
      </Text>
      <Text allowFontScaling={false} style={styles.textSubtitle}>
        {subtitle}
      </Text>
      {icon}
      <Text allowFontScaling={false} style={styles.textDescription}>
        {description}
      </Text>
    </View>
  </ImageBackground>
);

export default SafeCommunityBanner;

