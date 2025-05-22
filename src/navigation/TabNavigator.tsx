import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@shopify/restyle";
import type { RootTabParamList } from "./types";
import { ThemeCustomType } from '@/config/theme2';
import HomeScreen from "../screens/Home/HomeScreen";

import HomeTabsNavigator from "./HomeTabsNavigator";
import ProductTabsNavigator from "./ProductTabsNavigator";
import ActivityIcon from "@assets/icons/HomeIconMenu";
import ShopIconMenu from "@assets/icons/ShopIconMenu";
import styles from "../styles/TabNavigatorStyles";
import SimStackNavigator from './SimStackNavigator';
import Sim from "@/assets/icons/Sim";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme<ThemeCustomType>();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarActiveBackgroundColor: colors.strokeBorder,
        tabBarInactiveBackgroundColor: "transparent",

        tabBarStyle: {
          ...styles.tabBar,
          height: styles.tabBar.height + insets.bottom,
          paddingBottom: insets.bottom + 10,
          borderTopWidth: 0,
        },
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTabsNavigator}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <ActivityIcon width={size} height={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Store"
        component={ProductTabsNavigator}
        options={{
          tabBarLabel: "Comprar",
          tabBarIcon: ({ color, size }) => (
            <ShopIconMenu width={size} height={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Sims"
        component={SimStackNavigator}
        options={{
          tabBarLabel: "SIM’s",
          tabBarIcon: ({ color, size }) => (
            <Sim width={size} height={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
