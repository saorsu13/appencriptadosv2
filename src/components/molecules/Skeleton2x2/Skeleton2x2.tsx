import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { ThemeCustom } from '@/config/theme2';
import { skeleton2x2Styles as styles } from './Skeleton2x2Styles';

type Layout = { width: string | number; height: number; marginVertical: number; borderRadius: number };
type Props = { layout: Layout[]; containerStyle?: any };

export default function Skeleton2x2({ layout, containerStyle }: Props) {
  const animation = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme<ThemeCustom>();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, [animation]);

  const bgColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.strokeBorder, colors.primarySoft],
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {layout.map((item, i) => (
        <Animated.View
          key={i}
          style={[styles.item, item, { backgroundColor: bgColor }]}
        />
      ))}
    </View>
  );
}
