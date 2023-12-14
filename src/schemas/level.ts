import { z } from 'zod';

export const EducationLevelSchema = z.enum(['MastersOrDoctorate', 'AssociateDegree', 'BachelorsDegree', 'MastersOrDoctorate', 'EducationNotRequired']);
export const ExperienceLevelSchema = z.enum(['Newcomer', 'Experienced', 'Unspecified']);

export type EducationLevel = z.infer<typeof EducationLevelSchema>;
export type ExperienceLevel = z.infer<typeof ExperienceLevelSchema>;

export const levelToString = (level: EducationLevel | ExperienceLevel): string => {
  switch (level) {
    case 'MastersOrDoctorate':
      return '석사 이상';
    case 'BachelorsDegree':
      return '학사';
    case 'AssociateDegree':
      return '전문학사';
    case 'EducationNotRequired':
      return '학력 무관';
    case 'Newcomer':
      return '신입';
    case 'Experienced':
      return '경력';
    case 'Unspecified':
      return '경력 무관';
  }

  return '알 수 없음';
};