import { ActivityIndicator, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicantStatusStackParamList } from '../../types';
import React, { useCallback, useState } from 'react';
import { center, hFull, wFull } from '../../../common/style';
import { Appbar } from 'react-native-paper';
import { colors } from '../../../constants/theme';
import { StyledTabBar } from './components/StyledTabBar';
import { fetchRecentApplications, fetchSavedJobs } from '../../../api/application';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Job } from '../../../schemas/application';
import { JobCard } from './components/JobCard';
import Icons from '@expo/vector-icons/MaterialIcons';
import { JobDetailFragment } from './fragment/JobDetailFragment';


const FragmentBuilder = <T, U extends Job>(key: string, fetcher: () => Promise<T>, modifier: (t: T) => U[]) => () => {
  const navigation = useNavigation();
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: () => fetcher(),
  });

  const renderItem: ListRenderItem<U> = useCallback(({ item }) => {
    return (
      <JobCard
        job={item}
        onPress={() => {
          navigation.dispatch(StackActions.push('Detail', {
            job: item,
          }));
        }}
      >
        <Pressable onPress={() => console.log('cancel')}>
          <Icons name={'favorite-border'} size={24} style={{ color: colors.red }}/>
        </Pressable>
      </JobCard>
    );
  }, []);

  const list = data ? modifier(data) : [];
  if (list.length === 0 || isLoading) {
    return (
      <View style={[wFull, hFull, center]}>
        {isLoading && <ActivityIndicator size={'large'} color={colors.primary}/>}
        {!isLoading && (
          <Text>
            정보가 없습니다
          </Text>
        )}
      </View>
    );
  }

  return (
    <FlashList
      data={list}
      renderItem={renderItem}
      estimatedItemSize={100}
    />
  );
};


const renderScene = SceneMap({
  recent: FragmentBuilder('application-recent', fetchRecentApplications, (it) => it.jobs),
  favorite: FragmentBuilder('application-favorite', fetchSavedJobs, (it) => it.jobs),
  // company: FragmentBuilder('application-company', fetchSavedCompanies, (it) => it.company.map((company) => company.)),
});

const Stack = createNativeStackNavigator<ApplicantStatusStackParamList>();

const DefaultApplicantFavoriteFragment = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'recent', title: '최근 본 공고' },
    { key: 'favorite', title: '관심 공고' },
    // { key: 'company', title: '관심 기업' },
  ]);

  return (
    <View style={[wFull, hFull]}>
      <Appbar.Header mode={'small'}>
        <Appbar.Content title={'관심공고'} color={colors.white} titleStyle={{ fontWeight: 'bold' }}/>
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
export const ApplicantFavoriteFragment = () => {
  return (
    <Stack.Navigator initialRouteName={'Default'}>
      <Stack.Screen
        name={'Default'}
        component={DefaultApplicantFavoriteFragment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Detail'}
        component={JobDetailFragment}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
