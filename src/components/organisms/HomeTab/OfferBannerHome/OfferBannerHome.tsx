import React from "react";
import { useTheme } from "@shopify/restyle";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconSvg from "@/components/molecules/IconSvg/IconSvg";
import { ThemeCustom } from "@/config/theme2";
import { ThemeMode } from "@/context/theme";
import { setProduct } from "@/features/menuCurrentProduct/menuCurrentProductSlice";
import { useDarkModeTheme } from "@/hooks/useDarkModeTheme";
import { useDispatch } from "react-redux";
import { t } from "i18next";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootTabParamList, ProductTabParamList } from "@/navigation/types";

const DarkBanner = require("@/assets/images/background-split-home.png");
const LightBanner = require("@/assets/images/background-splite-home-light.png");
const SimImage = require("@/assets/images/card-encriptados.png");

type OfferNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "Home">,
  NativeStackNavigationProp<ProductTabParamList>
>;

const OfferBannerHome: React.FC = () => {
  const { themeMode } = useDarkModeTheme();
    const theme = ThemeCustom[themeMode];
    const { colors } = theme;
  const navigation = useNavigation<OfferNavProp>();
  const dispatch = useDispatch();

  // Navegar al detalle de producto dentro del Tab "Products"
  const goToBuy = () => {
  navigation.navigate("Store", {
    screen: "ProductInfo",
    params: { id: "50228" },
  });
};

  // Ir al listado de productos y establecer el producto actual
  const goToMoreInfo = () => {
  dispatch(setProduct("sim"));
  navigation.navigate("Store", {
    screen: "ProductsList",
  });
};

  return (
    <ImageBackground
      source={themeMode === ThemeMode.Dark ? DarkBanner : LightBanner}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={[styles.iconWrapper, { backgroundColor: colors.backgroundAlternate2 }]}>  
          <IconSvg color={colors.secondaryColor} type="codesafe" />
        </View>
        <Text style={[styles.title, { color: colors.primaryText }]}>  
          {t("pages.home-tab.encryptedSim")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>  
          {t("pages.home-tab.protectYourself")}
        </Text>
        <Image source={SimImage} style={styles.simImage} resizeMode="contain" />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.buyButton} onPress={goToBuy}>
          <Text style={styles.buyText}>{t("pages.home-tab.buy")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToMoreInfo}>
          <Text style={styles.moreInfoText}>{t("pages.home-tab.moreInfo")}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OfferBannerHome;

const styles = StyleSheet.create({
  container: { width: "100%", height: 750 },
  content: { flex: 1, justifyContent: "center", alignItems: "center", width: "100%", paddingVertical: 20 },
  iconWrapper: { padding: 13, borderRadius: 14, marginBottom: 10 },
  title: { fontWeight: "700", fontSize: 24, marginBottom: 8 },
  subtitle: { fontWeight: "400", fontSize: 16, width: 280, textAlign: "center", marginBottom: 20 },
  simImage: { width: 300, height: 300, marginBottom: 40 },
  actionsContainer: { width: "100%", height: 160, alignItems: "center", justifyContent: "center" },
  buyButton: { marginBottom: 10, backgroundColor: "#E3F8FF", paddingHorizontal: 12, paddingVertical: 12, borderRadius: 12, width: 180 },
  buyText: { color: "#0F4457", textAlign: "center", fontWeight: "600" },
  moreInfoText: { color: "white", fontWeight: "500" },
});
