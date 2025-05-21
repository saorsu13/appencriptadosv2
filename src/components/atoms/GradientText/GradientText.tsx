import React from "react";
import { TextProps } from "react-native";
import Svg, { Text, Defs, LinearGradient, Stop } from "react-native-svg";

interface GradientTextProps extends TextProps {
  text: string;
  fontSize?: number;
  fontWeight?: string;
  width?: number;
  height?: number;
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  fontSize = 14,
  fontWeight = "bold",
  width = 200,
  height = 20,
  ...props
}) => {
  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="textGradient" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#12b4e7" />
          <Stop offset="100%" stopColor="#abebfe" />
        </LinearGradient>
      </Defs>
      <Text
        fill="url(#textGradient)"
        fontSize={fontSize}
        fontWeight={fontWeight}
        x="0"
        y={fontSize}
        {...props}
      >
        {text}
      </Text>
    </Svg>
  );
};

export default GradientText;
