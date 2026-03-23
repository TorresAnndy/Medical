import { useState, useEffect, useCallback } from 'react';
import type { Appointment } from '../types/appointment';
import {
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} from '../services/appointment.service';
import toast from 'react-hot-toast';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Error al cargar las citas');
      toast.error('Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAppointment = async (id: string) => {
    try {
      await deleteAppointment(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      toast.success('Cita eliminada correctamente');
    } catch (err) {
      toast.error('Error al eliminar la cita');
    }
  };

  const changeStatus = async (
    id: string,
    status: 'pendiente' | 'confirmada' | 'cancelada'
  ) => {
    try {
      const updated = await updateAppointmentStatus(id, status);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? updated : a))
      );
      toast.success(`Estado actualizado a "${status}"`);
    } catch (err) {
      toast.error('Error al actualizar el estado');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    removeAppointment,
    changeStatus,
  };
};