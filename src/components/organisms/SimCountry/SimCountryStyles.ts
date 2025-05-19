// src/components/molecules/SimCountry/SimCountryStyles.ts

import { StyleSheet } from 'react-native';

export const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    selectorWrapper: {
      width: '48%',
    },
    label: {
      color: isDark ? '#CCCCCC' : '#1E1E1E',
      fontSize: 12,
      marginBottom: 6,
      flexWrap: 'nowrap',
    },
    selector: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: isDark ? '#161616' : '#D0EFFF',
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 12,
      minHeight: 50,
    },
    selectorContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 1,
      minWidth: 0,
    },
    simNameContainer: {
      flexShrink: 1,
      minWidth: 0,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 8,
    },
    selectorText: {
      color: isDark ? 'white' : '#1E1E1E',
      fontSize: 14,
    },
    icon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
      marginLeft: 2,
      marginRight: 2,
      borderRadius: 8,
    },

    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '85%',
      backgroundColor: isDark ? '#121212' : '#E5F9FF',
      borderRadius: 15,
      padding: 20,
    },
    simNameContainerModal: {
      flexShrink: 1,
      backgroundColor: isDark ? '#363636' : '#C6EDFF',
      minWidth: 0,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 8,
    },
    modalTitle: {
      color: isDark ? '#FFFFFF' : '#1E1E1E',
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 15,
    },
    simItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#FFFFFF' : '#F7F7F7',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      justifyContent: 'space-between',
    },
    simInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    simName: {
      color: isDark ? '#FFFFFF' : '#1E1E1E',
      fontSize: 12,
      fontWeight: 'bold',
    },
    simNumber: {
      color: '#1E1E1E',
      fontSize: 14,
      marginLeft: 10,
      fontWeight: 'bold',
      maxWidth: 150,
      flexShrink: 0,
      flexWrap: 'nowrap',
    },
    addSimButton: {
      backgroundColor: '#00AEEF',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'flex-start',
      paddingHorizontal: 15,
      marginTop: 10,
      width: '100%',
    },
    addSimText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left',
      width: '100%',
    },
  });
