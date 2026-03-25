export type RoleName = 'admin' | 'doctor' | 'patient';

export interface Role {
  id: number; 
  name: RoleName;
}

export interface CreateRoleDTO {
  name: RoleName;
}

export interface UpdateRoleDTO {
  name?: RoleName;
}

export interface DeleteRoleDTO {
  id: number; 
}