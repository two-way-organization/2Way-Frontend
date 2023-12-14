import { z } from 'zod';

export const QuestionSchema = z.object({
  personalStatementQuestion: z.string(),
  applicantResponse: z.string(),
  summarizedResponse: z.string(),
});

export type Question = z.infer<typeof QuestionSchema>;

export const QuestionAnalyzeSchema = z.object({
  personalStatementQuestion: z.string(),
  applicantResponse: z.string(),

  analyzedResponse: z.array(z.object({
    original: z.string(),
    reason: z.string(),
    improved: z.string(),
  })),
});

export type QuestionAnalyze = z.infer<typeof QuestionAnalyzeSchema>;
