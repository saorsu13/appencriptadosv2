// src/components/molecules/BalanceDetails/BalanceDetailsStyles.ts

import { StyleSheet } from 'react-native';
import { Theme } from '@/config/theme';


export const getStyles = (isDark: boolean, colors: Theme['colors']) =>
  StyleSheet.create({
    balanceContainer: {
      backgroundColor: isDark ? colors.darkBlack04 : colors.contrast,
      borderRadius: 12,
    //   paddingHorizontal: 10,
      paddingVertical: 12,
    //   marginBottom: 8,
    },

    balanceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    balanceHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 1,
    },
    balanceLabel: {
      fontSize: 14,
      fontWeight: '400',
      marginRight: 8,
      color: isDark ? colors.secondaryText : colors.secondaryText,
    },
    mainBalanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    balanceValue: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 8,
      color: isDark ? '#00FFC2' : colors.blueDark,
    },

    balanceContent: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    // cardItemDefault: {
    //   minWidth: 100,
    //   maxWidth: 120,
    //   marginBottom: 12,
    // },
  });
