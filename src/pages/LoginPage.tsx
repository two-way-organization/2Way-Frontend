import React, { useCallback, useEffect, useState } from 'react';

import { Alert, Pressable, Text, TextProps, View } from 'react-native';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';

import { hFull, itemsCenter, itemsStretch, justifyCenter, justifyStart, row, selfStart, wFull } from '../common/style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/theme';
import { Spacer } from '../common/Spacer';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Loader } from '../common/Loader';
import { useAuth } from '../stores/auth';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';

export const LoginPage = () => {
  const navigation = useNavigation();
  const store = useAuth();
  const isLogin = useAuth((it) => it.isLogin());

  const loginMutation = useMutation({
    mutationFn: () => login(type as 'applicants' | 'companies', email, password),
  })

  const [type, setType] = useState('applicants');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (loginMutation.isError) {
      Alert.alert('로그인에 실패했습니다.');
    }
  }, [loginMutation.isError]);
  useEffect(() => {
    if (loginMutation.isSuccess) {
      store.setToken(loginMutation.data.token);
    }
  }, [loginMutation.isSuccess]);

  useEffect(() => {
    if (isLogin) {
      if (type === 'applicants') navigation.dispatch(StackActions.replace('ApplicantHome'));
      if (type === 'companies') navigation.dispatch(StackActions.replace('CompanyHome'))
    }
  }, [isLogin]);

  const onSubmit = useCallback(async () => {
    loginMutation.mutate();
  }, []);

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
      <Loader loading={loginMutation.isPending} />
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
