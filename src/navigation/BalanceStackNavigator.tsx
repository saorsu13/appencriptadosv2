// src/navigation/BalanceStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BalanceScreen from '@/screens/Balance/BalanceScreen';
import NewSimEncrypted from '@/screens/Balance/NewSimEncrypted';
import EditSimEncrypted from '@/screens/Balance/EditSimEncrypted';

export type BalanceStackParamList = {
    BalanceMain: undefined;
    NewSimEncrypted: undefined;
    EditSimEncrypted: { idSim: string };
    BalanceSettings: undefined;
  };
  
const Stack = createNativeStackNavigator<BalanceStackParamList>();

export default function BalanceStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BalanceMain" component={BalanceScreen} />
      <Stack.Screen name="NewSimEncrypted" component={NewSimEncrypted} />
      <Stack.Screen name="EditSimEncrypted" component={EditSimEncrypted} />
    </Stack.Navigator>
  );
}
