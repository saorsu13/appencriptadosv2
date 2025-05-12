import React from 'react';
import Svg, { Circle, Path, Line } from 'react-native-svg';

// Icon de criptomonedas para el selector de método de pago
const CryptoIcon: React.FC<{ width?: number; height?: number; color?: string }> = ({
  width = 48,
  height = 48,
  color = '#FFFFFF',
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Contorno de moneda */}
    <Circle
      cx={12}
      cy={12}
      r={10}
      stroke={color}
      strokeWidth={1.5}
    />
    {/* Símbolo de criptomoneda (B estilizada) */}
    <Path
      d="M10 8 H14 A2 2 0 0 1 16 10 V14 A2 2 0 0 1 14 16 H10 Z"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
    />
    <Line x1={10} y1={11} x2={14} y2={11} stroke={color} strokeWidth={1} />
    <Line x1={10} y1={13} x2={14} y2={13} stroke={color} strokeWidth={1} />
  </Svg>
);

export default CryptoIcon;
