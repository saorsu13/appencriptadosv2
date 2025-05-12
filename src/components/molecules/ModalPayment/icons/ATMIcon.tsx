import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

// Icon de cajero automático para el selector de método de pago
const ATMIcon: React.FC<{ width?: number; height?: number; color?: string }> = ({
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
    {/* Caja del ATM */}
    <Rect
      x={2}
      y={2}
      width={20}
      height={20}
      rx={2}
      stroke={color}
      strokeWidth={1.5}
    />
    {/* Ranura de tarjeta */}
    <Rect
      x={6}
      y={8}
      width={12}
      height={2}
      fill={color}
      opacity={0.8}
    />
    {/* Botones */}
    <Circle cx={8} cy={14} r={1} fill={color} />
    <Circle cx={12} cy={14} r={1} fill={color} />
    <Circle cx={16} cy={14} r={1} fill={color} />
    {/* Pantalla */}
    <Rect
      x={5}
      y={4}
      width={14}
      height={4}
      rx={0.5}
      stroke={color}
      strokeWidth={1}
    />
    {/* Base */}
    <Path
      d="M4 22H20"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

export default ATMIcon;
