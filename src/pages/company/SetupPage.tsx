import {
  column,
  flex1,
  hFull,
  itemsCenter,
  itemsStretch,
  justifyCenter, m16,
  p16, px16,
  selfCenter,
  selfStart,
  wFull
} from '../../common/style';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { Pressable, View, Text } from 'react-native';
import { Spacer } from '../../common/Spacer';
import { colors } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export const CompanySetupPage = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[wFull, hFull, { paddingBottom: insets.bottom }]}>
      <Appbar.Header mode={'center-aligned'}>
        <Appbar.BackAction />
        <Appbar.Content title={'기업정보'} />
      </Appbar.Header>
      <ScrollView
        style={flex1}
        contentContainerStyle={p16}
      >
        <TextInput
          mode={'outlined'}
          label={'사업자등록번호'}
          placeholder={'사업자등록번호를 입력해주세요'}
        />
        <Spacer size={24} />
        <TextInput
          mode={'outlined'}
          label={'대표자 이름'}
          placeholder={'대표자 이름을 입력해주세요'}
        />
        <Spacer size={24} />
        <TextInput
          mode={'outlined'}
          label={'회사명'}
          placeholder={'회사명을 입력해주세요'}
        />
        <Spacer size={24} />
        <TextInput
          multiline
          mode={'outlined'}
          label={'회사소개'}
          placeholder={'내용'}
        />
        <Spacer size={24} />
        <Text>
          기업 로고
        </Text>
        <Spacer size={4} />
        <Pressable>
          <View style={[{
            width: 128,
            height: 128,
            borderRadius: 12, borderColor: colors.black, borderWidth: 1
          }, itemsCenter, justifyCenter]}>
            <Text style={{ fontSize: 48 }}>
              +
            </Text>
          </View>
        </Pressable>
        <Spacer size={24} />
        <TextInput
          mode={'outlined'}
          label={'산업'}
        />
        <Spacer size={24} />
        <TextInput
          mode={'outlined'}
          label={'기업구분'}
        />
        <Spacer size={24} />
        <TextInput
          mode={'outlined'}
          label={'사원수'}
        />
        <Spacer size={24} />
        <TextInput
          mode={'outlined'}
          label={'자본금'}
        />
        <Spacer size={24} />
        <TextInput
          mode={'outlined'}
          label={'설립일'}
        />
        <Spacer size={24} />
        <TextInput
          mode={'outlined'}
          label={'주요사업'}
        />
      </ScrollView>
      <View style={[p16, { borderTopWidth: 1, borderColor: colors.black }]}>
        <Button mode={'contained'}>
          수정
        </Button>
      </View>
    </View>
  )
};
