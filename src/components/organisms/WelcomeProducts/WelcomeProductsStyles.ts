// src/components/organisms/WelcomeProducts/WelcomeProductsStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 70,
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  content: {
    flex: 1,
    rowGap: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 28,
    color: '#E3F8FF',
    fontWeight: '700',
  },
  textDescription: {
    width: 280,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#E3F8FF',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 3,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 3,
  },
});
