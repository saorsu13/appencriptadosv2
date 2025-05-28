// src/screens/Home/SettingsMain/LaguageConfH.tsx

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import RadioButton from '@/components/molecules/RadioButton/RadioButton';
import theme from '@/config/theme';
import { updateLanguage } from '@/features/settingsSlice/settingsSlice';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const baseMsg = 'pages.language';

const mockData = [
  { label: 'en', value: 'en' },
  { label: 'es', value: 'es' },
  { label: 'fr', value: 'fr' },
];

export default function LanguageConf() {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const { t, i18n } = useTranslation();
  const currentLang = useSelector((state: any) => state.settings.lang);
  const [lang, setLang] = useState<string>(currentLang || 'es');
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();

  const handleChangeLang = (value: string) => {
    setLang(value);
    dispatch(updateLanguage(value));
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    if (currentLang) {
      setLang(currentLang);
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang, i18n]);

  const backgroundColor = isDark
    ? theme.colors.mainBackground
    : theme.lightMode.colors.white;

  return (
    <ScrollView style={{ backgroundColor }}>
      <HeaderEncrypted
        title={t(`${baseMsg}.title`)}
        iconBack={() => navigation.goBack()}
      />

      <View style={styles.containerBody}>
        <View style={styles.optionsContainer}>
          {mockData.map((item) => (
            <RadioButton
              key={item.value}
              handleChange={() => handleChangeLang(item.value)}
              value={item.value}
              selectedValue={lang}
              enabledText={false}
              variant=""
            >
              <Text
                allowFontScaling={false}
                style={[
                  styles.radioLabel,
                  { color: isDark ? theme.colors.contrast : theme.lightMode.colors.white },
                ]}
              >
                {t(`settings.lang.${item.label}`)}
              </Text>
            </RadioButton>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerBody: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 15,
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  radioLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...theme.textVariants.textInfo,
  },
});
