import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const simOptionsStyles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    marginTop: -25,
  },
  row: {
    flexDirection: 'row',
    flexWrap: width < 600 ? 'wrap' : 'nowrap',
    justifyContent: 'center',
    gap: 12,
  },
  item: {
    width: width < 600 ? (width / 2) - 30 : (width / 4) - 20,
    minHeight: 80,
    borderRadius: 24,
    justifyContent: 'center',
    padding: 16,
  },
  iconWrapper: {
    alignSelf: 'center',  
    marginBottom: 8, 
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
});
