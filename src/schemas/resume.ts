import { z } from 'zod';
import { EducationLevelSchema, ExperienceLevelSchema } from './level';

// Request
export const InExperiencedResumeRequestSchema = z.object({
  baekjoonId: z.string(),
  gitHubId: z.string(),
  educationLevel: EducationLevelSchema,
  schoolName: z.string(),
  major: z.string(),
  gender: z.string(),
  birth: z.string().datetime(),
  address: z.string(),
  experienceLevel: ExperienceLevelSchema,
});
export const ExperiencedResumeRequestSchema = InExperiencedResumeRequestSchema.extend({
  totalExperience: z.number(),
  companyName: z.string(),
  duties: z.string(),
});

export type InExperienceResumeRequest = z.infer<typeof InExperiencedResumeRequestSchema>;
export type ExperiencedResumeRequest = z.infer<typeof ExperiencedResumeRequestSchema>;
export type ResumeRequest = InExperienceResumeRequest | ExperiencedResumeRequest;

// Response
export const InexperiencedResumeResponseSchema = InExperiencedResumeRequestSchema.extend({
  applicant: z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string(),
    updateAt: z.string().datetime(),
    createdAt: z.string().datetime(),
    isActive: z.boolean(),
  }),
});
export const ExperiencedResumeResponseSchema = ExperiencedResumeRequestSchema.extend({
  applicant: z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string(),
    updateAt: z.string().datetime(),
    createdAt: z.string().datetime(),
    isActive: z.boolean(),
  }),
});

export type InexperiencedResumeResponse = z.infer<typeof InexperiencedResumeResponseSchema>;
export type ExperiencedResumeResponse = z.infer<typeof ExperiencedResumeResponseSchema>;
export type ResumeResponse = InexperiencedResumeResponse | ExperiencedResumeResponse;
