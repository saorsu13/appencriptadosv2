// src/styles/LoginStyles/LoginStyles.ts
import { StyleSheet, Platform, Dimensions } from 'react-native';
import theme from '@/config/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const HORIZONTAL_PADDING = 20 * 2;

export const LoginStyles = StyleSheet.create({
  // pantalla entera
  container: {
    flexGrow: 1,               // ocupa todo
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  // Card interior
  inner: {
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
  },

  // header (imagen + títulos)
  containerHeader: {
    marginBottom: 20,
    borderRadius: 18,
    overflow: 'hidden',
  },
  containerHeaderImage: {
    width: '100%',
    aspectRatio: 2.196,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    aspectRatio: 2.196,
    borderRadius: 18,
    height: 158,
  },
  containerHeaderTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.contrast,
    ...theme.textVariants.buttonGroup,
    textAlign: 'center',
    marginBottom: 8,
  },
  containerHeaderMessage: {
    color: theme.colors.messageHeader,
    textAlign: 'center',
    ...theme.textVariants.contentSummary,
    paddingHorizontal: 35,
    marginBottom: 16,
  },

  // form completo
  containerForm: {
    marginBottom: 20,
  },

  // título + link
  containerTitleForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleForm: {
    color: theme.colors.textContrast,
    ...theme.textVariants.modalSummary,
  },
  titleLink: {
    borderBottomWidth: 0.3,
    borderBottomColor: theme.colors.textLInk,
    color: theme.colors.textLInk,
    ...theme.textVariants.descriptionCard,
  },

  // campos y botón
  containerFormFields: {
    marginBottom: 20,
  },
  button: {
    marginTop: 16,
    marginBottom: 20,
  },
  loadingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // steps
  stepsContainer: {
    marginBottom: 20,
  },
});
