// src/components/organisms/HomeTab/DistributorsHome/DistributorsHome.tsx
import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useTheme } from "@shopify/restyle";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemeCustom } from "@/config/theme2";
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { HomeTabParamList } from "@/navigation/types";
import { styles } from "./DistributorsHomeStyles";
import { t } from "i18next";

const DistributorsHome = () => {
    const { themeMode } = useDarkModeTheme();
    const isDark = themeMode === ThemeMode.Dark;
    const theme = ThemeCustom[themeMode];
    const { colors } = theme;

    const navigation = useNavigation<NativeStackNavigationProp<HomeTabParamList>>();

    const Distributors = require("@/assets/img/distributors.jpg");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={[styles.titleText, { color: colors.primaryColor }]}>
            {t("pages.home-tab.distributors")}
          </Text>
        </View>

        <Text allowFontScaling={false} style={[styles.subtitleText, { color: colors.primaryText }]}>
          {t("pages.home-tab.distributors-title")}
        </Text>

        <Text allowFontScaling={false} style={[styles.descriptionText, { color: colors.secondaryText }]}>
          {t("pages.home-tab.distributors-description")}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('DistributorsScreen')} // Luego configuramos este screen
          style={[styles.button, { borderColor: colors.primaryColor }]}
        >
          <Text allowFontScaling={false} style={[styles.buttonText, { color: colors.primaryColor }]}>
            {t("pages.home-tab.joinUs")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <ImageBackground
          source={Distributors}
          style={styles.imageBackground}
          resizeMode="cover"
        />
      </View>

      {/* <CarrouselDistributors /> */}
    </View>
  );
};

export default DistributorsHome;
