// src/screens/Home/HomeScreen.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStyles } from '../../styles/Home/HomeStyles';

// Componentes que iremos montando:
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import WelcomeBanner from '@/components/organisms/HomeTab/WelcomeBanner/WelcomeBanner';
import OfferBannerHome from '@/components/organisms/HomeTab/OfferBannerHome/OfferBannerHome';
import PlanBannerHome from '@/components/organisms/HomeTab/PlanBannerHome/PlanBannerHome';
import DistributorsHome from '../../components/organisms/HomeTab/DistributorsHome/DistributorsHome';
import BlogEncriptados from '../../components/organisms/HomeTab/BlogEncriptados/BlogEncriptados';
// import AboutUsHome from '../../components/organisms/HomeTab/AboutUsHome/AboutUsHome';
// import PaymentsHome from '../../components/organisms/HomeTab/PaymentsHome/PaymentsHome';
// import SocialNetworks from '../../components/organisms/HomeTab/SocialNetworks/SocialNetworks';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { ThemeCustom } from '@/config/theme2';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];
  const backgroundColor = theme.colors.background;

   console.log('🛑 [HomeScreen] render');
  return (
    <View style={[HomeStyles.container, { backgroundColor }]}>
      <HeaderEncrypted />
      <ScrollView contentContainerStyle={HomeStyles.scrollContent}>
        <IconSvg name="menu" onPress={() => navigation.toggleDrawer()} />
        <WelcomeBanner theme={theme} />
        <OfferBannerHome />
        <PlanBannerHome />
        <DistributorsHome />
        <BlogEncriptados />
         {/* <AboutUsHome />
         <PaymentsHome />
         <SocialNetworks /> */}
      </ScrollView>
    </View>
  );
}
