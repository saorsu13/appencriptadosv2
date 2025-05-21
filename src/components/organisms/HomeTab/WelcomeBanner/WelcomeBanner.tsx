// src/components/organisms/HomeTab/WelcomeBanner/WelcomeBanner.tsx
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { ThemeCustom } from '@/config/theme2';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeTabParamList, RootTabParamList } from '@/navigation/types';
import Bag from '@/assets/icons/Bag';

const bannerImage = require('../../../../assets/img/Frame 480956850.png');

interface WelcomeBannerProps {
  titlePart1: string;
  titlePart2: string;
  titlePart3: string;
  description: string;
  buttonText: string;
  icon?: React.ReactNode;
  badgeText?: string;
}

type WelcomeBannerNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeTabParamList>,
  BottomTabNavigationProp<RootTabParamList>
>;

export default function WelcomeBanner({
  titlePart1,
  titlePart2,
  titlePart3,
  description,
  buttonText,
  icon,
  badgeText,
}: WelcomeBannerProps) {
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;

  const navigation = useNavigation<WelcomeBannerNavigationProp>();

  return (
    <ImageBackground
      source={bannerImage}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        {badgeText && (
          <View style={[styles.badgeContainer, { borderColor: colors.primaryColor }]}>
            <Text style={[styles.badgeText, { color: colors.primaryColor }]}>
              {badgeText}
            </Text>
          </View>
        )}

        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          <Text style={{ color: colors.primaryColor }}>{titlePart1}</Text>
          {titlePart2}
          <Text style={{ color: colors.primaryColor }}>{titlePart3}</Text>
        </Text>
        <Text style={[styles.textDescription, { color: colors.secondaryText }]}>
          {description}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Store', {
              screen: 'StoreMain',
              params: undefined,
            })
          }
          style={[styles.fullButton, { backgroundColor: colors.white }]}
        >
          <Bag color={colors.deepBlue} width={16} height={18} />
          <Text style={[styles.fullButtonText, { color: colors.deepBlue }]}>
            {buttonText}
          </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Platform.OS === 'ios' ? 600 : 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  badgeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 10,
    width: '100%',
  },
  textTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
  },
  textDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  fullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    gap: 8,
  },

  fullButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 10,
  },
});

