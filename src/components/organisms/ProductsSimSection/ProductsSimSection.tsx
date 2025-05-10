// src/components/organisms/ProductsSimSection/ProductsSimSection.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/hooks/hooksStoreRedux';
import { getFaqs, getProducts } from '@/api/productsTab';
import Stepper from '@/components/molecules/Stepper/Stepper';
import WhyUse from '@/components/organisms/WhyUse/WhyUse';
import SafeCommunityBanner from '@/components/organisms/ProductsTab/SafeCommunityBanner/SafeCommunityBanner';
import FAQAccordion from '@/components/molecules/FAQAccordion/FAQAccordion';
import ListOfProductCards from '@/components/molecules/CardProductItem/ListOfProductCards';
import SkeletonGrid from '@/components/molecules/SkeletonContent/SkeletonGrid';
import WelcomeProducts from '@/components/organisms/ProductsTab/WelcomeProducts/WelcomeProducts';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import ActiveVector from '@/components/molecules/Stepper/icons/ActiveVector';
import PricingVector from '@/components/molecules/Stepper/icons/PricingVector';
import ManVector from '@/components/molecules/Stepper/icons/ManVector';
import SimIcon from '@/components/molecules/Stepper/icons/SimIcon';
import CardInfoStepper from '@/components/molecules/Stepper/CardInfoStepper';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { ThemeCustom } from '@/config/theme2';

export default function ProductsSimSection() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(state => state.settings.lang);
  const { t } = useTranslation();
  const { colors } = useTheme<ThemeCustom>();

  const { data: faqs } = useQuery(
    ['faqs', currentLanguage],
    () => getFaqs(currentLanguage),
    { staleTime: 0 }
  );

  const { data: productsSim, isFetching } = useQuery(
    ['productsSim'],
    () => getProducts('sim'),
    { staleTime: 0 }
  );

  // Banner images
  const BannerWelcome = require('@/assets/images/comunicate-banner.png');
  const BannerSecurity = require('@/assets/images/banner-security.png');

  // Step images and data
  const stepData = [
    {
      vectorcomponent: <PricingVector />, cardinfo: (
        <CardInfoStepper
          background={colors.white}
          state={<Text>10 USD</Text>}
          imageSource={<SimIcon />}
          title={t('pages.home-tab.encryptedSim')}
        />
      ),
      stepNumber: 1,
      title: t('pages.home-tab.buyIt'),
    },
    {
      vectorcomponent: <ManVector />, cardinfo: (
        <CardInfoStepper
          borderColor={colors.success}
          background={colors.white}
          state={<><Text style={{ color: colors.success }}>{t('pages.home-tab.received')}</Text></>}
          imageSource={<SimIcon />}
          title={t('pages.home-tab.encryptedSim')}
        />
      ),
      stepNumber: 2,
      title: t('pages.home-tab.receiveIt'),
    },
    {
      vectorcomponent: <ActiveVector />, cardinfo: (
        <CardInfoStepper
          borderColor={colors.primaryColor}
          background={colors.white}
          state={<><Text style={{ color: colors.primaryColor }}>{t('pages.home-tab.active')}</Text></>}
          imageSource={<SimIcon />}
          title={`${t('pages.home-tab.activeSim')} 782903`}
        />
      ),
      stepNumber: 3,
      title: t('pages.home-tab.activateIt'),
    },
  ];

  return (
    <>
      <View style={{ marginBottom: 40 }}>
        <WelcomeProducts
          background={BannerWelcome}
          description={t('pages.home-tab.communicate')}
          icon={
            <View style={{ width: 64, height: 64, backgroundColor: '#0C3441', borderRadius: 14, justifyContent: 'center', alignItems: 'center' }}>
              <IconSvg type="spiral" />
            </View>
          }
        />
      </View>

      <View style={{ marginBottom: 40 }}>
        <Text style={{ color: colors.primaryText, fontWeight: '700', textAlign: 'center', fontSize: 18, marginBottom: 7 }}>
          {t('pages.home-tab.encryptedSim')}
        </Text>
        <Text style={{ color: colors.secondaryText, textAlign: 'center', fontSize: 14, width: 300, alignSelf: 'center' }}>
          {t('pages.home-tab.securityPrivacy')}
        </Text>
      </View>

      <View>
        {isFetching ? (
          <View style={{ flex: 1, alignSelf: 'center' }}>
            <SkeletonGrid heightImage={300} widthImage={200} borderRadius={5} gap={12} columns={2} rows={2} boneColor="rgba(255,255,255,0.25)" />
          </View>
        ) : (
          Array.isArray(productsSim) && productsSim.length > 0 && (
            <ListOfProductCards heightImage={70} widthImage={70} list={productsSim as []} type="product" />
          )
        )}
      </View>

      <View style={styles.container}>
        {/* carousel placeholder */}
      </View>

      <View style={{ marginTop: 60, marginBottom: 30, rowGap: 10 }}>
        <Text style={{ color: colors.primaryText, fontWeight: '600', fontSize: 24, textAlign: 'center' }}>
          {t('pages.home-tab.useEasy')}
        </Text>
        <Text style={{ color: colors.secondaryText, fontWeight: '400', fontSize: 20, textAlign: 'center' }}>
          {t('pages.home-tab.threeSteps')}
        </Text>
      </View>

      <View>
        <Stepper steps={stepData} />
      </View>

      <View style={{ marginTop: 100, marginBottom: 40 }}>
        <Text style={{ textAlign: 'center', fontWeight: '600', color: colors.primaryText, fontSize: 24, width: 300, alignSelf: 'center' }}>
          {t('pages.home-tab.whyUseEncriptados')}
        </Text>
      </View>

      <WhyUse />

      <View style={{ marginTop: 40, marginBottom: 40 }}>
        <SafeCommunityBanner
          subtitle={t('pages.home-tab.noFrontier')}
          title={t('pages.home-tab.comunicate')}
          description={t('pages.home-tab.200country')}
          background={BannerSecurity}
        />
      </View>

      <View style={{ backgroundColor: '#101010', minHeight: '100%' }}>
        {faqs && <FAQAccordion data={faqs} />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  image: { width: 50, height: 50 },
});
