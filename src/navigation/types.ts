// src/navigation/types.ts
import type { NavigatorScreenParams } from "@react-navigation/native";
import type { SimStackParamList } from "./SimStackNavigator";
import type { SettingsStackParamList } from "./SettingsStack";
import type { BalanceStackParamList } from './BalanceStackNavigator';


export type HomeTabParamList = {
  HomeMain: undefined;
  BlogDetailScreen: { postId: number };
  DistributorsScreen: undefined;
  SignUpDistributorScreen: undefined;
};
/**
 * Rutas internas de la pestaña Store (antes Products)
 */
export type ProductTabParamList = {
  StoreMain: undefined;
  ProductsList: undefined;
  ProductInfo: { id: string };
};
/**
 * Rutas raíz de tu TabNavigator
 */
export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  Store: NavigatorScreenParams<ProductTabParamList>;
  Sims: NavigatorScreenParams<SimStackParamList>;
};

export type RootStackParamList = {
  Login: undefined;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
  RootTabs: NavigatorScreenParams<RootTabParamList>;
  LoginStore: undefined;
  BalanceStack: NavigatorScreenParams<BalanceStackParamList>;
};

export type { SimStackParamList };
