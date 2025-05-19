import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputField from '@/components/molecules/InputField/InputField';
import Button from '@/components/atoms/Button/Button';
import { LoginStyles } from '@/styles/LoginStyles/LoginStyles';
import theme from '@/config/theme';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';

type Props = {
  onSubmit: (simNumber: string) => Promise<void>;
  onChangeSimNumber?: (simNumber: string) => void;
};

const LoginForm: React.FC<Props> = ({ onSubmit, onChangeSimNumber }) => {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { simNumber: '' },
    validationSchema: Yup.object({
      simNumber: Yup.string()
        .required(t('validators.required'))
        .test(
          'len',
          t('validators.invalidSim'),
          v => !!v && (v.length === 6 || v.length === 19)
        ),
    }),
    onSubmit: async ({ simNumber }, { setSubmitting }) => {
      await onSubmit(simNumber);
      setSubmitting(false);
    },
  });

  const buttonTextKey =
    formik.values.simNumber.length === 19
      ? 'actions.toActive'
      : 'pages.login.actions.requestCode';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={LoginStyles.containerForm}>
          <View style={LoginStyles.containerTitleForm}>
            <Text style={LoginStyles.titleForm}>
              {t('pages.login.form.title')}
            </Text>
            <Text
              style={LoginStyles.titleLink}
              onPress={() => {
                /* abrimos “Cómo funciona” */
              }}
            >
              {t('pages.login.form.link')}
            </Text>
          </View>

          <View style={LoginStyles.containerFormFields}>
            <InputField
              label={t('pages.login.fields.sim.label')}
              placeholder={t('pages.login.fields.sim.placeholder')}
              value={formik.values.simNumber}
              onChangeText={text => {
                formik.handleChange('simNumber')(text);
                onChangeSimNumber?.(text);
              }}
              handleBlur={formik.handleBlur('simNumber')}
              error={
                formik.touched.simNumber ? formik.errors.simNumber : undefined
              }
              suffixIcon={
                <IconSvg
                  color={
                    isDark
                      ? theme.colors.iconDefault
                      : '#A1A1A1'
                  }
                  height={25}
                  width={25}
                  type="info"
                />
              }
              inputMode="numeric"
            />
          </View>

          <Button
            onClick={formik.handleSubmit}
            variant="primaryPress"
            customStyles={LoginStyles.button}
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={LoginStyles.loadingButton}>
                {t(buttonTextKey)}
              </Text>
            )}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
