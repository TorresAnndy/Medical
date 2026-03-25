import api from './api';

export const loginRequest = async (email: string, password: string) => {
  const { data } = await api.post('/users/login', {
    email,
    password,
  });

  return data;
};

export const registerRequest = async (name: string, email: string, password: string) => {
  const { data } = await api.post('/users/register', {
    name,
    email,
    password,
  });

  return data;
};