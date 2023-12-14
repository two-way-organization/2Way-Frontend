import { flex1, hFull, justifyBetween, mx16, p16, p8, px16, py8, row, wFull } from '../../../../common/style';
import { Appbar, Button, Card, DataTable, Divider } from 'react-native-paper';
import { colors } from '../../../../constants/theme';
import React, { Fragment } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Job } from '../../../../schemas/application';
import { Spacer } from '../../../../common/Spacer';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplyStackParamList, } from '../../../types';
import { AiAnalyzeFragment } from './AiAnalyzeFragment';
import { useQuery } from '@tanstack/react-query';
import { applyJob, fetchApplication } from '../../../../api/application';

export const DefaultApplyFragment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const job = (route.params as { job?: Job })?.job;
  const { data, error, refetch } = useQuery({
    queryKey: ['apply-job', job?.id],
    queryFn: async () => {
      if (!job) return null;

      return applyJob(job?.id);
    },
  });
  const { data: applicationData, refetch: refetchApplication } = useQuery({
    queryKey: ['application', data?.applicationId],
    queryFn: async () => {
      if (!data) return null;

      return fetchApplication(data.applicationId);
    },
  });

  const onEssay = (index: number) => {
    const question = job?.personalStatementQuestion.data?.[index];
    if (!question) return;
    if (!data) {
      refetch();
      return;
    }
    if (!applicationData) {
      refetchApplication();
      return;
    }

    navigation.navigate('Apply', {
      screen: 'Analyze',
      params: {
        job,
        question,
        index,
        applicationId: data.applicationId,
        text: applicationData.questions[index]?.applicantResponse ?? '',
      },
    });
  };

  const onSubmit = () => {
    Alert.alert('지원 완료', '지원이 완료되었습니다.', [
      {
        text: '확인',
        onPress: () => {
          navigation.goBack();
        },
      }
    ], {
      cancelable: false,
    });
  };

  return (
    <View style={[wFull, hFull]}>
      <Appbar.Header mode={'small'}>
        <Appbar.BackAction color={colors.white} onPress={navigation.goBack}/>
        <Appbar.Content title={'지원하기'} color={colors.white} titleStyle={{ fontWeight: 'bold' }}/>
      </Appbar.Header>
      {job && (
        <ScrollView>
          <DataTable.Row>
            <DataTable.Cell>
              <Image
                source={{ uri: job.company.companyInfo.logoImage }}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: 'contain',
                }}
              />
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{job.company.companyInfo.companyName}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <Divider/>
          <Text style={[px16, py8]}>
            자소서 항목
          </Text>
          <Divider/>
          <View style={p8}>
            {job.personalStatementQuestion.data?.map((question, index) => (
              <Fragment key={question}>
                <View style={[row, px16, py8]}>
                  <Text style={{ fontWeight: 'bold' }}>{index + 1}. </Text>
                  <Text>{question}</Text>
                </View>
                <Spacer size={4}/>
                <Card style={[p16, mx16]}>
                  <Text>
                    {applicationData?.questions[index]?.applicantResponse ?? '작성되지 않음'}
                  </Text>
                  <Spacer size={16}/>
                  <Button mode={'outlined'} onPress={() => onEssay(index)}>
                    자소서 작성하러 가기
                  </Button>
                </Card>
                <Spacer size={16}/>
              </Fragment>
            ))}
          </View>
        </ScrollView>
      )}

      <View style={[row, justifyBetween, px16, py8, {
        borderColor: colors.gray,
        borderTopWidth: 1,
        paddingBottom: insets.bottom + 8
      }]}>
        <Button mode={'outlined'} style={flex1} onPress={navigation.goBack}>
          취소
        </Button>
        <Spacer size={12}/>
        <Button mode={'contained'} style={flex1} onPress={onSubmit}>
          입사 지원
        </Button>
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator<ApplyStackParamList>();

export const ApplyFragment = () => {
  return (
    <Stack.Navigator initialRouteName={'Default'}>
      <Stack.Screen
        name={'Default'}
        component={DefaultApplyFragment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Analyze'}
        component={AiAnalyzeFragment}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};