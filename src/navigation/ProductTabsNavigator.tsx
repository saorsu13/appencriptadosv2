// src/navigation/ProductTabsNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { ProductTabParamList } from "./types";
import StoreScreen from "../screens/Store/StoreScreen";
import ProductsSimSection from "@/components/organisms/ProductsSimSection/ProductsSimSection";
import ProductInfoScreen from "@/screens/Store/ProductScreen";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { ThemeCustomType } from "@/config/theme2";

const Stack = createNativeStackNavigator<ProductTabParamList>();

export default function ProductTabsNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme<ThemeCustomType>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundSecondary },
        headerShown: false,
        headerTintColor: colors.primaryText,
      }}
    >
      <Stack.Screen
        name="StoreMain"
        component={StoreScreen}
        options={{ title: t ("pages.home-tab.store")}}
      />
      <Stack.Screen
        name="ProductsList"
        component={ProductsSimSection}
        options={{ title: t("pages.home-tab.products") }}
      />
      <Stack.Screen
        name="ProductInfo"
        component={ProductInfoScreen}
        options={{ title: t("pages.home-tab.moreInfo") }}
      />
    </Stack.Navigator>
  );
}
