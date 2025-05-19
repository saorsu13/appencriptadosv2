import { StyleSheet } from 'react-native';
import theme from '@/config/theme';

export const networkProfileStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.darkBlack01,
    borderRadius: 16,
    padding: 16,
  },
  containerLight: {
    backgroundColor: theme.lightMode.colors.cyanSuperLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  countdownContainer: {
    marginTop: 12,
    alignItems: 'stretch',
  },
  countdownText: {
    color: theme.colors.contrast,
    fontSize: 12,
    marginBottom: 4,
  },
  countdownTextLight: {
    color: theme.lightMode.colors.blueDark,
  },
});
