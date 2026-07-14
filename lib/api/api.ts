import axios from 'axios';

export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

nextServer.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});
