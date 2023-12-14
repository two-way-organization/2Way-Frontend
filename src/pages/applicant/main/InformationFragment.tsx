import { ActivityIndicator, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Appbar, Chip, Divider, Menu, Searchbar } from 'react-native-paper';
import { center, flex1, hFull, p16, wFull } from '../../../common/style';
import { colors } from '../../../constants/theme';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { searchJobs, SearchJobsParams } from '../../../api/application';
import { JobCard } from './components/JobCard';
import { Spacer } from '../../../common/Spacer';
import { LOCATION_LIST } from '../../../constants/location';
import { ScrollView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicantInformationStackParamList } from '../../types';
import { JobDetailFragment } from './fragment/JobDetailFragment';
import { StackActions, useNavigation } from '@react-navigation/native';

type SelectableChipProps = {
  type: string;

  value?: string;
  data: { value: string, label: string }[];
  onChange?: (value?: string) => void;
}
const SelectableChip = ({ type, value, data, onChange }: SelectableChipProps) => {
  const [visible, setVisible] = useState(false);

  const name = useMemo(() => {
    const target = data.find((item) => item.value === value);

    if (target) return `${type}: ${target.label}`;
    return type;
  }, [value, type]);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Chip
          mode={value ? 'flat' : 'outlined'}
          onPress={() => setVisible(true)}
          theme={{
            colors: {
              surface: colors.container,
            },
          }}
        >
          {name}
        </Chip>
      }
    >
      <Menu.Item
        title={'선택 안함'}
        onPress={() => {
          onChange?.(undefined);
          setVisible(false);
        }}
      />
      <Divider/>
      {data.map((item) => (
        <Menu.Item
          key={item.value}
          onPress={() => {
            onChange?.(item.value);
            setVisible(false);
          }}
          title={item.label}
        />
      ))}
    </Menu>

  );
};

export const DefaultApplicantInformationFragment = () => {
  const navigation = useNavigation();

  const [filter, setFilter] = useState<SearchJobsParams>({});

  const { data, error, isFetching } = useQuery({
    queryKey: ['jobs', filter],
    queryFn: () => searchJobs(filter),
    retry: 1,
  });

  const jobs = data?.jobs ?? [];
  const isEmpty = isFetching || jobs.length === 0;

  return (
    <View style={[wFull, hFull]}>
      <Appbar.Header mode={'small'}>
        <Appbar.Content title={'채용정보'} color={colors.white} titleStyle={{ fontWeight: 'bold' }}/>
      </Appbar.Header>
      <View style={[p16, { paddingTop: 0, backgroundColor: colors.primary }]}>
        <Searchbar
          mode={'bar'}
          value={filter.title ?? ''}
          placeholder={'검색할 제목을 입력하세요.'}
          onChangeText={(value) => setFilter({ ...filter, title: value })}
          theme={{
            colors: {
              elevation: {
                level3: colors.secondaryContainer,
              },
            },
          }}
        />
      </View>
      <ScrollView
        horizontal
        style={[wFull, { flexGrow: 0 }]}
        contentContainerStyle={[p16]}
        showsHorizontalScrollIndicator={false}
      >
        <SelectableChip
          type={'직무'}
          value={filter.position}
          data={[
            {
              label: '백엔드개발자',
              value: '백엔드개발자',
            },
            {
              label: '프론트엔드개발자',
              value: '프론트엔드개발자',
            },
            {
              label: '웹개발자',
              value: '웹개발자',
            },
            {
              label: '앱개발자',
              value: '앱개발자',
            },
            {
              label: '시스템엔지니어',
              value: '시스템엔지니어',
            },
            {
              label: '네트워크엔지니어',
              value: '네트워크엔지니어',
            },
          ]}
          onChange={(value) => setFilter({ ...filter, position: value })}
        />
        <Spacer size={8}/>
        <SelectableChip
          type={'지역'}
          value={filter.location}
          data={LOCATION_LIST}
          onChange={(value) => setFilter({ ...filter, location: value })}
        />
        <Spacer size={8}/>
        <SelectableChip
          type={'경력'}
          value={filter.experienceLevel}
          data={[
            {
              label: '신입',
              value: 'Newcomer',
            },
            {
              label: '경력',
              value: 'Experienced',
            },
            {
              label: '경력무관',
              value: 'Unspecified',
            },
          ]}
          onChange={(value) => setFilter({
            ...filter,
            experienceLevel: value as 'Newcomer' | 'Experienced' | 'Unspecified'
          })}
        />
        <Spacer size={8}/>
        <SelectableChip
          type={'선호언어'}
          value={filter.skills}
          data={[
            {
              label: 'Python',
              value: 'Python',
            },
            {
              label: 'JavaScript',
              value: 'JavaScript',
            },
            {
              label: 'Java',
              value: 'Java',
            },
            {
              label: 'C',
              value: 'C',
            },
            {
              label: 'C++',
              value: 'C++',
            },
            {
              label: 'C#',
              value: 'C#',
            },
            {
              label: 'PHP',
              value: 'PHP',
            },
            {
              label: 'Ruby',
              value: 'Ruby',
            },
            {
              label: 'Go',
              value: 'Go',
            },
            {
              label: 'Swift',
              value: 'Swift',
            },
            {
              label: 'Kotlin',
              value: 'Kotlin',
            },
            {
              label: 'TypeScript',
              value: 'TypeScript',
            },
          ]}
          onChange={(value) => setFilter({ ...filter, skills: value })}
        />
      </ScrollView>
      {isEmpty && (
        <View style={[wFull, flex1, center]}>
          {isFetching && <ActivityIndicator/>}
          {!isFetching && (
            <Text>
              채용정보가 없습니다.
            </Text>
          )}
        </View>
      )}
      {!isEmpty && (
        <FlashList
          data={jobs}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onPress={() => {
                navigation.dispatch(StackActions.push('Detail', {
                  job: item,
                }));
              }}
            />
          )}
          estimatedItemSize={100}
        />
      )}
    </View>
  );
};

const Stack = createNativeStackNavigator<ApplicantInformationStackParamList>();

export const ApplicantInformationFragment = () => {
  return (
    <Stack.Navigator initialRouteName={'Default'}>
      <Stack.Screen
        name={'Default'}
        component={DefaultApplicantInformationFragment}
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