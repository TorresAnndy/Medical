export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getRole = (): 'admin' | 'doctor' | 'patient' | null => {
  const user = getUser();
  return user?.role || null;
};

export const getUserName = (): string => {
  const user = getUser();
  return user?.name || 'Usuario';
};

export const isAdmin = (): boolean => getRole() === 'admin';
export const isDoctor = (): boolean => getRole() === 'doctor';
export const isPatient = (): boolean => getRole() === 'patient';

export const canCreateAppointment = (): boolean => getRole() === 'patient';
export const canEditAppointment = (): boolean =>
  getRole() === 'admin' || getRole() === 'doctor';

export const canDeleteAppointment = (): boolean => getRole() === 'admin';

export const canChangeAppointmentStatus = (): boolean =>
  getRole() === 'admin' || getRole() === 'doctor';