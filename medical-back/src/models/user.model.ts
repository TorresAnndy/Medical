export type RoleName = 'admin' | 'doctor' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;

  role_id: number | null; 
  role?: RoleName;        

  created_at: Date;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UserPublic {
  id: string;
  name: string;
  email: string;
  role: RoleName; 
  created_at: Date;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: RoleName; 
}