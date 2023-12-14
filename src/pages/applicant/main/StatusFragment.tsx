import { ActivityIndicator, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import React, { useCallback, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { center, hFull, wFull } from '../../../common/style';
import { colors } from '../../../constants/theme';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { fetchApplicationStatus, StatusType } from '../../../api/application';
import { ApplicationStatus } from '../../../schemas/application';
import { ApplicantStatusStackParamList } from '../../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ResumeDetailFragment } from './fragment/ResumeDetailFragment';
import { StackActions, useNavigation } from '@react-navigation/native';
import { JobCard } from './components/JobCard';
import { StyledTabBar } from './components/StyledTabBar';

const FragmentBuilder = (type: StatusType) => () => {
  const navigation = useNavigation();
  const { data, isLoading } = useQuery({
    queryKey: ['application-status', type],
    queryFn: () => fetchApplicationStatus(type),
  });

  const renderItem: ListRenderItem<ApplicationStatus> = useCallback(({ item }) => {
    return (
      <JobCard
        job={item.job}
        onPress={() => {
          navigation.dispatch(StackActions.push('Detail', {
            status: item,
          }));
        }}
      >
        <Pressable onPress={() => console.log('cancel')}>
          <View
            style={{
              borderColor: colors.gray,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Text style={{ color: colors.red }}>
              지원 취소
            </Text>
          </View>
        </Pressable>
      </JobCard>
    );
  }, []);

  const applications = data?.applications ?? [];
  if (applications.length === 0 || isLoading) {
    return (
      <View style={[wFull, hFull, center]}>
        {isLoading && <ActivityIndicator size={'large'} color={colors.primary}/>}
        {!isLoading && (
          <Text>
            {type === 'waiting' && '지원 대기중인 공고가 없습니다.'}
            {type === 'preferred' && '선호 지원자가 없습니다.'}
            {type === 'success' && '지원 합격한 공고가 없습니다.'}
            {type === 'failed' && '지원 불합격한 공고가 없습니다.'}
          </Text>
        )}
      </View>
    );
  }

  return (
    <FlashList
      data={applications}
      renderItem={renderItem}
      estimatedItemSize={100}
    />
  );
};


const renderScene = SceneMap({
  waiting: FragmentBuilder('waiting'),
  preferred: FragmentBuilder('preferred'),
  success: FragmentBuilder('success'),
  failed: FragmentBuilder('failed'),
});

const Stack = createNativeStackNavigator<ApplicantStatusStackParamList>();

const DefaultApplicantStatusFragment = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'waiting', title: '지원 대기' },
    { key: 'preferred', title: '선호 지원자' },
    { key: 'success', title: '지원 합격' },
    { key: 'failed', title: '지원 불합격' },
  ]);

  return (
    <View style={[wFull, hFull]}>
      <Appbar.Header mode={'small'}>
        <Appbar.Content title={'지원현황'} color={colors.white} titleStyle={{ fontWeight: 'bold' }}/>
      </Appbar.Header>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={StyledTabBar}
      />
    </View>
  );
};
export const ApplicantStatusFragment = () => {
  return (
    <Stack.Navigator initialRouteName={'Default'}>
      <Stack.Screen
        name={'Default'}
        component={DefaultApplicantStatusFragment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Detail'}
        component={ResumeDetailFragment}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
