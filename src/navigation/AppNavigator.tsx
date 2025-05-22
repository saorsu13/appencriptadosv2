// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import type { RootStackParamList } from "./types";
import LoginStoreScreen from "@/screens/Store/LoginStoreScreen";
import LoginStack from './LoginStack';
import SettingsStackNavigator from './SettingsStack';
import { useRestoreSimAuth } from '@/hooks/useRestoreSimAuth';
import BalanceStackNavigator from './BalanceStackNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  useRestoreSimAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RootTabs" component={TabNavigator} />
        <Stack.Screen name="Login" component={LoginStack} />
        <Stack.Screen name="Settings" component={SettingsStackNavigator} />
        <Stack.Screen name="BalanceStack" component={BalanceStackNavigator} />
        <Stack.Screen
          name="LoginStore"
          component={LoginStoreScreen}
          options={{ presentation: 'modal', title: 'Acceder' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
