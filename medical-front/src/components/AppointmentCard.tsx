import type { Appointment } from '../types/appointment';
import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/date.utils';

interface Props {
  appointment: Appointment;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: 'pendiente' | 'confirmada' | 'cancelada') => void;
  onViewDetail: (id: string) => void;
  onEdit: (appointment: Appointment) => void;
}

const AppointmentCard = ({
  appointment,
  onDelete,
  onStatusChange,
  onViewDetail,
  onEdit,
}: Props) => {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', color: '#111827' }}>
          👤 {appointment.patient_name}
        </h3>
        <StatusBadge status={appointment.status} />
      </div>

      {/* Info */}
      <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>
        🩺 <strong>Doctor:</strong> {appointment.doctor_name}
      </p>
      <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>
        📅 <strong>Fecha:</strong> {formatDate(appointment.appointment_date)}
      </p>
      <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>
        📝 <strong>Motivo:</strong> {appointment.reason}
      </p>

      {/* Cambiar estado */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {(['pendiente', 'confirmada', 'cancelada'] as const).map((s) => (
          <button
            key={s}
            disabled={appointment.status === s}
            onClick={() => onStatusChange(appointment.id, s)}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              background: appointment.status === s ? '#F3F4F6' : '#fff',
              color: appointment.status === s ? '#9CA3AF' : '#374151',
              cursor: appointment.status === s ? 'not-allowed' : 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Acciones */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <button
          onClick={() => onViewDetail(appointment.id)}
          style={{
            flex: 1, padding: '8px', borderRadius: '8px',
            border: '1px solid #3B82F6', background: '#EFF6FF',
            color: '#1D4ED8', cursor: 'pointer', fontSize: '0.8rem',
          }}
        >
          Ver detalle
        </button>
        <button
          onClick={() => onEdit(appointment)}
          style={{
            flex: 1, padding: '8px', borderRadius: '8px',
            border: '1px solid #8B5CF6', background: '#F5F3FF',
            color: '#6D28D9', cursor: 'pointer', fontSize: '0.8rem',
          }}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(appointment.id)}
          style={{
            flex: 1, padding: '8px', borderRadius: '8px',
            border: '1px solid #EF4444', background: '#FEF2F2',
            color: '#DC2626', cursor: 'pointer', fontSize: '0.8rem',
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;