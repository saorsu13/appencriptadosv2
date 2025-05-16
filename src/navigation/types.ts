// src/navigation/types.ts
import type { NavigatorScreenParams } from "@react-navigation/native";


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
  Sims: undefined;
};

export type RootStackParamList = {
  RootTabs: undefined;
  SettingsMain: undefined;
  AccessPassword: undefined;
  CreateAccessPassword: undefined;
  DeleteAccessPassword: undefined;
  LanguageConf: undefined;
  LoginStore: undefined;
};
