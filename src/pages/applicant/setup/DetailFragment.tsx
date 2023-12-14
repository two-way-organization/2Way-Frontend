import { flex1, justifyBetween, p16, px16, py8, row } from '../../../common/style';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Spacer } from '../../../common/Spacer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import { Alert, Text, TextInput as TextInputComponent, View } from 'react-native';
import { colors } from '../../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useResumeBuilder } from '../../../stores/resume';
import DropDown from 'react-native-paper-dropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestResume } from '../../../api/resume';
import {
  ExperiencedResumeRequestSchema,
  InExperiencedResumeRequestSchema,
} from '../../../schemas/resume';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LOCATION_LIST } from '../../../constants/location';

export const ApplicantSetupDetailFragment = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const resume = useResumeBuilder();
  const setResume = useResumeBuilder((it) => it.setState);

  const resumeMutation = useMutation({
    mutationFn: async () => {
      const type = resume.experienceLevel === 'Experienced' ? 'experienced' : 'inexperienced';
      const body = {
        ...resume,
        birth: resume.birth && new Date(resume.birth).toISOString(),
      };

      if (type === 'inexperienced') {
        console.log(resume);
        const inExperiencedBody = InExperiencedResumeRequestSchema.safeParse(body);
        if (!inExperiencedBody.success) throw inExperiencedBody.error;
        await requestResume(type, inExperiencedBody.data);
        return;
      }

      if (type === 'experienced') {
        const experiencedBody = ExperiencedResumeRequestSchema.safeParse(body);
        if (!experiencedBody.success) throw experiencedBody.error;
        await requestResume(type, experiencedBody.data);
        return;
      }

      throw new Error('Invalid type');
    }
  });

  const birthRef = useRef<TextInputComponent>();
  const [showBirth, setShowBirth] = useState(false);
  const [showEducated, setShowEducated] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  useEffect(() => {
    if (resumeMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['resumes'] }).then(() => {
        navigation.navigate('ApplicantHome', {
          screen: 'Home',
        });
      });
    }

    if (resumeMutation.isError) {
      Alert.alert('이력서를 등록하는데 실패했습니다.');
      resumeMutation.reset();
    }
  }, [resumeMutation.isSuccess, resumeMutation.isError]);

  const onBack = () => {
    navigation.goBack();
  };
  const onSubmit = () => {
    resumeMutation.mutate();
  };

  return (
    <View style={flex1}>
      <ScrollView
        style={flex1}
        contentContainerStyle={{
          ...p16,
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 16,
        }}
      >
        <TextInput
          mode={'outlined'}
          label={'백준 아이디'}
          placeholder={'ID'}
          value={resume.baekjoonId}
          onChangeText={(text) => setResume({ baekjoonId: text })}
        />
        <Spacer size={24}/>
        <TextInput
          mode={'outlined'}
          label={'깃허브 아이디'}
          placeholder={'ID'}
          value={resume.gitHubId}
          onChangeText={(text) => setResume({ gitHubId: text })}
        />
        <Spacer size={24}/>
        <DropDown
          mode={'outlined'}
          label={'학력'}
          visible={showEducated}
          onDismiss={() => setShowEducated(false)}
          showDropDown={() => setShowEducated(true)}
          value={resume.educationLevel}
          setValue={(value) => setResume({ educationLevel: value })}
          list={[
            {
              value: 'MastersOrDoctorate',
              label: '석사/박사',
            },
            {
              value: 'BachelorsDegree',
              label: '학사',
            },
            {
              value: 'AssociateDegree',
              label: '전문대학',
            },
            {
              value: 'EducationNotRequired',
              label: '비공개',
            },
          ]}
        />
        <Spacer size={24}/>
        <TextInput
          mode={'outlined'}
          label={'학교명'}
          placeholder={'ID'}
          value={resume.schoolName}
          onChangeText={(text) => setResume({ schoolName: text })}
        />
        <Spacer size={24}/>
        <TextInput
          mode={'outlined'}
          label={'전공'}
          placeholder={'ID'}
          value={resume.major}
          onChangeText={(text) => setResume({ major: text })}
        />
        <Spacer size={24}/>
        <Text>
          성별
        </Text>
        <Spacer size={4}/>
        <SegmentedButtons
          value={resume.gender ?? 'male'}
          onValueChange={(value) => setResume({ gender: value })}
          buttons={[
            {
              value: 'male',
              label: '남성',
            },
            {
              value: 'female',
              label: '여성',
            },
          ]}
        />
        <Spacer size={24}/>
        <TextInput
          ref={(el: TextInputComponent) => birthRef.current = el}
          mode={'outlined'}
          label={'생년월일'}
          placeholder={'YYYY-MM-DD'}
          value={resume.birth}
          onFocus={() => setShowBirth(true)}
        />
        {showBirth && (
          <DateTimePicker
            value={new Date(resume.birth ?? new Date())}
            mode={'date'}
            is24Hour={true}
            onChange={(_, date) => {
              birthRef.current?.blur();
              setResume({ birth: date?.toISOString().split('T')[0] });
              setShowBirth(false);
            }}
          />
        )}
        <Spacer size={24}/>
        <DropDown
          mode={'outlined'}
          label={'주소'}
          visible={showAddress}
          onDismiss={() => setShowAddress(false)}
          showDropDown={() => setShowAddress(true)}
          value={resume.address}
          setValue={(value) => setResume({ address: value })}
          list={LOCATION_LIST}
        />
      </ScrollView>
      <View style={[row, justifyBetween, px16, py8, { borderColor: colors.gray, borderTopWidth: 1 }]}>
        <Button mode={'outlined'} style={flex1} onPress={onBack}>
          이전
        </Button>
        <Spacer size={12}/>
        <Button mode={'contained'} style={flex1} onPress={onSubmit}>
          완료
        </Button>
      </View>
    </View>
  );
};
