import { server } from '../constants/server';

export const login = async (type: 'applicants' | 'companies', email: string, password: string) => {
  console.log(server`${type}`);
  const response = await fetch(server`${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).catch((error) => error as Error);

  if (response instanceof Error) return response;
  return response.json();
};

export const register = async (type: 'applicants' | 'companies', name: string, email: string, password: string) => {
  const response = await fetch(server`${type}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).catch((error) => error as Error);

  if (response instanceof Error) return response;
  return response.json();
};
