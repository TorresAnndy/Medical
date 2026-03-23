import api from './api';
import type {
    Appointment,
    CreateAppointmentDTO,
    UpdateAppointmentDTO,
    ApiResponse,
} from '../types/appointment';

export const getAppointments = async (): Promise<Appointment[]> => {
  const res = await api.get<ApiResponse<Appointment[]>>('/appointments');
  return res.data.data;
};

export const getAppointmentById = async (id: string): Promise<Appointment> => {
  const res = await api.get<ApiResponse<Appointment>>(`/appointments/${id}`);
  return res.data.data;
};

export const createAppointment = async (
  data: CreateAppointmentDTO
): Promise<Appointment> => {
  const res = await api.post<ApiResponse<Appointment>>('/appointments', data);
  return res.data.data;
};

export const updateAppointment = async (
  id: string,
  data: UpdateAppointmentDTO
): Promise<Appointment> => {
  const res = await api.put<ApiResponse<Appointment>>(`/appointments/${id}`, data);
  return res.data.data;
};

export const deleteAppointment = async (id: string): Promise<void> => {
  await api.delete(`/appointments/${id}`);
};

export const updateAppointmentStatus = async (
  id: string,
  status: 'pendiente' | 'confirmada' | 'cancelada'
): Promise<Appointment> => {
  const res = await api.patch<ApiResponse<Appointment>>(
    `/appointments/${id}/status`,
    { status }
  );
  return res.data.data;
};