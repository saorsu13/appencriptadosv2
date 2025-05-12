// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";

// Importa aquí las pantallas de Settings
import SettingsMain from "@/screens/Settings/SettingsMain";
import AccessPassword from "@/screens/Settings/AccessPassword";
import CreateAccessPassword from "@/screens/Settings/CreateAccessPassword";
import DeleteAccessPassword from "@/screens/Settings/DeleteAccessPassword";
import LanguageConf from "@/screens/Settings/LanguageConf";

import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 1) Navigator de tabs */}
        <Stack.Screen name="RootTabs" component={TabNavigator} />

        {/* 2) Todas las pantallas de Settings, accesibles desde cualquier parte */}
        <Stack.Screen name="SettingsMain" component={SettingsMain} />
        <Stack.Screen name="AccessPassword" component={AccessPassword} />
        <Stack.Screen name="CreateAccessPassword" component={CreateAccessPassword} />
        <Stack.Screen name="DeleteAccessPassword" component={DeleteAccessPassword} />
        <Stack.Screen name="LanguageConf" component={LanguageConf} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
