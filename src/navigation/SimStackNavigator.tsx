// src/navigation/SimStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '@/hooks/hooksStoreRedux';

import SimLogin from '@/screens/Login/SignIn';         
import SimsScreen from '@/screens/Sims/SimsScreen';     
import NewSimTottoli from '@/screens/Sims/NewSimTottoli';
import EditSimTottoli from '@/screens/Sims/EditSimTottoli';
import VoiceFilter from '@/screens/Sims/VoiceFilter';
import Substitute from '@/screens/Sims/Substitute';
import Callback from '@/screens/Sims/Callback';
  
export type SimStackParamList = {
  SimLogin: undefined;
  SimsList: undefined;
  SimDetails: { idSim: string };
  VoiceFilter: undefined;
  Substitute: undefined;
  Callback: undefined;
  BalanceScreen: { idSim: string };
  NewSimTottoli: undefined;
  EditSimTottoli: { idSim: string };
};

const Stack = createNativeStackNavigator<SimStackParamList>();

export default function SimStackNavigator() {
  const isSimAuthenticated = useAppSelector(
    state => state.simAuth.isSimAuthenticated
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isSimAuthenticated ? (
        <Stack.Screen name="SimLogin" component={SimLogin} />
      ) : (
        <>
          <Stack.Screen name="SimsList" component={SimsScreen} />
          <Stack.Screen name="NewSimTottoli" component={NewSimTottoli} />
          <Stack.Screen name="EditSimTottoli" component={EditSimTottoli} />
          <Stack.Screen name="Substitute" component={Substitute}/>
          <Stack.Screen name="VoiceFilter" component={VoiceFilter} />
          <Stack.Screen name="Callback" component={Callback} />
        </>
      )}
    </Stack.Navigator>
  );
}
