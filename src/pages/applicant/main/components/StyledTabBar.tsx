import { NavigationState, SceneRendererProps, TabBar } from 'react-native-tab-view';
import { colors } from '../../../../constants/theme';
import { Text } from 'react-native';
import React from 'react';

export type StyledTabBarProps = SceneRendererProps & {
  navigationState: NavigationState<{ key: string, title: string }>
};
export const StyledTabBar = (props: StyledTabBarProps) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.primary }}
    style={{ backgroundColor: colors.white }}
    renderLabel={({ route, focused }) => (
      <Text style={{ color: focused ? colors.primary : colors.black }}>
        {route.title}
      </Text>
    )}
  />
);
