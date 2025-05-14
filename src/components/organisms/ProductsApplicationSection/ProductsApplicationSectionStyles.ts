// src/components/organisms/ProductsApplicationSection/ProductsApplicationSectionStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  categorySelectorContainer: {
    width: '50%',
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
  categoryPicker: {
    height: 60,
    paddingHorizontal: 12,
    fontSize: 10,
  },
  loaderContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 120,
  },
});