import { View } from 'react-native';
import { useMemo } from 'react';
import { flex1 } from './style';

export type SpacerProps = {
  size?: number;
}
export const Spacer = ({ size }: SpacerProps) => (
  <View
    style={useMemo(() => (
      typeof size === 'number'
        ? { width: size, height: size }
        : { width: 'auto', flex: 1 }
    ), [size])}
  />
);
