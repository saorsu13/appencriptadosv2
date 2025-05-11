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
  ProductsList: undefined;             // listado de productos
  ProductInfo: { id: string };         // detalle de un producto
};

/**
 * Rutas raíz de tu TabNavigator
 */
export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;                             // pantalla Home
  Store: NavigatorScreenParams<ProductTabParamList>; // anida ProductTabParamList
  // ... otras tabs si las tienes
};
