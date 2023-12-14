import { server } from '../constants/server';
import axios from 'axios';
import { RequestError } from './types';

export const login = async (type: 'applicants' | 'companies', email: string, password: string): Promise<{ token: string }> => {
  const response = await axios.post(server`${type}`, { email, password });
  if (response.status !== 200) {
    throw {
      status: response.status,
      error: response.statusText,
      body: response.data,
    };
  }

  return response.data;
};

export const register = async (type: 'applicants' | 'companies', name: string, email: string, password: string): Promise<unknown> => {
  const response = await axios.put(server`${type}`, { name, email, password });
  if (response.status !== 200 && response.status !== 201) {
    throw {
      status: response.status,
      error: response.statusText,
      body: response.data,
    };
  }

  return response.data;
};
