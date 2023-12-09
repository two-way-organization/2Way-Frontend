import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompanyHomeTabParamList } from '../types';
import { CompanyHomeFragment } from './fragment/HomeFragment';
import { Appbar } from 'react-native-paper';
import React from 'react';
import { View } from 'react-native';
import { flex1 } from '../../common/style';
import { colors } from '../../constants/theme';
import { CompanyApplicationRegisterFragment } from './fragment/RegisterFragment';
import Icons from '@expo/vector-icons/MaterialIcons';
import { CompanyApplicationManageFragment } from './fragment/ManageFragment';
import { CompanyApplicantManageFragment } from './fragment/ApplicantFragment';
import { CompanyProfileFragment } from './fragment/ProfileFragment';

const Tab = createBottomTabNavigator<CompanyHomeTabParamList>();
export const CompanyHomePage = () => {

  return (
    <View style={flex1}>
      <Appbar.Header mode={'small'}>
        <Appbar.Content title={'TWOWAY'} color={colors.white} titleStyle={{ fontWeight: 'bold' }} />
      </Appbar.Header>
      <Tab.Navigator initialRouteName={'Home'}>
        <Tab.Screen
          name={'Home'}
          component={CompanyHomeFragment}
          options={{
            headerShown: false,
            tabBarLabel: '홈',
            tabBarIcon: ({ color, size }) => (
              <Icons name={'home'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'ApplicationRegister'}
          component={CompanyApplicationRegisterFragment}
          options={{
            headerShown: false,
            tabBarLabel: '공고 등록',
            tabBarIcon: ({ color, size }) => (
              <Icons name={'edit'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'ApplicationManagement'}
          component={CompanyApplicationManageFragment}
          options={{
            headerShown: false,
            tabBarLabel: '공고 관리',
            tabBarIcon: ({ color, size }) => (
              <Icons name={'description'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'ApplicantManagement'}
          component={CompanyApplicantManageFragment}
          options={{
            headerShown: false,
            tabBarLabel: '지원자 관리',
            tabBarIcon: ({ color, size }) => (
              <Icons name={'favorite'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'Profile'}
          component={CompanyProfileFragment}
          options={{
            headerShown: false,
            tabBarLabel: '기업 프로필',
            tabBarIcon: ({ color, size }) => (
              <Icons name={'business'} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};