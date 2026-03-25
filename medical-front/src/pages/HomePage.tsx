import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../hooks/useAppointments';
import { createAppointment, updateAppointment } from '../services/appointment.service';
import { getMeRequest } from '../services/auth.service';
import type { Appointment, CreateAppointmentDTO } from '../types/appointment';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentForm from '../components/AppointmentForm';
import toast from 'react-hot-toast';
import { isAdmin, getUserRole } from '../utils/auth';

const HomePage = () => {
  const navigate = useNavigate();

  const {
    appointments,
    loading,
    removeAppointment,
    changeStatus,
    fetchAppointments
  } = useAppointments();

  const [user, setUser] = useState<any>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMeRequest();
        setUser(res.data.data);
      } catch (error) {
        console.error('Error al obtener usuario');
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (data: CreateAppointmentDTO) => {
    setFormLoading(true);
    try {
      if (editingAppointment) {
        await updateAppointment(editingAppointment.id, data);
        toast.success('Cita actualizada correctamente');
      } else {
        await createAppointment(data);
        toast.success('Cita creada correctamente');
      }

      setShowForm(false);
      setEditingAppointment(null);
      fetchAppointments();

    } catch (error) {
      toast.error('Error al guardar la cita');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAppointment(null);
  };

  const role = getUserRole();

  const roleStyles: any = {
    admin: { bg: '#FEE2E2', color: '#B91C1C', label: 'Admin' },
    doctor: { bg: '#DCFCE7', color: '#166534', label: 'Doctor' },
    patient: { bg: '#E0E7FF', color: '#1D4ED8', label: 'Paciente' },
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>

        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>
            🏥 {isAdmin() ? 'Panel de Administración' : 'Mis Citas'}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '6px'
          }}>
            <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
              👤 {user?.name || 'Usuario'}
            </span>

            <span style={{
              background: roleStyles[role]?.bg,
              color: roleStyles[role]?.color,
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 600
            }}>
              {roleStyles[role]?.label}
            </span>
          </div>

          <p style={{ margin: '4px 0 0', color: '#6B7280', fontSize: '0.875rem' }}>
            {appointments.length} cita{appointments.length !== 1 ? 's' : ''} registrada{appointments.length !== 1 ? 's' : ''}
          </p>
        </div>

        {!isAdmin() && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              background: '#2563EB',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            + Nueva cita
          </button>
        )}
      </div>

      {showForm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '16px',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '28px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '1.1rem', color: '#111827' }}>
              {editingAppointment ? '✏️ Editar cita' : '➕ Nueva cita'}
            </h2>

            <AppointmentForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingAppointment}
              loading={formLoading}
            />
          </div>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '48px', color: '#6B7280' }}>
          ⏳ Cargando citas...
        </div>
      )}

      {!loading && appointments.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '64px 16px',
          color: '#9CA3AF',
          border: '2px dashed #E5E7EB',
          borderRadius: '16px',
        }}>
          <p style={{ fontSize: '2rem', margin: '0 0 8px' }}>📭</p>

          <p style={{ margin: 0 }}>
            {isAdmin()
              ? 'No hay citas registradas en el sistema'
              : 'No tienes citas registradas aún'}
          </p>

          {!isAdmin() && (
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>
              Haz clic en "Nueva cita" para comenzar
            </p>
          )}
        </div>
      )}

      {!loading && appointments.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onDelete={removeAppointment}
              onStatusChange={changeStatus}
              onViewDetail={(id) => navigate(`/appointments/${id}`)}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default HomePage;