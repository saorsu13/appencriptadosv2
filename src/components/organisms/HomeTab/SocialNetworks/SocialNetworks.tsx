// src/components/organisms/HomeTab/SocialNetworks/SocialNetworks.tsx

import React from "react";
import { View, TouchableOpacity, Linking, Alert, Text } from "react-native";
import { useTheme } from "@shopify/restyle";
import { t } from "i18next";

import { useAppSelector } from "@/hooks/hooksStoreRedux";
import { ThemeCustom } from "@/config/theme2";
import { useDarkModeTheme, ThemeMode } from "@/context/theme";
import IconSvg from "@/components/molecules/IconSvg/IconSvg";

import { styles } from "./SocialNetworksStyles";

const LANGUAGES = {
  EN: "en",
  ES: "es",
  FR: "fr",
} as const;

type LanguageCode = keyof typeof LANGUAGES;

interface SocialNetwork {
  type:
    | "x"
    | "telegram"
    | "linkedin"
    | "instagram"
    | "youtube";
  urls: Record<LanguageCode | string, string>;
}

const SocialNetworks: React.FC = () => {
  const { themeMode } = useDarkModeTheme();
  const { colors } = ThemeCustom[themeMode];
  const { lang } = useAppSelector((state) => state.settings);

  const iconProps = {
    width: 24,
    height: 24,
    color: "#12b4e7",
  };

  const socialNetworksData: SocialNetwork[] = [
    {
      type: "telegram",
      urls: {
        en: "https://t.me/encriptados_english",
        es: "https://t.me/Encriptadosio",
        fr: "https://t.me/encriptados_francais",
      },
    },
    {
      type: "linkedin",
      urls: {
        en: "https://www.linkedin.com/company/encriptados-english/",
        es: "https://linkedin.com/company/encriptados",
        fr: "https://www.linkedin.com/company/encriptados-fran%C3%A7ais/",
      },
    },
    {
      type: "youtube",
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
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "700", color: colors.primaryText, marginBottom: 12 }}>
        {t("pages.home-tab.followUs")}
      </Text>

      <View style={styles.contentSocialNetworks}>
        {socialNetworksData.map((social, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(social.urls)}
            style={styles.logoContainer}
          >
            <IconSvg type={social.type} {...iconProps} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SocialNetworks;
