import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../hooks/useAppointments';
import { createAppointment, updateAppointment } from '../services/appointment.service';
import type { Appointment, CreateAppointmentDTO } from '../types/appointment';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentForm from '../components/AppointmentForm';
import toast from 'react-hot-toast';
import {
  getRole,
  getUserName,
  canCreateAppointment,
  canEditAppointment,
} from '../utils/auth';
import { getDoctorsRequest } from '../services/auth.service';

interface DoctorOption {
  id: string;
  name: string;
  email: string;
}

const HomePage = () => {
  const navigate = useNavigate();

  const {
    appointments,
    loading,
    removeAppointment,
    changeStatus,
    fetchAppointments
  } = useAppointments();

  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [doctors, setDoctors] = useState<DoctorOption[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  const role = getRole();
  const userName = getUserName();

  const roleLabel =
    role === 'admin'
      ? 'Administrador'
      : role === 'doctor'
        ? 'Doctor'
        : role === 'patient'
          ? 'Paciente'
          : 'Usuario';

  useEffect(() => {
    if (canCreateAppointment()) {
      fetchDoctors();
    }
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const response = await getDoctorsRequest();

      const doctorsData = response?.data?.data || response?.data || [];
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error al obtener doctores:', error);
      toast.error('No se pudieron cargar los doctores');
    } finally {
      setLoadingDoctors(false);
    }
  };

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
    if (!canEditAppointment()) {
      toast.error('No tienes permisos para editar citas');
      return;
    }

    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleOpenCreate = async () => {
    setEditingAppointment(null);

    if (canCreateAppointment() && doctors.length === 0) {
      await fetchDoctors();
    }

    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAppointment(null);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>
            🏥{' '}
            {role === 'admin'
              ? 'Panel de Administración'
              : role === 'doctor'
                ? 'Panel Médico'
                : 'Mis Citas'}
          </h1>

          <p style={{ margin: '6px 0 0', color: '#6B7280', fontSize: '0.92rem' }}>
            👤 <strong>{userName || 'Usuario'}</strong> · Rol:{' '}
            <strong>{roleLabel}</strong>
          </p>

          <p style={{ margin: '4px 0 0', color: '#6B7280', fontSize: '0.875rem' }}>
            {appointments.length} cita{appointments.length !== 1 ? 's' : ''}{' '}
            registrada{appointments.length !== 1 ? 's' : ''}
          </p>
        </div>

        {canCreateAppointment() && (
          <button
            onClick={handleOpenCreate}
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

      <div
        style={{
          background: 'linear-gradient(135deg, #DBEAFE, #EFF6FF)',
          border: '1px solid #BFDBFE',
          borderRadius: '18px',
          padding: '24px',
          marginBottom: '28px',
          boxShadow: '0 10px 30px rgba(37, 99, 235, 0.08)',
        }}
      >
        <h2
          style={{
            margin: '0 0 10px',
            fontSize: '1.15rem',
            color: '#1E3A8A',
          }}
        >
          {role === 'admin'
            ? '📊 Control total del sistema'
            : role === 'doctor'
              ? '🩺 Gestión médica de citas'
              : '📅 Gestiona tus citas fácilmente'}
        </h2>

        <p
          style={{
            margin: 0,
            color: '#374151',
            lineHeight: 1.7,
            fontSize: '0.95rem',
            maxWidth: '700px',
          }}
        >
          {role === 'admin' && (
            <>
              Como <strong>Administrador</strong>, puedes supervisar todas las
              citas, actualizar su estado, editar información y administrar el
              flujo general del sistema.
            </>
          )}

          {role === 'doctor' && (
            <>
              Como <strong>Doctor</strong>, puedes revisar las citas agendadas,
              actualizar su estado y editar la información necesaria para la
              atención médica.
            </>
          )}

          {role === 'patient' && (
            <>
              Como <strong>Paciente</strong>, puedes agendar tus citas médicas
              de forma rápida y organizada desde este panel.
            </>
          )}
        </p>
      </div>

      {showForm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '28px',
              width: '100%',
              maxWidth: '520px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            <h2
              style={{
                margin: '0 0 20px',
                fontSize: '1.1rem',
                color: '#111827',
              }}
            >
              {editingAppointment ? '✏️ Editar cita' : '➕ Nueva cita'}
            </h2>

            <AppointmentForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingAppointment}
              loading={formLoading || loadingDoctors}
              doctors={doctors}
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
        <div
          style={{
            textAlign: 'center',
            padding: '64px 16px',
            color: '#9CA3AF',
            border: '2px dashed #E5E7EB',
            borderRadius: '16px',
          }}
        >
          <p style={{ fontSize: '2rem', margin: '0 0 8px' }}>📭</p>

          <p style={{ margin: 0 }}>
            {role === 'admin'
              ? 'No hay citas registradas en el sistema'
              : role === 'doctor'
                ? 'No hay citas asignadas o registradas aún'
                : 'No tienes citas registradas aún'}
          </p>

          {canCreateAppointment() && (
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>
              Haz clic en "Nueva cita" para comenzar
            </p>
          )}
        </div>
      )}

      {!loading && appointments.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
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