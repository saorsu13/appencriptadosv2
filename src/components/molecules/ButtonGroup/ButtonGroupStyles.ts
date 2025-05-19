import { StyleSheet } from 'react-native';
import theme from '@/config/theme';

export const buttonGroupStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    padding: 2,
  },
  itemWrapper: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '45%',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: theme.colors.contrast,
    minHeight: 64,
  },
  buttonLight: {
    borderColor: theme.lightMode.colors.blueDark,
  },
  selectedDark: {
    backgroundColor: theme.colors.contrast,
  },
  selectedLight: {
    backgroundColor: theme.lightMode.colors.blueDark,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: theme.colors.contrast,
    ...theme.textVariants.buttonGroup,
    textAlign: 'center',
  },
  selectedTextDark: {
    color: theme.colors.darkBlack01,
  },
  selectedTextLight: {
    color: theme.colors.mainActionState,
  },
  tag: {
    marginTop: -6,
    bottom: 4,
    left: '15%',
    width: '70%',
    padding: 4,
    borderRadius: 14,
    backgroundColor: theme.colors.softSKin,
    alignItems: 'center',
  },
  tagLight: {
    backgroundColor: theme.lightMode.colors.blueDark,
  },
  tagText: {
    fontSize: 12,
    color: theme.colors.darkBlack01,
  },
});
