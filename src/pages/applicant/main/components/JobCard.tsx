import { Job } from '../../../../schemas/application';
import { levelToString } from '../../../../schemas/level';
import { TouchableRipple } from 'react-native-paper';
import { Image, Text, View } from 'react-native';
import {
  column,
  flex1, itemsEnd,
  itemsStart,
  justifyCenter,
  justifyEnd,
  px16,
  py8,
  relative,
  row
} from '../../../../common/style';
import { Spacer } from '../../../../common/Spacer';
import { colors } from '../../../../constants/theme';
import React from 'react';

export type JobCardProps = {
  job: Job;

  children?: React.ReactNode;
  onPress?: () => void;
}
export const JobCard = ({ job, onPress, children }: JobCardProps) => {
  const endDate = new Date(job.endDate);
  const experienceLevel = levelToString(job.experienceLevel);
  const educationLevel = levelToString(job.educationLevel);

  const description = `${endDate.getFullYear()}년 ${endDate.getMonth() + 1}월 ${endDate.getDate()}일 마감 | ${experienceLevel} | ${educationLevel}`;

  return (
    <TouchableRipple onPress={onPress}>
      <View style={[row, px16, py8]}>
        <Image
          source={{ uri: job.company.companyInfo.logoImage }}
          style={{ width: 80, height: 80, objectFit: 'contain' }}
        />
        <Spacer size={16}/>
        <View style={[column, justifyCenter, itemsStart, flex1]}>
          <Text style={{ color: colors.primary }}>{job.company.companyInfo.companyName}</Text>
          <Text style={{ fontWeight: 'bold' }}>{job.title}</Text>
          <Text>{description}</Text>
        </View>
        <Spacer size={8}/>
        <View style={[column, justifyEnd, itemsEnd]}>
          {children}
        </View>
      </View>
    </TouchableRipple>
  );
};
