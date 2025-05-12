// src/components/organisms/HomeTab/WelcomeBanner/WelcomeBanner.tsx
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { ThemeCustom } from '@/config/theme2';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeTabParamList, RootTabParamList } from '@/navigation/types';

const bannerImage = require('../../../../assets/img/bannerencriptados.png');

interface WelcomeBannerProps {
  title: string;
  description: string;
  buttonText: string;
  icon?: React.ReactNode;
}

type WelcomeBannerNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeTabParamList>,
  BottomTabNavigationProp<RootTabParamList>
>;

export default function WelcomeBanner({
  title,
  description,
  buttonText,
  icon,
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
        <Text style={[styles.textTitle, { color: colors.primaryText }]}>
          {title}
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

          style={[styles.button, { borderColor: colors.primaryColor }]}
        >
          <Text style={[styles.buttonText, { color: colors.primaryColor }]}>
            {buttonText}
          </Text>
          {icon && <View style={styles.icon}>{icon}</View>}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  textTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  textDescription: {
    fontSize: 16,
    width: 280,
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
  },
  icon: {
    marginLeft: 10,
  },
});
