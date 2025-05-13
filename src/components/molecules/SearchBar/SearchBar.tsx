import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';
import SearchIcon from '@/assets/icons/SearchIcon';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar producto',
  onSubmit,
}: SearchBarProps) {
  const { colors } = useTheme<ThemeCustomType>();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundAlternate,
          borderColor: colors.strokeBorder,
        },
      ]}
    >
      <TextInput
        style={[styles.input, { color: colors.primaryText }]}
        placeholder={placeholder}
        placeholderTextColor={colors.secondaryText}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity
        onPress={onSubmit}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <SearchIcon width={24} height={24} color={colors.secondaryText} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    paddingHorizontal: 30,
    height: 52,
    marginTop: 30,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontWeight: 600,
    paddingVertical: 0,
    marginRight: 8,
  },
});
