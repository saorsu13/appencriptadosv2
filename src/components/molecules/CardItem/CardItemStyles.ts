import { StyleSheet } from 'react-native';
import theme from '@/config/theme';

export const cardItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    minWidth: 100,
    maxWidth: 120,
    flexGrow: 1,
    flexShrink: 1,
  },  
  containerBody: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 20,
    borderWidth: 0.5,
    borderColor: '#00FFC2',
    borderRadius: 14,
    backgroundColor: theme.colors.mainBackground,
    width: '100%',
  },
  containerBodyLight: {
    backgroundColor: theme.lightMode.colors.blueLight,
    borderWidth: 2,
    borderColor: theme.lightMode.colors.borderBlueLight,
  },
  title: {
    ...theme.textVariants.inputCode,
    color: theme.colors.textContrast,
    textAlign: 'center',
  },
  titleLight: {
    color: theme.lightMode.colors.blueDark,
  },
  description: {
    ...theme.textVariants.descriptionCard,
    color: theme.colors.textContrast,
    textAlign: 'center',
  },
  descriptionLight: {
    color: theme.lightMode.colors.blueDark,
  },
  caption: {
    ...theme.textVariants.captionCard,
    fontWeight: '600',
    color: theme.colors.contrast,
    textAlign: 'center',
  },
  captionLight: {
    color: theme.lightMode.colors.blueDark,
  },
  skeletonTitle: {
    flex: 1,
    width: 50,
    height: 28,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  skeletonCaption: {
    flex: 1,
    width: 50,
    height: 14,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
