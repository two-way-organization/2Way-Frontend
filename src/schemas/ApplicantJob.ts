export interface JobTopicDetail {
  detail: string | null;
  itemOrder: number;
}

// interface JobCreateRequestBody {
//   title: string;
//   position: string;
//   startDate: string;
//   endDate: string;
//   numberOfVacancies: number;
//   experienceLevel: ExperienceLevel;
//   educationLevel: EducationLevel;
//   jobType: JobType;
//   skill: string;
//   salary: JobSalary;
//   location: JobLocation;
//   recruitmentImage: string;
//   jobIntroduction: string;
//   responsibilities: JobTopicDetail[];
//   preferentialTreatment: JobTopicDetail[];
//   hiringProcess: JobTopicDetail[];
//   qualificationRequirements: JobTopicDetail[];
//   personalStatementQuestion: string[];
//   requiredDocuments: string;
// }
export interface ApplicantJob {
  jobId: string;
  companyName: string;
  educationLevel: string;
  endDate: string;
  experienceLevel: string;
  location: string;
  logoImage: string;
  startDate: string;
  title: string;
}

export type JobType = 'Regular' | 'Intern' | 'ConversionIntern' | 'Contract';
