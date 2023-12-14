import { View, Text } from 'react-native';
import { center, hFull, itemsStretch, wFull } from '../../../common/style';
import { Button } from 'react-native-paper';
import { colors } from '../../../constants/theme';
import { Spacer } from '../../../common/Spacer';
import { useNavigation } from '@react-navigation/native';

export const ApplicantSetupStartFragment = () => {
  const navigation = useNavigation();

  const onNext = () => {
    navigation.navigate('ApplicantSetup', { screen: 'Experience' });
  };

  return (
    <View style={[wFull, hFull, center]}>
      <Text style={[{ fontSize: 24, fontWeight: 'bold' }]}>취업 전 중요사항!</Text>
      <Text style={[{ fontSize: 24, fontWeight: 'bold', color: colors.primary }]}>이력서 작성하러 가볼까요?</Text>
      <Spacer size={96} />
      <View style={[{ width: '80%' }, itemsStretch]}>
        <Button mode={'contained'} onPress={onNext}>
          이력서 입력하기
        </Button>
      </View>
    </View>
  );
};
