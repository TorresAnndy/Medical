export interface Appointment {
  id: string;
  patient_name: string;
  doctor_name: string;
  appointment_date: Date;
  reason: string;
  status: 'pendiente' | 'confirmada' | 'cancelada';
  created_at: Date;
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

export interface UpdateStatusDTO {
  status: 'pendiente' | 'confirmada' | 'cancelada';
}