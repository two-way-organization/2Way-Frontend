import { z } from 'zod';

export const CompanyInfoSchema = z.object({
  companyId: z.number(),
  companyName: z.string(),
  registrationNumber: z.string(),
  ceoName: z.string(),
  introduction: z.string(),
  logoImage: z.string(),
  companyType: z.enum(['SmallBusiness', 'MediumEnterprise', 'Enterprise']),
  numberOfEmployees: z.number(),
  capital: z.string(),
  establishmentDate: z.string().datetime(),
  mainBusiness: z.object({
    data: z.array(z.string()),
  }),
});

export const CompanySchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  companyInfo: CompanyInfoSchema,
});

export type CompanyInfo = z.infer<typeof CompanyInfoSchema>;
export type Company = z.infer<typeof CompanySchema>;
