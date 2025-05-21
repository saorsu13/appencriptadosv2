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
import AboutUsHome from '../../components/organisms/HomeTab/AboutUsHome/AboutUsHome';
import PaymentsHome from '../../components/organisms/HomeTab/PaymentsHome/PaymentsHome';
import SocialNetworks from '../../components/organisms/HomeTab/SocialNetworks/SocialNetworks';
import { useDarkModeTheme } from '@/context/theme';
import { ThemeCustom } from '@/config/theme2';
import { t } from "i18next";
import VirtualNumberBanner from '@/components/organisms/HomeTab/VirtualNumberBanner/VirtualNumberBanner';
import AboutEncriptados from '@/components/organisms/HomeTab/AboutEncriptados/AboutEncriptados';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];
  const backgroundColor = theme.colors.background;

   console.log('🛑 [HomeScreen] render');
  return (
    <View style={[HomeStyles.container, { backgroundColor }]}>
      <HeaderEncrypted settingsLink="SettingsMain"/>
      <ScrollView contentContainerStyle={HomeStyles.scrollContent}>
        <IconSvg name="menu" onPress={() => navigation.toggleDrawer()} />
        <WelcomeBanner
        badgeText={t("pages.home-tab.welcomebanner-badge")}
          titlePart1={t("pages.home-tab.welcomebanner-title-part1")}
          titlePart2={t("pages.home-tab.welcomebanner-title-part2")}
          titlePart3={t("pages.home-tab.welcomebanner-title-part3")}
          description={t("pages.home-tab.welcomebanner-description")}
          buttonText={t("pages.home-tab.goToStore")}
        />
        <OfferBannerHome />
        <PlanBannerHome />
        <VirtualNumberBanner />
        {/* <DistributorsHome /> */}
        {/* <BlogEncriptados /> */}
        <AboutEncriptados/>
        {/* <AboutUsHome /> */}
        <PaymentsHome />
        <SocialNetworks />
      </ScrollView>
    </View>
  );
}
