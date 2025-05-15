import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SvgComponentProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

/**
 * Icono de menú hamburguesa.
 */
const MenuIcon: React.FC<SvgComponentProps> = ({
  width = 24,
  height = 24,
  color = '#000',
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 50 50"
    fill="none"
  >
    <Path
      d="M0 7.5 0 12.5 50 12.5 50 7.5Z
         M0 22.5 0 27.5 50 27.5 50 22.5Z
         M0 37.5 0 42.5 50 42.5 50 37.5Z"
      fill={color}
    />
  </Svg>
);

export default MenuIcon;
