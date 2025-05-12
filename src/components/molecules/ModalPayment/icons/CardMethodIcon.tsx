import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

// Icon de tarjeta de crédito para el selector de método de pago
const CardMethodIcon: React.FC<{ width?: number; height?: number; color?: string }> = ({
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
    {/* Base de la tarjeta */}
    <Rect
      x={2}
      y={5}
      width={20}
      height={14}
      rx={2}
      fill={color}
      opacity={0.2}
    />
    {/* Línea superior */}
    <Path
      d="M2 8H22"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Chip */}
    <Rect
      x={4}
      y={10}
      width={3}
      height={4}
      rx={0.5}
      stroke={color}
      strokeWidth={1.5}
    />
    {/* Banda magnética simulada */}
    <Path
      d="M18 16H20"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CardMethodIcon;
