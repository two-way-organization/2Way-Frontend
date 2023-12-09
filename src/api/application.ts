import { server } from '../constants/server';
import { ApplicantJob } from '../types/ApplicantJob';

export const fetchRandomApplications = async (token: string): Promise<{ jobs: ApplicantJob[] } | Error> => {
  const response = await fetch(server`/applicants/jobs/random`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => error as Error);

  if (response instanceof Error) return response;
  return response.json();
};

export const fetchRecentApplications = async (token: string): Promise<{ jobs: ApplicantJob[] } | Error> => {
  const response = await fetch(server`/applicants/jobs/recent`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => error as Error);

  if (response instanceof Error) return response;
  return response.json();
};
