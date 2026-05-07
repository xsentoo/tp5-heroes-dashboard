import api from './axios';

export const getHeroes = async (params: any = {}) => {
  const { data } = await api.get('/heroes', { params });
  return data;
};

export const getHeroById = async (id: string) => {
  const { data } = await api.get(`/heroes/${id}`);
  return data;
};

export const createHero = async (formData: FormData) => {
  const { data } = await api.post('/heroes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

export const updateHero = async (id: string, formData: FormData) => {
  const { data } = await api.put(`/heroes/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

export const deleteHero = async (id: string) => {
  const { data } = await api.delete(`/heroes/${id}`);
  return data;
};
