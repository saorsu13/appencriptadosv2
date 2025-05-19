// src/components/molecules/CurrencySelector/CurrencySelector.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import countries from '@/constants/countries';
import CountryFlag from 'react-native-country-flag';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';

type CurrencySelectorProps = {
    label: string;
    selectedValue?: string | null;
    onSelect: (value: string) => void;
  };

export default function CurrencySelector({
  label,
  selectedValue,
  onSelect
}: CurrencySelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedOption = useMemo(
    () => countries.find(c => c.value === selectedValue),
    [selectedValue]
  );

  const getCurrencyCode = (value: string) => value.split('-')[1] || value;

  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectorContent}>
          {selectedOption?.icon && selectedOption.icon()}
          <Text
            style={[styles.selectorText, { marginLeft: 8 }]}
            numberOfLines={1}
          >
            {selectedOption
              ? getCurrencyCode(selectedOption.value)
              : '—'}
          </Text>
        </View>
        <Ionicons
          name="chevron-down"
          size={20}
          color={isDark ? 'white' : 'gray'}
        />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecciona un país / moneda</Text>
            <FlatList
              data={countries}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                  onSelect(item.value);
                  setModalVisible(false);
                }}
>
                  <View style={styles.selectorContent}>
                    {item.icon && item.icon()}
                    <Text style={[styles.selectorText, { marginLeft: 10 }]}>
                      {getCurrencyCode(item.value)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    label: {
      color: isDark ? '#CCCCCC' : '#1E1E1E',
      fontSize: 12,
      marginBottom: 6,
    },
    selector: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: isDark ? '#161616' : '#D0EFFF',
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      minHeight: 50,
    },
    selectorContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,        
      flexShrink: 1,  
      minWidth: 0,  
    },
    selectorText: {
      color: isDark ? 'white' : '#1E1E1E',
      fontSize: 14,
      flexGrow: 1,    
      flexShrink: 1,  
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
      padding: 16,
      maxHeight: '80%',
    },
    modalTitle: {
      color: isDark ? 'white' : '#1E1E1E',
      fontSize: Platform.OS === 'ios' ? 15 : 16,
      fontWeight: '500',
      marginBottom: 12,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 0.5,
      borderColor: isDark ? '#444' : '#DDD',
    },
  });
