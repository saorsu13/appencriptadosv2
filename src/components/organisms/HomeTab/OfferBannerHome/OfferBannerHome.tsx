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
import { ThemeCustom } from "@/config/theme2";
import { ThemeMode } from "@/context/theme";
import { setProduct } from "@/features/menuCurrentProduct/menuCurrentProductSlice";
import { useDarkModeTheme } from "@/hooks/useDarkModeTheme";
import { useDispatch } from "react-redux";
import { t } from "i18next";
import { LinearGradient } from 'expo-linear-gradient';
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootTabParamList, ProductTabParamList } from "@/navigation/types";

const SimImage = require("@/assets/img/card-encriptados.png");
const BusinessGuy = require("@/assets/img/image 324.png");

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
    <LinearGradient
      colors={['#032029', '#000000', '#000000', '#032029']} // Mucho más negro, azul muy sutil al final
      style={styles.container}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 1, y: 0.6 }}
    >
      <View style={styles.content}>
        <Image source={SimImage} style={styles.simImage} resizeMode="contain" />
        <Text style={[styles.title, { color: colors.primaryText }]}>
          {t("pages.home-tab.encryptedSim")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
          {t("pages.home-tab.protectYourself")}
        </Text>

        <TouchableOpacity style={styles.buyButton} onPress={goToBuy}>
          <Text style={styles.buyText}>{t("pages.home-tab.buy")}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={goToMoreInfo}>
          <Text style={styles.moreInfoText}>{t("pages.home-tab.moreInfo")}</Text>
        </TouchableOpacity> */}
        <Image source={BusinessGuy} style={styles.businessGuyImage} resizeMode="contain" />
      </View>
    </LinearGradient>
  );
};

export default OfferBannerHome;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  simImage: {
    width: 280,
    height: 180,
    marginBottom: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    width: 280,
    marginBottom: 24,
  },
  buyButton: {
    backgroundColor: "#0AAEE1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buyText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  businessGuyImage: {
    width: 200,
    height: 250,
    marginBottom: -10,
  },
});
