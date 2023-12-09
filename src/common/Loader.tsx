import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { itemsCenter, justifyCenter } from './style';
import { ActivityIndicator, ViewStyle } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../constants/theme';

const style: ViewStyle = {
  backgroundColor: colors.black,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  zIndex: 100,
};

export type LoaderProps = { loading?: boolean; };
export const Loader = (props: LoaderProps) => {
  const loading = useSharedValue(false);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(loading.value ? 0.5 : 0),
    pointerEvents: loading.value ? 'auto' : 'none',
  }));

  useEffect(() => {
    loading.value = props.loading ?? false;
  }, [props.loading]);

  return (
    <Animated.View style={[animatedStyle, style, itemsCenter, justifyCenter]}>
      <ActivityIndicator/>
    </Animated.View>
  );
};
