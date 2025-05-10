// src/components/molecules/CardProductItem/CardProductItemStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: { width: '50%', padding: 5 },
  phoneContainer: { width: '100%' },
  fullWidthCard: { width: '100%' },
  innerContainer: { borderRadius: 10, alignItems: 'center' },
  imageBackground: { width: 150, height: 150 },
  offerText: { padding: 9, fontSize: 12, textAlign: 'center', color: 'black' },
  offerPriceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 4 },
  offerPriceText: { color: 'black', fontWeight: 'bold' },
  offerBonusText: { fontSize: 10 },
  offerButtonWrapper: { width: '100%', marginTop: 2, paddingHorizontal: 5, paddingVertical: 12 },
  offerButton: { paddingVertical: 10, borderRadius: 25, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' },
  productNameText: { marginTop: 15, fontWeight: '700', textAlign: 'center' },
  productPriceText: { fontWeight: '300', padding: 2, textAlign: 'center' },
  productButtonWrapper: { width: '60%', marginTop: 2 },
  defaultButtonWrapper: { width: '80%' },
  infoContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  moreInfoText: { marginTop: 15, marginBottom: 20 },
});