// src/navigation/TabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "./types";
import HomeScreen from "../screens/Home/HomeScreen";
// IMPORTA el navigator de productos, NO la StoreScreen simple:
import ProductTabsNavigator from "./ProductTabsNavigator";
import IconSvg from "../components/molecules/IconSvg/IconSvg";

const Tab = createBottomTabNavigator<RootTabParamList>();

const iconMapping: Record<keyof RootTabParamList, string> = {
  Home: "home-icon-name",
  Store: "store-icon-name",
  // Si tienes más tabs, aquí las agregas...
};

export default function TabNavigator() {
  console.log('🛑 [TabNavigator] children count:', Tab.Screen.length);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        console.log('⭑ TabNavigator route:', route.name);
        return {
          headerShown: false,
          tabBarLabel: route.name,
          tabBarIcon: ({ color, size }) => {
            const iconName = iconMapping[route.name] ?? "circle";
            return <IconSvg name={iconName} width={size} height={size} fill={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8e8e93",
          tabBarStyle: { backgroundColor: "#000" },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Store" component={ProductTabsNavigator} />
    </Tab.Navigator>
  );
}
