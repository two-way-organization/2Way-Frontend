import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar, DataTable } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { hFull, itemsStretch, selfCenter, wFull } from '../../../../common/style';
import React, { useMemo, useState } from 'react';
import { Loader } from '../../../../common/Loader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadarChart } from '../components/RadarChart';
import { ScoreName } from '../components/ScoreName';
import { QuestionAnswer } from '../components/QuestionAnswer';
import { FileDownloadButton } from '../components/FileDownloadButton';
import { colors } from '../../../../constants/theme';
import { ApplicationStatus } from '../../../../schemas/application';
import { useQuery } from '@tanstack/react-query';
import { fetchApplication } from '../../../../api/application';
import { fetchLanguageUsage, fetchSolvedAc } from '../../../../api/util';
import { levelToString } from '../../../../schemas/level';
import { LOCATION_LIST } from '../../../../constants/location';

const chartSize = 190; // 차트의 크기
const padding = 68; // SVG 바깥쪽 여백을 위한 패딩
const size = chartSize + padding * 2; // 전체 SVG 크기

const styles = StyleSheet.create({
  comboBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ABABAB',
    justifyContent: 'center',
  },
  chartBox: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: size,
    height: size - (padding / 2),
    alignSelf: 'center',
    marginTop: 11,

    padding: 10,
    backgroundColor: 'white'
  },
  questionContainer: {
    marginTop: 7,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  userDetails: {
    color: '#ABABAB',
    fontSize: 13,
    lineHeight: 22
  },
  userText: {
    fontSize: 16,
    lineHeight: 22
  },
  center: {
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#D7D7D7',
    marginVertical: 20,
    marginBottom: 20,
  },

});

const dropdownStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ABABAB',
  },
  dropdown: {
    backgroundColor: 'white',
    borderBottomColor: '#ABABAB',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    color: '#000',
  },
  placeholderStyle: {
    color: '#0075FF',
  },
  dropDownContainerStyle: {
    backgroundColor: 'white',
    borderColor: '#ABABAB',
  },
  selectedItemLabel: {
    color: '#0075FF',
  },
  selectedLabel: {
    color: '#0075FF',
  },
});
export const ResumeDetailFragment = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const status = (route.params as { status?: ApplicationStatus })?.status;

  const { data, error, isLoading } = useQuery({
    queryKey: ['application', status?.applicationId],
    queryFn: () => status?.applicationId ? fetchApplication(status.applicationId) : null,
  });
  const { data: graphData } = useQuery({
    queryKey: ['language-usage', data?.resume.gitHubId],
    queryFn: () => data?.resume.gitHubId ? fetchLanguageUsage(data.resume.gitHubId) : null,
  });
  const { data: tierData } = useQuery({
    queryKey: ['language-usage', data?.resume.baekjoonId],
    queryFn: () => data?.resume.baekjoonId ? fetchSolvedAc(data.resume.baekjoonId) : null,
  });

  const personalStatementQuestion = data?.questions.map((question) => question.personalStatementQuestion) ?? [];
  const applicantResponse = data?.questions.map((question) => question.applicantResponse) ?? [];
  const analyzedResponse = data?.questions.map((question) => question.summarizedResponse) ?? [];


  const [showResponse, setShowResponse] = useState<number | null>(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('item1');
  const [items, setItems] = useState([
    { label: '이력서 / 자기소개서 요약', value: 'item1' },
    { label: '제출 서류', value: 'item2' },
    { label: '지원서', value: 'item3' },
  ]);

  const graphEntries = Object.entries(graphData?.languageUsage ?? {}).slice(0, 5);
  const pointData = graphEntries.map(([, value]) => Math.min(value / 100, 1));
  const labels = graphEntries.map(([key]) => key);

  const [score, setScore] = useState(27);
  console.log(graphEntries);

  const files = [
    { name: 'file1', uri: 'http://www.africau.edu/images/default/sample.pdf' },
    { name: 'file2', uri: 'http://www.example.com/file2.pdf' },
    // ... 기타 파일 정보 ...
  ];
  const birthData = useMemo(() => {
    if (!data) {
      return {
        age: 0,
        year: 0,
        birth: '',
      };
    }
    const birth = new Date(data.resume.birth);
    const year = birth.getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - year + 1;
    const formattedBirth = `${birth.getFullYear()}.${(birth.getMonth() + 1).toString().padStart(2, '0')}.${birth.getDate().toString().padStart(2, '0')}`;

    return {
      age,
      year,
      birth: formattedBirth,
    };
  }, [data?.resume.birth]);

  return (
    <View style={[wFull, hFull]}>
      <Appbar.Header mode={'center-aligned'}>
        <Appbar.BackAction color={colors.white} onPress={navigation.goBack}/>
        <Appbar.Content title={'지원서 상세'} color={colors.white} titleStyle={{ fontWeight: 'bold' }}/>
      </Appbar.Header>
      <Loader loading={isLoading}/>
      <ScrollView>
        <View style={[{ width: size }, itemsStretch, selfCenter]}>
          <View style={styles.userInfo}>
            <View style={styles.center}>
              <Text style={styles.userText}>
                {data?.resume?.applicant?.name}
              </Text>
              <Text style={styles.userDetails}>
                ({data?.resume.gender === 'male' ? '남' : '여'}, {birthData.age}세)
              </Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.userText}>
                {data && Intl.DateTimeFormat(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(new Date(data.resume.birth))}
              </Text>
              <Text style={styles.userDetails}>
                {data && levelToString(data.resume.experienceLevel)}
              </Text>
            </View>
            <ScoreName score={tierData?.tier ?? 0}/>
          </View>
          <View style={styles.chartBox}>
            <View style={styles.centered}>
              <RadarChart data={pointData} labels={labels}/>
            </View>
          </View>

          <View style={styles.divider}/>

          <DropDown
            mode={'outlined'}
            label={'이력서 / 자기소개서 요약'}
            visible={open}
            onDismiss={() => setOpen(false)}
            showDropDown={() => setOpen(true)}
            value={value}
            setValue={setValue}
            list={items}
          />

          {value === 'item1' && (
            <View style={styles.questionContainer}>
              {personalStatementQuestion.map((question, index) => (
                <QuestionAnswer
                  key={index}
                  question={question}
                  response={applicantResponse[index]}
                  analyzed={analyzedResponse[index]}
                  showResponse={showResponse}
                  setShowResponse={setShowResponse}
                  index={index}
                />
              ))}
            </View>
          )}

          {value === 'item2' && <FileDownloadButton files={files}/>}

          {value === 'item3' && (
            <>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{ fontWeight: 'bold' }}>이름</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{data?.resume.applicant.name}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{ fontWeight: 'bold' }}>이메일</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{data?.resume.applicant.email}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{ fontWeight: 'bold' }}>이메일</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{data?.resume.gender === 'male' ? '남자' : '여자'}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{ fontWeight: 'bold' }}>생년월일</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{birthData.birth}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{ fontWeight: 'bold' }}>주소</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{LOCATION_LIST.find((it) => it.value === data?.resume.address)?.label ?? data?.resume.address}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{ fontWeight: 'bold' }}>최종학력</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{data && levelToString(data?.resume.educationLevel)}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{ fontWeight: 'bold' }}>학교명</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{data?.resume.schoolName}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{ fontWeight: 'bold' }}>전공</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{data?.resume.major}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={{ fontWeight: 'bold' }}>경력</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{data && levelToString(data?.resume.experienceLevel)}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};