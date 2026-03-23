export interface Appointment {
  id: string;
  patient_name: string;
  doctor_name: string;
  appointment_date: string;
  reason: string;
  status: 'pendiente' | 'confirmada' | 'cancelada';
  created_at: string;
}

export interface CreateAppointmentDTO {
  patient_name: string;
  doctor_name: string;
  appointment_date: string;
  reason: string;
}

export interface UpdateAppointmentDTO {
  patient_name?: string;
  doctor_name?: string;
  appointment_date?: string;
  reason?: string;
  status?: 'pendiente' | 'confirmada' | 'cancelada';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}