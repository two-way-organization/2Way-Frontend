import { Alert, View } from 'react-native';
import { Appbar, Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { Spacer } from '../common/Spacer';
import { hFull, itemsStretch, selfCenter, wFull } from '../common/style';
import React, { useState } from 'react';
import { colors } from '../constants/theme';
import { auth } from '../api';
import { Loader } from '../common/Loader';
import { useNavigation } from '@react-navigation/native';

export const RegisterPage = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('applicants');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onSubmit = async () => {
    if (password !== passwordConfirm) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    const result = await auth.register(type as 'applicants' | 'companies', name, email, password);
    if ('applicantId' in result || 'companyId' in result) {
      Alert.alert('회원가입이 완료되었습니다.');
      navigation.goBack();
    }

    setLoading(false);
  };

  return (
    <View style={[wFull, hFull]}>
      <Appbar.Header mode={'center-aligned'}>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title={'회원가입'}/>
      </Appbar.Header>
      <Loader loading={loading}/>
      <View style={[{ width: '80%' }, itemsStretch, selfCenter]}>
        <Spacer size={36}/>
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
          density={'small'}
          theme={{
            colors: {
              secondaryContainer: colors.secondary,
            },
          }}
        />
        <Spacer size={16}/>
        <TextInput
          mode={'outlined'}
          label={'이름'}
          placeholder={'이름을 입력해주세요'}
          value={name}
          onChangeText={setName}
        />
        <Spacer size={16}/>
        <TextInput
          mode={'outlined'}
          label={'이메일'}
          placeholder={'이메일을 입력해주세요'}
          value={email}
          onChangeText={setEmail}
        />
        <Spacer size={16}/>
        <TextInput
          secureTextEntry
          mode={'outlined'}
          label={'비밀번호'}
          placeholder={'비밀번호를 입력해주세요'}
          value={password}
          onChangeText={setPassword}
        />
        <Spacer size={16}/>
        <TextInput
          secureTextEntry
          mode={'outlined'}
          label={'비밀번호 확인'}
          placeholder={'비밀번호를 다시 한번 입력해주세요'}
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
        />
        <Spacer size={42}/>
        <Button mode={'contained'} onPress={onSubmit}>
          회원 가입
        </Button>

      </View>
    </View>
  );
};
