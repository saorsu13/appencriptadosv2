// src/components/organisms/HomeTab/AboutUsHome/AboutUsHome.tsx
import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { useTheme } from "@shopify/restyle";
import { ThemeCustom } from "@/config/theme2";
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { t } from "i18next";

import IconEncriptados from "@/assets/icons/IconEncriptados";
import { styles } from "./AboutUsHomeStyles";

const CardBlog = require("@/assets/img/security-aboutus.png");

const AboutUsHome: React.FC = () => {
    const { themeMode } = useDarkModeTheme();
    const isDark = themeMode === ThemeMode.Dark;
    const theme = ThemeCustom[themeMode];
    const { colors } = theme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.contentContainer}>
        <View style={styles.titleWrapper}>
          <Text
            allowFontScaling={false}
            style={[styles.title, { color: colors.primaryColor }]}
          >
            {t("pages.home-tab.aboutUs")}
          </Text>
        </View>

        <IconEncriptados color={colors.neutro} />

        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.image}
            resizeMode="cover"
            source={CardBlog}
          />
        </View>

        <Text
          allowFontScaling={false}
          style={[styles.description, { color: colors.secondaryText }]}
        >
          {t("pages.home-tab.aboutUsDescription")}
        </Text>
      </View>
    </View>
  );
};

export default AboutUsHome;
