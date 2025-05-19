import { StyleSheet } from 'react-native';
import theme from '@/config/theme';

export default StyleSheet.create({
  container: {
    display: 'flex',
    gap: 50,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  containerHeader: {
    display: 'flex',
    gap: 20,
  },
  containerHeaderTitle:{
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
  },
  containerHeaderImage: {
    aspectRatio: 2.1919,
    borderRadius: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    height: 158,
    width: '100%',
  },
  imageBackground: {
    width: '100%',
    height: 158,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    aspectRatio: 2.1919,
    borderRadius: 18,
    height: 158,
    width: '100%',
  },
  containerForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  textInfo: {
    marginTop: 10,
    alignSelf: 'center',
    color: theme.colors.darkGray || '#9A9A9A',
  },
  bottomButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
