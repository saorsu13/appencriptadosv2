import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import InputField from '@/components/molecules/InputField/InputField';
import Button from '@/components/atoms/Button/Button';
import SuccessModal from '@/components/molecules/SuccessModal/SuccessModal';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import { determineType } from '@/utils/utils';
import { isValidIccid } from '@/features/sims/simUtils';
import { useCreateSim } from '@/hooks/useCreateSim';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { useTheme } from '@shopify/restyle';
import { ThemeCustom } from '@/config/theme2';
import styles from '@/styles/BalanceStyles/NewSimEncryptedStyles';
import { Sim } from '@/features/sims/simTypes';

// Trads base key
const baseMsg = 'pages.newSim';

const NewSimTottoli = () => {
  const { t } = useTranslation();
  const [type, setType] = useState<string | null>(null);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const { createSim, redirect } = useCreateSim();
  const [createdSim, setCreatedSim] = useState<Sim | null>(null);


  const formik = useFormik({
    initialValues: { simNumber: '' },
    validationSchema: Yup.object().shape({
      simNumber: Yup.string()
        .required(t('validators.required'))
        .test('valid-iccid', t(`${baseMsg}.fields.sim.invalidSim`), isValidIccid),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const { sim, success } = await createSim(values.simNumber);
      setIsLoading(false);
      if (success && sim) {
        setCreatedSim(sim);
        setModalSuccessVisible(true);
      }
    },
  });

  useEffect(() => {
    setType(determineType(formik.values.simNumber));
  }, [formik.values.simNumber]);

  const handleSuccessModalClose = () => {
    if (createdSim) {
      redirect(createdSim.provider);
    }
    setModalSuccessVisible(false);
  };

  const simTypeMap: Record<string, string> = {
    'telco-vision': 'telcoVisionSim',
    'tottoli': 'tottoliSim',
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1, backgroundColor: isDark ? '#000' : '#F0FAFF' }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderEncrypted owner="encriptados" iconBack="HomeMain" />
        <View style={styles.container}>
          {/* Banner */}
          <View style={styles.containerHeader}>
            <ImageBackground
              source={require('@/assets/img/new-sim-hero.png')}
              resizeMode="cover"
              style={styles.imageBackground}
              imageStyle={styles.background}
            >
              <View style={styles.containerHeaderImage}>
                <Text style={styles.containerHeaderTitle} allowFontScaling={false}>
                  {t(`${baseMsg}.title`)}
                </Text>
              </View>
            </ImageBackground>
          </View>

          {/* Form */}
          <View style={styles.containerForm}>
            <InputField
              label={t('pages.login.fields.sim.label')}
              onChangeText={formik.handleChange('simNumber')}
              handleBlur={formik.handleBlur('simNumber')}
              value={formik.values.simNumber}
              error={formik.touched.simNumber ? formik.errors.simNumber : null}
              required
              placeholder={t('pages.login.fields.sim.placeholder')}
              suffixIcon={
                <IconSvg width={25} height={25} type="info" color={"#fff"} />
              }
              inputMode="numeric"
              maxLength={19}
              status={type ? 'success' : formik.values.simNumber.length === 19 ? 'info' : null}
              statusMessage={
                !type
                ? t('pages.login.fields.sim.invalidSim')
                : t(
                  `pages.login.fields.sim.${simTypeMap[type] || 'invalidSim'}`
                )
            }
              onPressIcon={() => {}}
            />
            <Text style={styles.textInfo}>{t('pages.home.useFive')}</Text>
            <View style={styles.bottomButtonContainer}>
              <Button
                onClick={formik.handleSubmit}
                variant="primaryPress"
                disabled={!formik.isValid || !formik.values.simNumber}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText} allowFontScaling={false}>
                    {t('actions.toActive')}
                  </Text>
                )}
              </Button>
            </View>
          </View>
        </View>

        <SuccessModal
          visible={modalSuccessVisible}
          simNumber={formik.values.simNumber}
          onClose={handleSuccessModalClose}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default NewSimTottoli;