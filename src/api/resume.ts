import axios from './config';
import { server } from '../constants/server';
import { ResumeRequest, ResumeResponse } from '../schemas/resume';

export const fetchResumes = async (): Promise<{ profile: ResumeResponse }> => {
  const response = await axios(server`/applicants/resumes`);

  return response.data;
};

export const requestResume = async (type: 'experienced' | 'inexperienced', resume: ResumeRequest): Promise<{ profile: ResumeResponse }> => {
  const response = await axios.put(`/applicants/resumes/${type}`, { profile: resume });

  return response.data;
}
