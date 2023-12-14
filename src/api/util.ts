import axios from './config';

export const fetchLanguageUsage = async (username: string): Promise<{ languageUsage: Record<string, number> }> => {
  const response = await axios.post('/utils/github-language-usage', {
    githubUsername: username,
  });

  return response.data;
};

export const fetchSolvedAc = async (username: string): Promise<{ tier: number; }> => {
  const response = await axios.post('/utils/solved-ac-tier', {
    solvedAcUsername: username,
  });

  return response.data;
};

export interface HanspellResult {
  token: string;
  suggestions: string[];
  info: string;
}

export const requestSpellCheck = async (text: string): Promise<{ result: HanspellResult[]; }> => {
  const response = await axios.post('/utils/spell-check', {
    text,
  });

  if (Array.isArray(response.data.result)) {
    return {
      result: response.data.result[response.data.result.length - 1],
    };
  }
  return response.data;
};
