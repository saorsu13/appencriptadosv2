// src/components/molecules/Stepper/CardInfoStepperStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
  },
  innerContainer: {
    padding: 15,
    borderRadius: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRow: {
    marginTop: 10,
  },
  priceContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  imageContainer: {
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  titleText: {
    flex: 1,
    fontWeight: '700',
    fontSize: 14,
    padding: 5,
    marginLeft: 10,
  },
  descriptionText: {
    fontSize: 14,
    padding: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
