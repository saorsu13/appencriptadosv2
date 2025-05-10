// src/config/i18n.ts
import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import esResources from './i18n.es.json';
import enResources from './i18n.en.json';
import frResources from './i18n.fr.json';

// Tus recursos de traducción
const resources = {
  es: { translation: esResources },
  en: { translation: enResources },
  fr: { translation: frResources },
};

// Inicialización SÍNCRONA
i18n
  .use(initReactI18next)
  .init({
    resources,
    // idioma inicial: primer locale de Expo o 'es' si no se detecta
    lng: getLocales()[0]?.languageCode || 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  });

// Después, lee AsyncStorage y cambia si había uno guardado
(async () => {
  try {
    const root = await AsyncStorage.getItem('persist:root');
    const lang = root
      ? JSON.parse(JSON.parse(root).settings).lang
      : null;
    if (lang && i18n.hasResourceBundle(lang, 'translation')) {
      await i18n.changeLanguage(lang);
    }
  } catch (e) {
    console.warn('No se pudo cargar idioma de AsyncStorage', e);
  }
})();

export default i18n;
