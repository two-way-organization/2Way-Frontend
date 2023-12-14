import { Image, Text, useWindowDimensions, View } from 'react-native';
import { center, flex1, flex2, hFull, m16, mx16, my8, p16, p8, px16, row, wFull } from '../../../../common/style';
import { Appbar, Card, Chip, DataTable, Divider, TouchableRipple } from 'react-native-paper';
import { colors } from '../../../../constants/theme';
import { SceneMap, TabView } from 'react-native-tab-view';
import { StyledTabBar } from '../components/StyledTabBar';
import React, { Fragment, useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Job } from '../../../../schemas/application';
import { levelToString } from '../../../../schemas/level';
import { Spacer } from '../../../../common/Spacer';
import { LOCATION_LIST } from '../../../../constants/location';
import Icons from '@expo/vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';

const DetailFragment = () => {
  const route = useRoute();
  const dimension = useWindowDimensions();

  const [height, setHeight] = useState(200);

  const job = (route.params as { job?: Job })?.job;
  useLayoutEffect(() => {
    if (job?.recruitmentImage) {
      Image.getSize(job?.recruitmentImage, (width, height) => {
        setHeight(dimension.width / width * height);
      });
    }
  }, [job?.recruitmentImage]);

  return (
    <ScrollView>
      <Image
        source={{ uri: job?.recruitmentImage }}
        style={{ width: '100%', height }}
        resizeMode={'contain'}
      />
    </ScrollView>
  );
};
const EssayInfoFragment = () => {
  const route = useRoute();

  const job = (route.params as { job?: Job })?.job;
  return (
    <ScrollView>
      <Text style={[mx16, my8]}>
        자소서 항목
      </Text>
      <Divider/>
      <View style={p8}>
        {job?.personalStatementQuestion.data?.map((question, index) => (
          <Fragment key={question}>
            <View style={[row, px16]}>
              <Text style={{ fontWeight: 'bold' }}>{index + 1}. </Text>
              <Text>{question}</Text>
            </View>
            <Spacer size={16}/>
          </Fragment>
        ))}
      </View>
    </ScrollView>
  );
};
const CompanyInfoFragment = () => {
  const route = useRoute();

  const company = (route.params as { job?: Job })?.job?.company;
  return (
    <ScrollView>
      {company && (
        <>
          <DataTable.Row>
            <DataTable.Cell>
              <Image
                source={{ uri: company.companyInfo.logoImage }}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: 'contain',
                }}
              />
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{company.companyInfo.companyName}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{ fontWeight: 'bold' }}>산업</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{company.companyInfo.introduction}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{ fontWeight: 'bold' }}>사원수</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{company.companyInfo.numberOfEmployees}명</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{ fontWeight: 'bold' }}>기업구분</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{company.companyInfo.companyType}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{ fontWeight: 'bold' }}>자본금</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{Intl.NumberFormat(undefined, {
                currency: 'KRW',
                style: 'currency',
              }).format(Number(company.companyInfo.capital))}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{ fontWeight: 'bold' }}>설립일</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>
                {
                  Intl.DateTimeFormat(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(company.companyInfo.establishmentDate))
                }
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{ fontWeight: 'bold' }}>대표자</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{company.companyInfo.ceoName}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{ fontWeight: 'bold' }}>주요사업</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{company.companyInfo.mainBusiness.data?.join(', ')}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        </>
      )}
    </ScrollView>
  );
};

const renderScene = SceneMap({
  detail: DetailFragment,
  essayInfo: EssayInfoFragment,
  companyInfo: CompanyInfoFragment,
});
export const JobDetailFragment = () => {
  const layout = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();

  const data = (route.params as { job?: Job })?.job;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'detail', title: '상세 요강' },
    { key: 'essayInfo', title: '자소서 항목' },
    { key: 'companyInfo', title: '기업 정보' },
  ]);

  const onApply = () => {
    if (!data) return;

    navigation.navigate('Apply', {
      screen: 'Default',
      params: {
        job: data,
      },
    });
  };

  return (
    <View style={[wFull, hFull]}>
      <Appbar.Header mode={'small'}>
        <Appbar.BackAction color={colors.white} onPress={navigation.goBack}/>
        <Appbar.Content title={'채용정보'} color={colors.white} titleStyle={{ fontWeight: 'bold' }}/>
      </Appbar.Header>
      {data && (
        <Card style={[m16]}>
          <View style={p16}>
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{data?.company.companyInfo.companyName}</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{data?.title}</Text>
          </View>
          <Divider/>
          <View style={[row, p16]}>
            <Chip>
              {levelToString(data.experienceLevel)}
            </Chip>
            <Spacer size={8}/>
            <Chip>
              {levelToString(data.educationLevel)}
            </Chip>
            <Spacer size={8}/>
            <Chip>
              {LOCATION_LIST.find((location) => location.value === data.location)?.label ?? data.location}
            </Chip>
          </View>
        </Card>
      )}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={StyledTabBar}
      />
      <View style={[row, { height: 56 }]}>
        <TouchableRipple style={[flex1, center, { backgroundColor: colors.gray }]}>
          <View style={row}>
            <Icons name={'favorite-border'} color={colors.white} size={24}/>
            <Spacer size={8}/>
            <Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>
              찜하기
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple style={[flex2, center, { backgroundColor: colors.primary }]} onPress={onApply}>
          <Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>
            공고 지원하기
          </Text>
        </TouchableRipple>
      </View>
    </View>
  );
};
