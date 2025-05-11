import { ThemeCustom } from "@/config/theme2";
import { useTheme } from "@shopify/restyle";
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeTabParamList } from "@/navigation/types";

const ContactButton = () => {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const navigation = useNavigation<NativeStackNavigationProp<HomeTabParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.backgroundAlternate2 }]}
        onPress={() => {
          navigation.navigate("SignUpDistributorScreen");
        }}
      >
        <Text
          allowFontScaling={false}
          style={[styles.buttonText, { color: colors.primaryText }]}
        >
          Inscribirme
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    alignSelf: "center",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#000",
  },
});

export default ContactButton;
