import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@shopify/restyle";
import { useTranslation } from "react-i18next";

import { ThemeCustomType } from "@/config/theme2";
import HomeScreen from "@/screens/Home/HomeScreen";
import BlogDetailScreen from "@/components/organisms/HomeTab/BlogEncriptados/BlogEncriptados"; 
import { HomeTabParamList } from "./types";

const Stack = createNativeStackNavigator<HomeTabParamList>();

export default function HomeTabsNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme<ThemeCustomType>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundSecondary },
        headerTintColor: colors.primaryText,
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: t("pages.home-tab.title") }}
      />
      <Stack.Screen
        name="BlogDetailScreen"
        component={BlogDetailScreen}
        options={{ title: t("pages.home-tab.blogDetail") }}
      />
    </Stack.Navigator>
  );
}
