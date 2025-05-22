import { CommonActions, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';

export function redirectBasedOnProvider(
  provider: string,
  navigation: NavigationProp<RootStackParamList>
) {
  if (provider === 'tottoli') {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'RootTabs',
            state: {
              index: 0,
              routes: [
                {
                  name: 'Sims',
                  state: {
                    index: 0,
                    routes: [{ name: 'SimsList' }],
                  },
                },
              ],
            },
          },
        ],
      })
    );
  } else if (provider === 'telco-vision') {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'BalanceStack',
            state: {
              index: 0,
              routes: [{ name: 'BalanceMain' }],
            },
          },
        ],
      })
    );
  }
}
