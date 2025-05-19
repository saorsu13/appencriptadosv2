import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';

export function redirectBasedOnProvider(
  provider: string,
  navigation: NavigationProp<RootStackParamList>
) {
  if (provider === 'tottoli') {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  } else if (provider === 'telco-vision') {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Balance' }],
    });
  }
}
