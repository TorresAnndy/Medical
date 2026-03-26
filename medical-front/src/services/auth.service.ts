import api from './api';


export const getMeRequest = async () => {
  return api.get('/users/me');
};

export const loginRequest = async (email: string, password: string) => {
  const { data } = await api.post('/users/login', {
    email,
    password,
  });

  return data;
};

export const getDoctorsRequest = async () => {
  return await api.get('/users/doctors');
};

export const registerRequest = async (name: string, email: string, password: string) => {
  const { data } = await api.post('/users/register', {
    name,
    email,
    password,
  });

  return data;
};