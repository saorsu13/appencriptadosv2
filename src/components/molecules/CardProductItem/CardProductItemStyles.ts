import { StyleSheet } from 'react-native';
import theme from "@/config/theme";

export const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding: 5,
  },
  phoneContainer: {
    width: '100%',
  },
  fullWidthCard: {
    width: '100%',
  },
  innerContainer: {
    borderRadius: 10,
    padding: 16,
  },
  imageBackground: {
    width: 150,
    height: 150,
  },
  offerText: {
    padding: 9,
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
  },
  offerPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
  },
  offerPriceText: {
    color: 'black',
    fontWeight: 'bold',
  },
  offerBonusText: {
    fontSize: 10,
  },
  offerButtonWrapper: {
    width: '100%',
    marginTop: 2,
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  offerButton: {
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  imageWrapper: {
  marginTop: 20,
  alignItems: 'center',
},
  productNameText: {
    marginTop: 15,
    fontWeight: '700',
    alignItems: 'flex-start',
  },
  productPriceText: {
    fontWeight: '300',
    padding: 2,
    alignItems: 'flex-start',
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#3A3A3A",
    marginVertical: 10,
    marginTop: 13,
    marginBottom: 12,
  },
  productButtonWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  // Boton Comprar
  buyButton: {
    width: '48%',
  },
  // Boton Añadir al carrito
  cartButton: {
    width: '48%',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  moreInfoText: {
    color: theme.colors.mainActionState,
    fontSize: 14,
  },
});
