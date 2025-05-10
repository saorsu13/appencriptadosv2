// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import StoreScreen from '../screens/Store/StoreScreen';
/* …resto de imports… */
import IconSvg from '../components/molecules/IconSvg/IconSvg';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: route.name,
        tabBarIcon: ({ color, size }) => {
          let iconName = {/* tu mapping… */}[route.name] || 'circle';
          return <IconSvg name={iconName} width={size} height={size} fill={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: { backgroundColor: '#000' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Store" component={StoreScreen} />
      {/* …otras pestañas… */}
    </Tab.Navigator>
  );
}
