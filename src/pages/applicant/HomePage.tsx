import { flex1 } from '../../common/style';
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicantHomeTabParamList } from '../types';
import { View } from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { ApplicantHomeFragment } from './main/HomeFragment';
import { ApplicantStatusFragment } from './main/StatusFragment';
import { ApplicantFavoriteFragment } from './main/FavoriteFragment';
import { ApplicantProfileFragment } from './main/ProfileFragment';
import { useQuery } from '@tanstack/react-query';
import { fetchResumes } from '../../api/resume';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Loader } from '../../common/Loader';
import { ApplicantInformationFragment } from './main/InformationFragment';

const Tab = createBottomTabNavigator<ApplicantHomeTabParamList>();
export const ApplicantHomePage = () => {
  const navigation = useNavigation();

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['resumes'],
    queryFn: () => fetchResumes(),
    retry: 1,
  });

  useEffect(() => {
    if (data) {
      console.log('resume', data);
    } else if (error) {
      navigation.dispatch(StackActions.replace('ApplicantSetup'));
    } else {
      refetch();
    }
  }, [data, error]);

  useEffect(() => {
  }, [error]);

  return (
    <View style={flex1}>
      <Loader loading={isFetching}/>
      <Tab.Navigator initialRouteName={'Home'}>
        <Tab.Screen
          name={'Home'}
          component={ApplicantHomeFragment}
          options={{
            headerShown: false,
            tabBarLabel: '홈',
            tabBarIcon: ({ color, size }) => (
              <Icons name={'home'} color={color} size={size}/>
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
              <Icons name={'explore'} color={color} size={size}/>
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
              <Icons name={'mail'} color={color} size={size}/>
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
              <Icons name={'favorite'} color={color} size={size}/>
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
              <Icons name={'person'} color={color} size={size}/>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};
