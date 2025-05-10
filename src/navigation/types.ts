// src/navigation/types.ts
import type { NavigatorScreenParams } from "@react-navigation/native";

/**
 * Rutas internas de la pestaña Store (antes Products)
 */
export type ProductTabParamList = {
  ProductsList: undefined;             // listado de productos
  ProductInfo: { id: string };         // detalle de un producto
};

/**
 * Rutas raíz de tu TabNavigator
 */
export type RootTabParamList = {
  Home: undefined;                                 // pantalla Home
  Store: NavigatorScreenParams<ProductTabParamList>; // anida ProductTabParamList
  // ... otras tabs si las tienes
};
