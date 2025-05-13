// src/navigation/SimTabsNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SimsScreen from "@/screens/Sims/SimsScreen";  // crea esta pantalla si no existe

export type SimTabParamList = {
  SimList: undefined;
  // …otras rutas de SIMs
};

const Stack = createNativeStackNavigator<SimTabParamList>();

export default function SimTabsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sims" component={SimsScreen} />
      {/* …más pantallas si hace falta */}
    </Stack.Navigator>
  );
}
