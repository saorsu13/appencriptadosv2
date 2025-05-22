// src/components/molecules/Pagination/Pagination.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  activeIndex: number;
  total: number;
  activeColor: string;
  inactiveColor: string;
}

const Pagination: React.FC<Props> = ({ activeIndex, total, activeColor, inactiveColor }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i === activeIndex ? activeColor : inactiveColor },
          ]}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: -80,
  },
  dot: {
    width: 12,
    height: 6,
    borderRadius: 6,
  },
});
