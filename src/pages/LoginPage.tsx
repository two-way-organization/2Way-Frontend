import React, { useEffect, useState } from 'react';

import { Pressable, Text, TextProps, View } from 'react-native';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';

import { hFull, itemsCenter, itemsStretch, justifyCenter, justifyStart, row, selfStart, wFull } from '../common/style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/theme';
import { Spacer } from '../common/Spacer';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Loader } from '../common/Loader';
import { useAuthStore } from '../stores/auth';

export const LoginPage = () => {
  const navigation = useNavigation();
  const store = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('applicants');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (store.isLogin()) {
      if (type === 'applicants') navigation.dispatch(StackActions.replace('ApplicantHome'));
      if (type === 'companies') navigation.dispatch(StackActions.replace('CompanyHome'))
    }
  }, [store.isLogin()]);

  const onSubmit = async () => {
    setLoading(true);
    await store.login(type as 'applicants' | 'companies', email, password);
    setLoading(false);
  };

  return (
    <SafeAreaView style={[wFull, hFull, justifyStart, itemsCenter]}>
      <View style={[row, justifyCenter, { marginTop: 84, marginBottom: 50 }]}>
        <Text style={{ fontSize: 60, fontWeight: 600 } as TextProps}>
          Two
          {' '}
          <Text style={{ color: colors.primary }}>
            Way
          </Text>
        </Text>
      </View>
      <Loader loading={loading} />
      <View style={[{ width: '80%' }, itemsStretch]}>
        <SegmentedButtons
          buttons={[
            {
              value: 'applicants',
              label: '개인',
            },
            {
              value: 'companies',
              label: '기업',
            },
          ]}
          value={type}
          onValueChange={setType}
          style={[{ width: 120 }, selfStart]}
          density={'small'}
          theme={{
            colors: {
              secondaryContainer: colors.secondary,
            },
          }}
        />
        <Spacer size={32}/>
        <TextInput
          mode={'outlined'}
          placeholder={'이메일을 입력하세요'}
          style={wFull}
          value={email}
          onChangeText={setEmail}
        />
        <Spacer size={32}/>
        <TextInput
          mode={'outlined'}
          placeholder={'비밀번호를 입력하세요'}
          style={wFull}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Spacer size={32}/>
        <Button mode={'contained'} onPress={onSubmit}>
          로그인
        </Button>
      </View>
      <Spacer size={120}/>
      <View style={[row, itemsCenter]}>
        <Text>
          아직 회원이 아니세요?
          {' '}
        </Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={{ fontWeight: 'bold' }}>
            회원가입
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
