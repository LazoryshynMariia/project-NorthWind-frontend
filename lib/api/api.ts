import axios from 'axios';

export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    //замокана авторизація
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNGVhOGQ0MDg0MmJlM2VhNzY1ZDI2OSIsImlhdCI6MTc4Mzg0NTQ3OCwiZXhwIjoxNzgzODQ5MDc4fQ.UWMuZEfOMNhY_YTrd55xTkcEVh37_-_unRP8nhYE8hI',
  }
});
