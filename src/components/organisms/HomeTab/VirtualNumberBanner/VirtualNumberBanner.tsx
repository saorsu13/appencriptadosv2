import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDarkModeTheme } from "@/context/theme";
import { ThemeCustom } from "@/config/theme2";
import { setProduct, SECTIONS } from "@/features/menuCurrentProduct/menuCurrentProductSlice";
import { useDispatch } from "react-redux";
import { t } from "i18next";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeTabParamList, RootTabParamList } from "@/navigation/types";

const BannerImage = require("@/assets/img/Frame 480956851.png");

const { width } = Dimensions.get("window");

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeTabParamList>,
  BottomTabNavigationProp<RootTabParamList>
>;

const VirtualNumberBanner = () => {
  const navigation = useNavigation<NavigationProp>();
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];
  const dispatch = useDispatch();
  const { colors } = theme;

  const handlePress = () => {
    dispatch(setProduct(SECTIONS.APPLICATION));
    navigation.navigate("Store", { screen: "StoreMain" });
  };

  return (
    <View style={[styles.container, { backgroundColor: "#101010" }]}>
      <Image
        source={BannerImage}
        resizeMode="cover"
        style={styles.backgroundImage}
      />

      {/* Contenido encima */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primaryText }]}>
          {t("pages.home-tab.virtualnumber-title")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
          {t("pages.home-tab.virtualnumber-subtitle")}
          <Text style={{ fontWeight: "700" }}>
            {" "}
            {t("pages.home-tab.virtualnumber-highlight")}
          </Text>
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primaryColor }]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>
            {t("pages.home-tab.virtualnumber-button")}
          </Text>
        </TouchableOpacity>

        <Text style={styles.note}>🇨🇴 {t("pages.home-tab.virtualnumber-note")}</Text>
      </View>
    </View>
  );
};

export default VirtualNumberBanner;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Platform.OS === 'ios' ? 750 : 700,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    marginTop: "48%",
    width: "100%",
  },
  content: {
    zIndex: 2,
    paddingHorizontal: 24,
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
  },
  note: {
    fontSize: 12,
    color: "#CCCCCC",
    marginBottom: 24,
    zIndex: 2,
  },
});
