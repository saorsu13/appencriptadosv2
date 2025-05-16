// src/components/organisms/ProductsRoutersSection/ProductsRoutersSectionStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: 120,       // ajusta según tu diseño
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,   // opcional
  },
  listContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
