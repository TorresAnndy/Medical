import { useState, useEffect } from 'react';
import type { Appointment, CreateAppointmentDTO } from '../types/appointment';

interface Doctor {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Props {
  onSubmit: (data: CreateAppointmentDTO) => Promise<void>;
  onCancel: () => void;
  initialData?: Appointment | null;
  loading?: boolean;
  doctors: Doctor[];
}

const AppointmentForm = ({
  onSubmit,
  onCancel,
  initialData,
  loading,
  doctors
}: Props) => {
  const [form, setForm] = useState<CreateAppointmentDTO>({
    patient_name: '',
    doctor_name: '',
    appointment_date: '',
    reason: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        patient_name: initialData.patient_name,
        doctor_name: initialData.doctor_name,
        appointment_date: initialData.appointment_date.slice(0, 16),
        reason: initialData.reason,
      });
    } else {
      setForm({
        patient_name: '',
        doctor_name: '',
        appointment_date: '',
        reason: '',
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    background: '#fff',
  };

  const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '4px',
    display: 'block',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      <div>
        <label style={labelStyle}>Nombre del paciente</label>
        <input
          style={inputStyle}
          name="patient_name"
          value={form.patient_name}
          onChange={handleChange}
          placeholder="Ej: Juan Pérez"
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Doctor asignado</label>
        <select
          style={inputStyle}
          name="doctor_name"
          value={form.doctor_name}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>

        {doctors.length === 0 && (
          <p style={{
            marginTop: '6px',
            fontSize: '0.8rem',
            color: '#DC2626'
          }}>
            No hay doctores disponibles en el sistema.
          </p>
        )}
      </div>

      <div>
        <label style={labelStyle}>Fecha y hora de la cita</label>
        <input
          style={inputStyle}
          type="datetime-local"
          name="appointment_date"
          value={form.appointment_date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Motivo de la cita</label>
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Ej: Consulta general, dolor de cabeza..."
          required
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
        <button
          type="submit"
          disabled={loading || doctors.length === 0}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            background: loading || doctors.length === 0 ? '#93C5FD' : '#2563EB',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: loading || doctors.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Guardando...' : initialData ? 'Actualizar cita' : 'Crear cita'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #D1D5DB',
            background: '#F9FAFB',
            color: '#374151',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
      </div>

    </form>
  );
};

export default AppointmentForm;