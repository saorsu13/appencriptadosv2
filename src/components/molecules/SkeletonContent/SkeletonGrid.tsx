// src/components/molecules/SkeletonGrid/SkeletonGrid.tsx
import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, Dimensions } from 'react-native';
import { styles } from './SkeletonGridStyles';

export interface SkeletonGridProps {
  columns?: number;
  rows?: number;
  gap?: number;
  boneColor?: string;
  borderRadius?: number;
  widthImage: number;
  heightImage: number;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  columns = 2,
  rows = 2,
  gap = 10,
  boneColor = 'rgba(255, 255, 255, 0.25)',
  borderRadius = 8,
  widthImage,
  heightImage,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    const animateLoading = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateLoading();
    return () => animatedValue.setValue(0);
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  // Calcula tamaño del item según columnas y ratio de la imagen
  const itemSize = (windowWidth - gap * (columns + 1)) / columns;
  const itemHeight = itemSize * (heightImage / widthImage);

  // Renderiza un grid de Animated.Views con estilos dinámicos
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {Array.from({ length: rows * columns }).map((_, index) => (
          <Animated.View
            key={index}
            style={[
              {
                width: itemSize,
                height: itemHeight,
                marginBottom: gap,
                marginRight:
                  (index + 1) % columns === 0 ? 0 : gap,
              },
              { backgroundColor: boneColor, borderRadius, opacity },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default SkeletonGrid;
