import api from './axios';

export const login = async (credentials: any) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const register = async (userData: any) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};
