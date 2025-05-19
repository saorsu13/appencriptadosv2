import React from 'react';
import { View, ViewStyle } from 'react-native';

export type SkeletonLayout = ViewStyle & { key?: string | number };

interface SkeletonContentProps {
  containerStyle?: ViewStyle;
  layout?: SkeletonLayout[];
  boneColor?: string;
}

export default function SkeletonContent({
  containerStyle,
  layout = [],
  boneColor = 'rgba(0,0,0,0.1)',
}: SkeletonContentProps) {
  return (
    <View style={containerStyle}>
      {layout.map((item, index) => (
        <View
          key={item.key ?? index}
          style={{ ...item, backgroundColor: boneColor }}
        />
      ))}
    </View>
  );
}