import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Appointment } from '../types/appointment';
import { getAppointmentById } from '../services/appointment.service';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/date.utils';
import toast from 'react-hot-toast';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!id) return;
        const data = await getAppointmentById(id);
        setAppointment(data);
      } catch {
        toast.error('No se encontró la cita');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, navigate]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '64px', color: '#6B7280' }}>
      ⏳ Cargando detalle...
    </div>
  );

  if (!appointment) return null;

  const rowStyle = {
    display: 'flex', flexDirection: 'column' as const,
    gap: '4px', padding: '16px 0',
    borderBottom: '1px solid #F3F4F6',
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 16px' }}>

      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: '20px', padding: '8px 14px', borderRadius: '8px',
          border: '1px solid #D1D5DB', background: '#F9FAFB',
          color: '#374151', cursor: 'pointer', fontSize: '0.85rem',
        }}
      >
        ← Volver
      </button>

      <div style={{
        background: '#fff', borderRadius: '16px',
        border: '1px solid #E5E7EB', padding: '28px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#111827' }}>
            Detalle de la cita
          </h2>
          <StatusBadge status={appointment.status} />
        </div>

        <div style={rowStyle}>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' }}>Paciente</span>
          <span style={{ fontSize: '1rem', color: '#111827' }}>👤 {appointment.patient_name}</span>
        </div>

        <div style={rowStyle}>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' }}>Doctor</span>
          <span style={{ fontSize: '1rem', color: '#111827' }}>🩺 {appointment.doctor_name}</span>
        </div>

        <div style={rowStyle}>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' }}>Fecha y hora</span>
          <span style={{ fontSize: '1rem', color: '#111827' }}>📅 {formatDate(appointment.appointment_date)}</span>
        </div>

        <div style={rowStyle}>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' }}>Motivo</span>
          <span style={{ fontSize: '1rem', color: '#111827' }}>📝 {appointment.reason}</span>
        </div>

        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' }}>Creada el</span>
          <span style={{ fontSize: '0.9rem', color: '#6B7280' }}>🕐 {formatDate(appointment.created_at)}</span>
        </div>
      </div>

    </div>
  );
};

export default DetailPage;