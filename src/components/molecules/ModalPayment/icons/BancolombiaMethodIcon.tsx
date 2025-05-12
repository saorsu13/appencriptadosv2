// src/components/molecules/ModalPayment/icons/BancolombiaMethodIcon.tsx
import React from 'react';
import { SvgProps } from 'react-native-svg';
// @ts-ignore: permite importar SVG como componente
import BancolombiaLogo from '../../../../assets/bancolombiaLogo.svg';

export type IconProps = Pick<SvgProps, 'width' | 'height' | 'fill'>;

const BancolombiaMethodIcon: React.FC<IconProps> = ({
  width = 48,
  height = 48,
  fill = '#FFFFFF',
}) => <BancolombiaLogo width={width} height={height} fill={fill} />;

export default BancolombiaMethodIcon;
