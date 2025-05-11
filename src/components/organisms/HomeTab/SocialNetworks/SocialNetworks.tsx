// src/components/organisms/HomeTab/SocialNetworks/SocialNetworks.tsx
import React from "react";
import { View, TouchableOpacity, Linking, Alert } from "react-native";
import { useTheme } from "@shopify/restyle";

import { useAppSelector } from "@/hooks/hooksStoreRedux";
import { ThemeCustom } from "@/config/theme2";
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import IconSvg from "@/components/molecules/IconSvg/IconSvg";

import { styles } from "./SocialNetworksStyles";

const LANGUAGES = {
  EN: "en",
  ES: "es",
  FR: "fr",
} as const;

type LanguageCode = keyof typeof LANGUAGES;

interface SocialNetwork {
  type: string;
  component: React.ReactNode;
  urls: Record<LanguageCode | string, string>;
}

const SocialNetworks: React.FC = () => {
    const { themeMode } = useDarkModeTheme();
    const isDark = themeMode === ThemeMode.Dark;
    const theme = ThemeCustom[themeMode];
    const { colors } = theme;
    const { lang } = useAppSelector((state) => state.settings);

  const socialNetworksData: SocialNetwork[] = [
    {
      type: "x",
      component: <IconSvg color={colors.white} type="x" />,
      urls: {
        en: "https://x.com/encriptados_io",
        es: "https://x.com/encriptados_io",
        fr: "https://x.com/encriptados_io",
      },
    },
    {
      type: "telegram",
      component: <IconSvg color={colors.white} type="telegram" />,
      urls: {
        en: "https://t.me/encriptados_english",
        es: "https://t.me/Encriptadosio",
        fr: "https://t.me/encriptados_francais",
      },
    },
    {
      type: "linkedin",
      component: <IconSvg color={colors.white} type="linkedin" />,
      urls: {
        en: "https://www.linkedin.com/company/encriptados-english/",
        es: "https://linkedin.com/company/encriptados",
        fr: "https://www.linkedin.com/company/encriptados-fran%C3%A7ais/",
      },
    },
    {
      type: "instagram",
      component: <IconSvg color={colors.white} type="instagram" />,
      urls: {
        en: "https://www.instagram.com/encriptados_english/",
        es: "https://www.instagram.com/encriptados.io/",
        fr: "https://www.instagram.com/encriptados_francais/",
      },
    },
    {
      type: "youtube",
      component: <IconSvg color={colors.white} type="youtube" />,
      urls: {
        en: "https://www.youtube.com/@encriptados_io",
        es: "https://www.youtube.com/@encriptados_io",
        fr: "https://www.youtube.com/@encriptados_io",
      },
    },
  ];

  const handlePress = async (urls: Record<string, string>) => {
    const selectedUrl = urls[lang] || urls.en;

    try {
      const supported = await Linking.canOpenURL(selectedUrl);
      if (supported) {
        await Linking.openURL(selectedUrl);
      } else {
        Alert.alert("Error", "No se puede abrir el enlace.");
      }
    } catch (error) {
      Alert.alert("Error", "Ha ocurrido un error al abrir el enlace.");
    }
  };

  return (
    <View style={styles.contentSocialNetworks}>
      {socialNetworksData.map((social, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(social.urls)}>
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: colors.backgroundAlternate },
            ]}
          >
            {social.component}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SocialNetworks;
