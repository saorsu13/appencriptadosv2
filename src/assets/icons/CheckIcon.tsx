// src/assets/icons/CheckIcon.tsx
import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface CheckIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({
  width = 20,
  height = 20,
  color = "#0AAEE1", // color azul por defecto
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 30 30"
    fill="none"
  >
    <Path
      d="M26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 
         L11 21.585938 L4.7070312 15.292969 A 1.0001 1.0001 0 1 0 
         3.2929688 16.707031 L10.292969 23.707031 A 1.0001 1.0001 0 0 0 
         11.707031 23.707031 L27.707031 7.7070312 A 1.0001 1.0001 0 0 0 
         26.980469 5.9902344 z"
      fill={color}
    />
  </Svg>
);

export default CheckIcon;