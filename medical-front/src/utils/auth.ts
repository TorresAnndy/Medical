export const getToken = () => {
  return localStorage.getItem('token');
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  return parseJwt(token);
};

export const isAdmin = () => {
  const user = getUserFromToken();
  return user?.role === 'admin';
};

export const getUserRole = () => {
  const user = getUserFromToken();
  return user?.role || 'user';
};