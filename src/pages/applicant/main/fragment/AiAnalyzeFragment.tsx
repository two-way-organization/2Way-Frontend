import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import {
  flex1,
  hFull,
  itemsCenter,
  justifyBetween,
  justifyEnd,
  m16,
  mx16,
  my8,
  p16,
  p8,
  px16,
  py8,
  row,
  selfCenter,
  wFull
} from '../../../../common/style';
import { ActivityIndicator, Appbar, Button, Card, Chip, DataTable, Divider, TouchableRipple } from 'react-native-paper';
import { colors } from '../../../../constants/theme';
import React, { Fragment, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Job } from '../../../../schemas/application';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacer } from '../../../../common/Spacer';
import { ScrollView } from 'react-native-gesture-handler';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestSpellCheck } from '../../../../api/util';
import { requestAnalyze, saveCoverLetter } from '../../../../api/application';

export const AiAnalyzeFragment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const job = (route.params as { job?: Job })?.job;
  const question = (route.params as { question?: string })?.question;
  const index = (route.params as { index?: number })?.index;
  const applicationId = (route.params as { applicationId?: number })?.applicationId;
  const defaultText = (route.params as { text?: string })?.text;

  const [text, setText] = useState(defaultText ?? '');
  const [saveLoading, setSaveLoading] = useState(false);
  const spellMutation = useMutation({
    mutationFn: requestSpellCheck,
  });
  const fixMutation = useMutation({
    mutationFn: async () => {
      if (typeof applicationId !== 'number') return;
      if (typeof index !== 'number') return;

      await saveCoverLetter(applicationId, text, index);
      return requestAnalyze(applicationId);
    },
    retry: false,
  });
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (typeof applicationId !== 'number') return;
      if (typeof index !== 'number') return;

      return saveCoverLetter(applicationId, text, index);
    },
    retry: false,
  });

  const fixList = typeof index === 'number' ? fixMutation.data?.questions?.[index]?.analyzedResponse ?? [] : [];
  const spellList = spellMutation.data?.result ?? [];

  const onAnalyze = () => {
    spellMutation.mutate(text);
    fixMutation.mutate();
  };
  const onFix = (original: string, improved: string) => {
    setText(text.replace(original, improved));
  };

  const onSave = async () => {
    setSaveLoading(true);
    await saveMutation.mutateAsync();
    await queryClient.invalidateQueries({
      queryKey: ['application', null],
    });

    setSaveLoading(false);
    Alert.alert('저장되었습니다.');
  };

  return (
    <KeyboardAvoidingView
      behavior={'height'}
      style={[wFull, hFull]}
      keyboardVerticalOffset={insets.bottom + 16}
    >
      <Appbar.Header mode={'small'} statusBarHeight={Platform.OS === 'ios' ? 0 : undefined}>
        <Appbar.BackAction color={colors.white} onPress={navigation.goBack}/>
        <Appbar.Content title={'AI 자소서 작성'} color={colors.white} titleStyle={{ fontWeight: 'bold' }}/>
        <Appbar.Action
          disabled={saveLoading}
          icon={saveLoading ? () => (<ActivityIndicator color={colors.white}/>) : 'content-save'}
          color={colors.white}
          onPress={onSave}
        />
      </Appbar.Header>
      <ScrollView>
        {job && (
          <DataTable.Row>
            <DataTable.Cell>
              <Image
                source={{ uri: job.company.companyInfo.logoImage }}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: 'contain',
                }}
              />
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{job.company.companyInfo.companyName}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        )}
        <Divider/>
        <Card style={[m16]}>
          <View style={p16}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              <Text style={{ color: colors.secondary }}>
                Q.{' '}
              </Text>
              {question}
            </Text>
          </View>
        </Card>
        <Text style={[px16, { fontSize: 18, fontWeight: 'bold' }]}>자기소개서</Text>
        <Card style={[m16, px16, py8, flex1, { marginBottom: insets.bottom + 16 }]}>
          <TextInput
            value={text}
            onChangeText={setText}
            multiline
            style={[wFull, hFull, { textAlignVertical: 'top' }]}
            placeholder={`자기소개서를 입력해주세요.
TOWAY 자소서 AI 첨삭 서비스가 자소서의 완성도를 높여드립니다.
최소 200자 이상 최대 1000자까지 입력해주셔야 첨삭가능합니다.`}
          />
        </Card>
        <Text style={[px16, { fontSize: 18, fontWeight: 'bold' }]}>
          AI 자기소개서 첨삭
        </Text>
        {spellMutation.isPending && (
          <View style={[row, itemsCenter, p16]}>
            <ActivityIndicator size={'large'} color={colors.primary}/>
            <Spacer size={8}/>
            <Text style={[px16, { fontSize: 14, fontWeight: 'bold', color: colors.primary }]}>
              맞춤법을 체크하고 있어요.
            </Text>
          </View>
        )}
        {spellList.length > 0 && (
          <View style={py8}>
            <Text style={[px16, { fontSize: 14, fontWeight: 'bold', color: colors.red }]}>
              맞춤법이 잘못되었어요.
            </Text>
            <Card style={[mx16, my8]}>
              <Text style={[mx16, my8]}>맞춤법 오류 {spellMutation.data?.result.length}개</Text>
              <Divider/>
              {spellList.map((result, index) => (
                <View key={result.token} style={[mx16, my8, row, justifyBetween, itemsCenter]}>
                  <Text>{result.token}</Text>
                  <Icons name={'arrow-forward'} size={24}/>
                  <View style={[row, justifyEnd, itemsCenter]}>
                    {result.suggestions.map((suggestion, index) => (
                      <Fragment
                        key={index}
                      >
                        <Chip
                          compact
                          mode={'outlined'}
                          theme={{
                            colors: {
                              surface: colors.container,
                            },
                          }}
                          onPress={() => onFix(result.token, suggestion)}
                        >
                          {suggestion}
                        </Chip>
                        <Spacer size={8}/>
                      </Fragment>
                    ))}
                  </View>
                </View>
              ))}
            </Card>
          </View>
        )}
        {spellList.length === 0 && spellMutation.data && (
          <View style={py8}>
            <Text style={[px16, { fontSize: 14, fontWeight: 'bold', color: colors.primary }]}>
              맞춤법 오류가 없어요!
            </Text>
          </View>
        )}

        {fixMutation.isPending && (
          <View style={[row, itemsCenter, p16]}>
            <ActivityIndicator size={'large'} color={colors.primary}/>
            <Spacer size={8}/>
            <Text style={[px16, { fontSize: 14, fontWeight: 'bold', color: colors.primary }]}>
              AI 분석을 하고 있어요.
            </Text>
          </View>
        )}
        {fixList.length > 0 && (
          <View style={py8}>
            <Text style={[px16, { fontSize: 14, fontWeight: 'bold', color: colors.primary }]}>
              이렇게 수정해보아요.
            </Text>
            {fixList.map((question, index) => (
              <Card style={[mx16, my8, p16]}>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>
                    {index + 1}. {question.reason}
                  </Text>
                  <Spacer size={16}/>
                  <Text>
                    {question.original}
                  </Text>
                  <Spacer size={8}/>
                  <Icons name={'arrow-downward'} size={24} style={selfCenter}/>
                  <Spacer size={8}/>
                  <TouchableRipple onPress={() => onFix(question.original, question.improved)}>
                    <View style={[p8, { borderColor: colors.gray, borderWidth: 1, borderRadius: 12 }]}>
                      <Text style={{ color: colors.primary }}>
                        {question.improved}
                      </Text>
                    </View>
                  </TouchableRipple>
                </View>
              </Card>
            ))}
          </View>
        )}
        {fixMutation.data?.questions.length === 0 && (
          <View style={py8}>
            <Text style={[px16, { fontSize: 14, fontWeight: 'bold', color: colors.primary }]}>
              첨삭할 내용이 없어요!
            </Text>
          </View>
        )}

      </ScrollView>
      <View style={[row, justifyBetween, px16, py8, {
        bottom: insets.bottom,
        borderColor: colors.gray,
        borderTopWidth: 1,
        paddingBottom: insets.bottom + 8
      }]}>
        <Button mode={'outlined'} style={flex1} onPress={Keyboard.dismiss}>
          키보드 닫기
        </Button>
        <Spacer size={12}/>
        <Button mode={'contained'} style={flex1} onPress={onAnalyze}>
          AI 분석하기
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};
