import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LaguageConfL from '@/screens/Login/LoginSettings/LanguageConfL';
import SignIn from '@/screens/Login/SignIn';
import LoginSettings from '@/screens/Login/LoginSettings/LoginSettings';

const Stack = createNativeStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="LoginSettings" component={LoginSettings} />
      <Stack.Screen name="LaguageConfL" component={LaguageConfL} />
    </Stack.Navigator>
  );
}