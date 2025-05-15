import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';

interface FilterTabsProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ options, selected, onSelect, label }) => {
  const { colors } = useTheme<ThemeCustomType>();

  return (
    <View style={styles.wrapper}>
      {label && <Text style={[styles.label, { color: colors.primaryText }]}>{label}</Text>}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {options.map(opt => {
          const active = opt === selected;
          return (
            <TouchableOpacity
              key={opt}
              style={[
                styles.tab,
                { backgroundColor: active ? colors.white : colors.backgroundSecondary }
              ]}
              onPress={() => onSelect(opt)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: active ? colors.background : colors.primaryText }
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '96%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default FilterTabs;