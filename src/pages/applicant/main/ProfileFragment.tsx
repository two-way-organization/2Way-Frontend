import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, DataTable, Divider } from 'react-native-paper';
import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Loader } from '../../../common/Loader';

import picImage from '../../../../assets/pic.png';
import Vector1 from '../../../../assets/Vector1.png';
import Vector3 from '../../../../assets/Vector3.png';
import { fetchResumes } from '../../../api/resume';
import { colors } from '../../../constants/theme';
import { levelToString } from '../../../schemas/level';
import { useAuth } from '../../../stores/auth';
import { StackActions, useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoAgeGender: {
    color: '#8C8C8C',
    fontSize: 12,
    marginLeft: 8,
    lineHeight: 22
  },
  infoText: {
    color: '#ABABAB',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 8,
    marginTop: 9
  },
  infoName: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 2,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#D7D7D7',
    marginVertical: 12,
  },
  sectionContainer: {
    paddingHorizontal: 0,
    paddingVertical: 12,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 16,
  },
  sectionText: {
    color: '#8C8C8C',
    fontSize: 20,
  },
  disclaimerContainer: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.15,
    backgroundColor: '#EBEBEB',
    borderRadius: 2,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimer: {
    color: '#8C8C8C',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 22
  },
  blueText: {
    color: '#0075FF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
    lineHeight: 22,
  },
  picImage: {
    marginLeft: 20,
    marginRight: 30
  }
});

export const ApplicantProfileFragment = () => {
  const resetToken = useAuth((state) => state.reset);
  const navigation = useNavigation();

  const { data, error, isLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => fetchResumes(),
  });

  const birthData = useMemo(() => {
    if (!data) {
      return {
        age: 0,
        year: 0,
        birth: '',
      };
    }
    const birth = new Date(data.profile.birth);
    const year = birth.getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - year + 1;
    const formattedBirth = `${birth.getFullYear()}.${(birth.getMonth() + 1).toString().padStart(2, '0')}.${birth.getDate().toString().padStart(2, '0')}`;

    return {
      age,
      year,
      birth: formattedBirth,
    };
  }, [data?.profile.birth]);
  const gender = useMemo(() => {
    if (data?.profile.gender === 'male') return '남성';
    if (data?.profile.gender === 'female') return '여성';

    return '알 수 없음';
  }, [data?.profile.gender]);

  useEffect(() => {
    if (error) {
      Alert.alert('오류', '프로필을 불러오는데 실패했습니다.');
    }
  }, [error]);

  const onLogout = () => {
    resetToken();

    navigation.dispatch(StackActions.replace('Login'));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header mode={'small'}>
        <Appbar.Content title={'MY'} color={colors.white} titleStyle={{ fontWeight: 'bold' }}/>
      </Appbar.Header>
      <Loader loading={isLoading}/>
      <ScrollView>
        <View style={styles.profileSection}>
          <Image source={picImage} style={styles.picImage}/>
          <View style={styles.profileInfo}>
            <View style={styles.row}>
              <Text style={styles.infoName}>{data?.profile.applicant.name}</Text>
              <Text style={styles.infoAgeGender}>{birthData.year}년 ({birthData.age}세) | {gender}</Text>
            </View>
            <View style={styles.row}>
              <Image source={Vector1}/>
              <Text style={styles.infoText}>{data?.profile.applicant.email}</Text>
            </View>
            <View style={styles.row}>
              <Image source={Vector3}/>
              <Text style={styles.infoText}>{data?.profile.address}</Text>
            </View>
            <Button mode={'outlined'} onPress={onLogout}>
              로그아웃
            </Button>
          </View>
        </View>
        <Divider />
        <View style={styles.sectionContainer}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>경력</Text>
            <Text style={styles.blueText}>{data ? levelToString(data.profile.experienceLevel) : '알 수 없음'}</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.sectionContainer}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>학력</Text>
            <Text style={styles.blueText}>{data ? levelToString(data.profile.educationLevel) : '알 수 없음'}</Text>
          </View>
          <DataTable.Row>
            <DataTable.Cell textStyle={styles.sectionText}>학교</DataTable.Cell>
            <DataTable.Cell textStyle={styles.detailText}>{data?.profile.schoolName}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell textStyle={styles.sectionText}>전공</DataTable.Cell>
            <DataTable.Cell textStyle={styles.detailText}>{data?.profile.major}</DataTable.Cell>
          </DataTable.Row>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>인적사항</Text>
          <DataTable.Row>
            <DataTable.Cell textStyle={styles.sectionText}>생년월일</DataTable.Cell>
            <DataTable.Cell textStyle={styles.detailText}>{birthData.birth}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell textStyle={styles.sectionText}>성별</DataTable.Cell>
            <DataTable.Cell textStyle={styles.detailText}>{gender}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell textStyle={styles.sectionText}>주소</DataTable.Cell>
            <DataTable.Cell textStyle={styles.detailText}>{data?.profile.address}</DataTable.Cell>
          </DataTable.Row>
        </View>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimer}>위에 모든 기재사항은 사실과 다를 것이 없음을 확인합니다.</Text>
          <Text style={styles.disclaimer}>작성자/{data?.profile.applicant.name}</Text>
        </View>
      </ScrollView>
    </View>
  );
};