// src/navigation/SimStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '@/hooks/hooksStoreRedux';

import SimLogin from '@/screens/Login/SignIn';         
import SimsScreen from '@/screens/Sims/SimsScreen';     
// import SimScreen from '@/screens/Sim/SimScreen';      
// import NewSimTottoli from '@/screens/Sim/NewSimTottoli';
// import EditSimTottoli from '@/screens/Sim/EditSimTottoli';
  
export type SimStackParamList = {
  SimLogin: undefined;
  SimsList: undefined;
  SimDetails: { idSim: string };
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
          {/* <Stack.Screen name="SimDetails" component={SimScreen} />
          <Stack.Screen name="NewSimTottoli" component={NewSimTottoli} />
          <Stack.Screen name="EditSimTottoli" component={EditSimTottoli} /> */}
          {/* … demás pantallas … */}
        </>
      )}
    </Stack.Navigator>
  );
}
