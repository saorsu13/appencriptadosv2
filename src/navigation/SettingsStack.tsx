//src/navigation/SettingsStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsMain from '@/screens/Settings/SettingsMain';
import AccessPassword from '@/screens/Settings/AccessPassword';
import CreateAccessPassword from '@/screens/Settings/CreateAccessPassword';
import DeleteAccessPassword from '@/screens/Settings/DeleteAccessPassword';
import LanguageConf from '@/screens/Settings/LanguageConf';

export type SettingsStackParamList = {
  SettingsMain: undefined;
  AccessPassword: undefined;
  CreateAccessPassword: undefined;
  DeleteAccessPassword: undefined;
  LanguageConf: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsMain} />
      <Stack.Screen name="AccessPassword" component={AccessPassword} />
      <Stack.Screen name="CreateAccessPassword" component={CreateAccessPassword} />
      <Stack.Screen name="DeleteAccessPassword" component={DeleteAccessPassword} />
      <Stack.Screen name="LanguageConf" component={LanguageConf} />
    </Stack.Navigator>
  );
}
