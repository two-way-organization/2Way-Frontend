import { z } from 'zod';
import { EducationLevelSchema, ExperienceLevelSchema } from './level';
import { CompanySchema } from './company';

export const JobSchema = z.object({
  id: z.number(),
  company: CompanySchema,
  title: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  numberOfVacancies: z.number(),
  experienceLevel: ExperienceLevelSchema,
  educationLevel: EducationLevelSchema,
  jobType: z.enum(['Regular', 'Contract', 'Intern']),
  salary: z.enum(['DecisionAfterTheInterview', 'AccordingToCompanyPolicy']),
  location: z.string(),
  recruitmentImage: z.string(),
  jobIntroduction: z.string(),
  personalStatementQuestion: z.object({
    data: z.array(z.string()),
  }),
  requiredDocuments: z.string(),
  status: z.enum(['Ongoing', 'Closed']),
  viewCount: z.number(),
  applicationCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Job = z.infer<typeof JobSchema>;

export const ApplicationStatusSchema = z.object({
  applicationId: z.number(),
  job: JobSchema,
  status: z.enum(['Waiting', 'Preferred', 'Success', 'Failed']),
  appliedAt: z.string().datetime(),
});

export const ApplicationStatusResponseSchema = z.object({
  applications: z.array(ApplicationStatusSchema),
});

export type ApplicationStatus = z.infer<typeof ApplicationStatusSchema>;
export type ApplicationStatusResponse = z.infer<typeof ApplicationStatusResponseSchema>;
