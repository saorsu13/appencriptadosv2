// src/components/organisms/ProductsSimSection/ProductsSimSection.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/hooks/hooksStoreRedux';
import { getFaqs, getProducts } from '@/api/productsTab';
import Stepper from '@/components/molecules/Stepper/Stepper';
import WhyUse from '@/components/organisms/WhyUse/WhyUse';
import SafeCommunityBanner from '@/components/organisms/SafeCommunityBanner/SafeCommunityBanner';
import FAQAccordion from '@/components/molecules/FAQAccordion/FAQAccordion';
import ListOfProductCards from '@/components/molecules/ListOfProductCards/ListOfProductCards';
import SkeletonGrid from '@/components/molecules/SkeletonContent/SkeletonGrid';
import ActiveVector from '@/components/molecules/Stepper/icons/ActiveVector';
import PricingVector from '@/components/molecules/Stepper/icons/PricingVector';
import ManVector from '@/components/molecules/Stepper/icons/ManVector';
import SimIcon from '@/components/molecules/Stepper/icons/SimIcon';
import CardInfoStepper from '@/components/molecules/Stepper/CardInfoStepper';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';
import type { FAQItem } from '@/components/molecules/FAQAccordion/FAQAccordion';
import { Product } from '@/features/product/types';
import CategorySimSelect from '@/components/molecules/CategorySimSelect/CategorySimSelect';
import FilterTabs from '@/components/molecules/FilterTabs/FilterTabs';


export default function ProductsSimSection() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(state => state.settings.lang);
  const { t } = useTranslation();
  const { colors } = useTheme<ThemeCustomType>();

   // Estados para categorías y filtros
  const categoriesList = ['SIM Encriptados', 'Otra Categoría'];
  const [simCategory, setSimCategory] = useState<string>(categoriesList[0]);
  
  const defaultOptions = ['Recargar', 'Minutos', 'eSIM', 'SIM', 'IMSI'];
  const onlyRechargeEsim = ['Recarga', 'Recarga + eSIM', 'SIM'];
  const [filter, setFilter] = useState(defaultOptions[0]);

  const filterOptions =
    simCategory === 'SIM Encriptada' ? defaultOptions : onlyRechargeEsim;

  useEffect(() => {
    if (!filterOptions.includes(filter)) {
      setFilter(filterOptions[0]);
    }
  }, [simCategory]);

 const { data: faqs } = useQuery<string[]>({
    queryKey: ['faqs', currentLanguage],
    queryFn: () => getFaqs(currentLanguage),
    staleTime: 0,
  });

const faqItems: FAQItem[] = Array.isArray(faqs)
  ? faqs.map(question => ({
      title: typeof question === 'string' ? question : 'Pregunta desconocida', 
      content: t('pages.home-tab.defaultAnswer') || 'Pronto añadiremos respuesta.', // <-- 👈
    }))
  : [];

  const { data: productsSim, isFetching } = useQuery<Product[]>({
    queryKey: ['productsSim', currentLanguage],
    queryFn: () => getProducts('sim', currentLanguage),
    staleTime: 0,
  });


  // Banner images
  const BannerWelcome = require('@/assets/img/comunicate-banner.png');
  const BannerSecurity = require('@/assets/img/banner-security.png');

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
    {/* Category dropdown */}
      <CategorySimSelect
        selected={simCategory}
        onChange={setSimCategory}
      />

      {/* Filter tabs */}
      <FilterTabs
        label={t('pages.home-tab.whatAreYouLooking')}
        options={filterOptions}
        selected={filter}
        onSelect={setFilter}
      />
      {/* <View style={{ marginBottom: 40 }}>
        <WelcomeProducts
          title={t('pages.home-tab.encryptedSim')} 
          description={t('pages.home-tab.communicate')}
          icon={
            <View style={{ width: 64, height: 64, backgroundColor: '#0C3441', borderRadius: 14, justifyContent: 'center', alignItems: 'center' }}>
              <IconSvg type="spiral" />
            </View>
          }
          background={BannerWelcome}
        />
      </View> */}

      {/* <View style={{ marginBottom: 40 }}>
        <Text style={{ color: colors.primaryText, fontWeight: '700', textAlign: 'center', fontSize: 18, marginBottom: 7 }}>
          {t('pages.home-tab.encryptedSim')}
        </Text>
        <Text style={{ color: colors.secondaryText, textAlign: 'center', fontSize: 14, width: 300, alignSelf: 'center' }}>
        {t('pages.home-tab.securityPrivacy')}
        </Text>
      </View> */}

      <View style={styles.separator} />

      <View>
        {isFetching ? (
          <View style={{ flex: 1, alignSelf: 'center' }}>
            <SkeletonGrid
              heightImage={300}
              widthImage={200}
              borderRadius={5}
              gap={12}
              columns={2}
              rows={2}
              boneColor="rgba(255,255,255,0.25)"
            />
          </View>
        ) : (
          productsSim && productsSim.length > 0 && (
            <ListOfProductCards
              heightImage={70}
              widthImage={70}
              list={productsSim} // ✅ Directo, sin `as []`
              type="product"
            />
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
        {faqItems.length > 0 && <FAQAccordion data={faqItems} />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  image: { width: 50, height: 50 },

  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#2A2A2A",
    marginVertical: 10,
    marginTop: 13,
    marginBottom: 12,
  },
});
