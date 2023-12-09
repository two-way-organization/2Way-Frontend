import { flex1 } from '../../common/style';
import { Appbar } from 'react-native-paper';
import { colors } from '../../constants/theme';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicantHomeTabParamList, CompanyHomeTabParamList } from '../types';
import { View } from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { ApplicantHomeFragment } from './fragment/HomeFragment';
import { ApplicantInformationFragment } from './fragment/InformationFragment';
import { ApplicantStatusFragment } from './fragment/StatusFragment';
import { ApplicantFavoriteFragment } from './fragment/FavoriteFragment';
import { ApplicantProfileFragment } from './fragment/ProfileFragment';

const Tab = createBottomTabNavigator<ApplicantHomeTabParamList>();
export const ApplicantHomePage = () => {
  return (
    <View style={flex1}>
      <Appbar.Header mode={'small'}>
        <Appbar.Content title={'TWOWAY'} color={colors.white} titleStyle={{ fontWeight: 'bold' }} />
      </Appbar.Header>
      <Tab.Navigator initialRouteName={'Home'}>
        <Tab.Screen
          name={'Home'}
          component={ApplicantHomeFragment}
          options={{
            headerShown: false,
            tabBarLabel: '홈',
            tabBarIcon: ({ color, size }) => (
              <Icons name={'home'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'Information'}
          component={ApplicantInformationFragment}
          options={{
            headerShown: false,
            tabBarLabel: '채용정보',
            tabBarIcon: ({ color, size }) => (
              <Icons name={'explore'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'Status'}
          component={ApplicantStatusFragment}
          options={{
            headerShown: false,
            tabBarLabel: '지원현황',
            tabBarIcon: ({ color, size }) => (
              <Icons name={'mail'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'Favorite'}
          component={ApplicantFavoriteFragment}
          options={{
            headerShown: false,
            tabBarLabel: '관심공고',
            tabBarIcon: ({ color, size }) => (
              <Icons name={'favorite'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'Profile'}
          component={ApplicantProfileFragment}
          options={{
            headerShown: false,
            tabBarLabel: '마이프로필',
            tabBarIcon: ({ color, size }) => (
              <Icons name={'person'} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};
