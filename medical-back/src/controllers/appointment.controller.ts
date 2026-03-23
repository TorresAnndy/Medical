import { Request, Response } from 'express';
import pool from '../db/connection';
import { sendSuccess, sendError } from '../utils/response.utils';
import {
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
  UpdateStatusDTO,
} from '../models/appointment.model';

export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      'SELECT * FROM appointments ORDER BY appointment_date ASC'
    );
    sendSuccess(res, result.rows, 'Citas obtenidas correctamente');
  } catch (error) {
    console.error('Error al obtener citas:', error);
    sendError(res, 'Error al obtener las citas', 500);
  }
};

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM appointments WHERE id = $1', [id]
    );

    if (result.rowCount === 0) {
      sendError(res, 'Cita no encontrada', 404);
      return;
    }

    sendSuccess(res, result.rows[0], 'Cita obtenida correctamente');
  } catch (error) {
    console.error('Error al obtener la cita:', error);
    sendError(res, 'Error al obtener la cita', 500);
  }
};

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  const { patient_name, doctor_name, appointment_date, reason }: CreateAppointmentDTO = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO appointments (patient_name, doctor_name, appointment_date, reason)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [patient_name, doctor_name, appointment_date, reason]
    );

    sendSuccess(res, result.rows[0], 'Cita creada correctamente', 201);
  } catch (error) {
    console.error('Error al crear la cita:', error);
    sendError(res, 'Error al crear la cita', 500);
  }
};

export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { patient_name, doctor_name, appointment_date, reason, status }: UpdateAppointmentDTO = req.body;

  try {
    const existing = await pool.query(
      'SELECT id FROM appointments WHERE id = $1', [id]
    );
    if (existing.rowCount === 0) {
      sendError(res, 'Cita no encontrada', 404);
      return;
    }

    const result = await pool.query(
      `UPDATE appointments
       SET patient_name      = COALESCE($1, patient_name),
           doctor_name       = COALESCE($2, doctor_name),
           appointment_date  = COALESCE($3, appointment_date),
           reason            = COALESCE($4, reason),
           status            = COALESCE($5, status)
       WHERE id = $6
       RETURNING *`,
      [patient_name, doctor_name, appointment_date, reason, status, id]
    );

    sendSuccess(res, result.rows[0], 'Cita actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    sendError(res, 'Error al actualizar la cita', 500);
  }
};

export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM appointments WHERE id = $1 RETURNING id', [id]
    );

    if (result.rowCount === 0) {
      sendError(res, 'Cita no encontrada', 404);
      return;
    }

    sendSuccess(res, { id }, 'Cita eliminada correctamente');
  } catch (error) {
    console.error('Error al eliminar la cita:', error);
    sendError(res, 'Error al eliminar la cita', 500);
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status }: UpdateStatusDTO = req.body;

  try {
    const result = await pool.query(
      `UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rowCount === 0) {
      sendError(res, 'Cita no encontrada', 404);
      return;
    }

    sendSuccess(res, result.rows[0], `Estado actualizado a "${status}"`);
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    sendError(res, 'Error al actualizar el estado', 500);
  }
};