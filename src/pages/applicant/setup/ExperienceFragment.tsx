import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { center, hFull, itemsStretch, wFull } from '../../../common/style';
import { colors } from '../../../constants/theme';
import { Spacer } from '../../../common/Spacer';
import { Button } from 'react-native-paper';
import { useResumeBuilder } from '../../../stores/resume';
import { useCallback } from 'react';

export const ApplicantSetupExperienceFragment = () => {
  const navigation = useNavigation();
  const setResume = useResumeBuilder((state) => state.setState);

  const onNoob = useCallback(() => {
    setResume({
      experienceLevel: 'Newcomer',
    });
    navigation.navigate('ApplicantSetup', { screen: 'Detail' });
  }, []);
  const onExperienced = useCallback(() => {
    setResume({
      experienceLevel: 'Experienced',
    });
    navigation.navigate('ApplicantSetup', { screen: 'Detail' });
  }, []);


  return (
    <View style={[wFull, hFull, center]}>
      <Text style={[{ fontSize: 24, fontWeight: 'bold' }]}>이력서를 등록해보세요.</Text>
      <Text style={[{ fontSize: 24, fontWeight: 'bold', color: colors.primary }]}>현재 경력을 알려주세요!</Text>
      <Spacer size={96}/>
      <View style={[{ width: '80%' }, itemsStretch]}>
        <Button mode={'contained'} onPress={onNoob}>
          신입
        </Button>
        <Spacer size={24}/>
        <Button mode={'outlined'} onPress={onExperienced}>
          경력
        </Button>
      </View>
    </View>
  );
};
