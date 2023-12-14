import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { server } from '../constants/server';
import { useAuth } from '../stores/auth';

const axios = Axios.create({
  baseURL: server`/`,
  timeout: 1000 * 30,
});

useAuth.subscribe((store) => {
  if (!store.token) return;

  try {
    const accessToken = JSON.parse(store.token);
    if (!accessToken) return;

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } catch {}
});

const jwtTest = /bearer\s.+/i;
axios.interceptors.request.use(
  async (request) => {
    const isHeaderValid = jwtTest.test(axios.defaults.headers.common.Authorization?.toString() ?? '');
    if (isHeaderValid) return request;

    const accessToken = useAuth.getState().token;
    if (!accessToken) return request;

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    if (request.headers) request.headers.Authorization = `Bearer ${accessToken}`;

    return request;
  },
);


axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.data.originalError?.name === 'TokenExpiredError') {
      useAuth.setState({ token: null });
      console.log('Token expired, reset token');
    }

    return Promise.reject(error);
  },
);
export default axios;