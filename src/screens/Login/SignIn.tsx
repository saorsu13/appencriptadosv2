import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import { useAppSelector } from '@/hooks/hooksStoreRedux';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';


import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import LoginHeader from '@/components/organisms/LoginHeader/LoginHeader';
import LoginForm from '@/components/organisms/LoginForm/LoginForm';
import LoginSteps from '@/components/organisms/LoginSteps/LoginSteps';
import { LoginStyles } from '@/styles/LoginStyles/LoginStyles';
import { useSimLogin } from '@/features/simAuth/useSimLogin';
import { determineType } from '@/utils/utils';



import type {
  RootStackParamList,
  RootTabParamList,
  SimStackParamList,
  ProductTabParamList,
} from '@/navigation/types';


type RootNav = StackNavigationProp<RootStackParamList>;
type TabNav = BottomTabNavigationProp<RootTabParamList>;
type SimNav = StackNavigationProp<SimStackParamList>;
type ProductNav = StackNavigationProp<ProductTabParamList>;

type NavigationProps = CompositeNavigationProp<
  TabNav,
  CompositeNavigationProp<RootNav, CompositeNavigationProp<SimNav, ProductNav>>
>;

export default function SignIn() {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const navigation = useNavigation<NavigationProps>();
  const { login } = useSimLogin();
  const [simNumber, setSimNumber] = React.useState('');
  const currentSim = useAppSelector(state => state.sims.currentSim);


  const handleLogin = async (simNumber: string) => {
    const sim = await login(simNumber);

    if (!sim?.idSim) {
      console.log('[SignIn] SIM inválida después del login');
      return;
    }

    console.log('[SignIn] SIM después de login:', sim);

    const simType = determineType(sim.iccid);

    if (simType === 'telco-vision') {
    navigation.navigate('Sims', {
      screen: 'BalanceScreen',
      params: { idSim: sim.idSim },
    });
  } else {
    navigation.navigate('Sims', {
      screen: 'SimDetails',
      params: { idSim: sim.idSim },
    });
  }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          LoginStyles.container,
          { backgroundColor: isDark ? '#000' : '#fff' },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderEncrypted owner="encriptados" settingsLink="LoginSettings" />
        <View
          style={[
            LoginStyles.inner,
            { backgroundColor: isDark ? '#000' : '#F0FAFF' },
          ]}
        >
          <LoginHeader />
          <LoginForm
            onSubmit={handleLogin}
            onChangeSimNumber={setSimNumber}
          />
          <LoginSteps simNumber={simNumber} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}