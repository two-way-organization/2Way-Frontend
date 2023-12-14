import { ApplicantJob, JobType } from '../schemas/ApplicantJob';
import axios from './config';
import { ApplicationStatus, ApplicationStatusResponse, Job } from '../schemas/application';
import { Pagination } from './types';
import { EducationLevel, ExperienceLevel } from '../schemas/level';
import { ResumeResponse } from '../schemas/resume';
import { Question, QuestionAnalyze } from '../schemas/question';
import { Company } from '../schemas/company';

export const fetchRandomJobs = async (): Promise<{ jobs: ApplicantJob[] }> => {
  const response = await axios('/applicants/jobs/random');

  return response.data;
};

export const fetchRecentJobs = async (): Promise<{ jobs: ApplicantJob[] }> => {
  const response = await axios('/applicants/jobs/recent');

  return response.data;
};

export type StatusType = 'waiting' | 'preferred' | 'success' | 'failed';
export const fetchApplicationStatus = async (status: StatusType): Promise<ApplicationStatusResponse> => {
  const response = await axios(`/applicants/applications/status/${status}`);

  return response.data;
};
export const fetchApplication = async (id: number): Promise<{
  applications: ApplicationStatus;
  resume: ResumeResponse;
  questions: Question[]
}> => {
  const response = await axios(`/applicants/applications/${id}/details`);

  return response.data;
};

export type SearchJobsParams = {
  title?: string;
  position?: string;
  location?: string;
  jobType?: JobType;
  educationLevel?: EducationLevel;
  experienceLevel?: ExperienceLevel;
  skills?: string;
};
export const searchJobs = async (params: SearchJobsParams, page = 1, pageSize = 10): Promise<Pagination<{
  jobs: Job[]
}>> => {
  const response = await axios.get(`/applicants/jobs/search`, {
    params: {
      ...params,
      page,
      pageSize,
    },
  });

  return response.data;
};

export const fetchRecentApplications = async (page = 1, pageSize = 10): Promise<Pagination<{ jobs: Job[] }>> => {
  const response = await axios.get('/applicants/recently-viewed', {
    params: {
      page,
      pageSize,
    },
  });

  return response.data;
};

export const fetchSavedJobs = async (page = 1, pageSize = 10): Promise<Pagination<{ jobs: Job[] }>> => {
  const response = await axios.get('/applicants/saved-jobs', {
    params: {
      page,
      pageSize,
    },
  });

  return response.data;
};
export const fetchSavedCompanies = async (page = 1, pageSize = 10): Promise<Pagination<{ company: Company[] }>> => {
  const response = await axios.get('/applicants/saved-company', {
    params: {
      page,
      pageSize,
    },
  });

  return response.data;
};

export const saveCoverLetter = async (id: number, coverLetter: string, index: number): Promise<{
  fileId?: number;
  questionIds?: number[];
}> => {
  const data = await fetchApplication(id);

  const questionList = data.questions.map((question, i) => question.applicantResponse);
  questionList[index] = coverLetter;

  const response = await axios.put(`/applicants/applications/${id}/cover-letters`, {
    questions: questionList.map((question) => ({ applicantResponse: question })),
  });

  return response.data;

};
export const requestAnalyze = async (id: number): Promise<{ questions: QuestionAnalyze[] }> => {
  const response = await axios.post(`/applicants/applications/${id}/cover-letters/analyze`, undefined, {
    timeout: 1000 * 60,
  });

  return response.data;
};

export const applyJob = async (jobId: number): Promise<{ applicationId: number }> => {
  const response = await axios.put(`/applicants/applications/apply-job`, { jobId });

  return response.data;
};
