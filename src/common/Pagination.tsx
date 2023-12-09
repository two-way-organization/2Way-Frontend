import React, { useMemo } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle, } from 'react-native';
import Animated, { interpolateColor, SharedValue, useAnimatedStyle, useSharedValue, } from 'react-native-reanimated';

const containerStyle: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

export interface PaginationDotProps {
  currentIndex: SharedValue<number>;
  index: number;
  deactiveColor?: string;
  activeColor?: string;
  size?: number;
}

const PaginationDot = React.memo(({
                                    currentIndex,
                                    index,
                                    deactiveColor,
                                    activeColor,
                                    size = 8,
                                  }: PaginationDotProps) => {
  const aniamtedStyle = useAnimatedStyle(() => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: interpolateColor(
      currentIndex.value,
      [index - 1, index, index + 1],
      [deactiveColor!, activeColor!, deactiveColor!],
    ),
    transform: [
      {
        scale: Math.min(Math.max(1 - Math.abs(currentIndex.value - index) / 2, 0.5), 1),
      },
    ],
  }), [deactiveColor, activeColor, index]);

  return <Animated.View style={aniamtedStyle} renderToHardwareTextureAndroid/>;
});

interface PaginationProps extends ViewProps {
  length: number;
  index?: number;
  animatedIndex?: SharedValue<number>;
  deactiveColor?: string;
  activeColor?: string;
  size?: number;
}

export const Pagination = React.memo(({
                                 length,
                                 index,
                                 animatedIndex,
                                 activeColor,
                                 deactiveColor,
                                 style,
                                 size,
                                 ...props
                               }: PaginationProps) => {
  const fallbackIndex = useSharedValue(index ?? 0);
  const offset = animatedIndex ?? fallbackIndex;

  const elements = useMemo(() => Array.from({ length }).map((_, i) => (
    <PaginationDot
      // eslint-disable-next-line react/no-array-index-key
      key={i}
      size={size}
      index={i}
      currentIndex={offset}
      deactiveColor={deactiveColor}
      activeColor={activeColor}
    />
  )), [activeColor, deactiveColor, length, offset, size]);

  return (
    <View
      {...props}
      style={StyleSheet.compose(containerStyle, style)}
    >
      {elements}
    </View>
  );
});
