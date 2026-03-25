import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
} from '../controllers/appointment.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();


const appointmentValidations = [
  body('patient_name')
    .notEmpty().withMessage('El nombre del paciente es obligatorio').trim(),
  body('doctor_name')
    .notEmpty().withMessage('El nombre del doctor es obligatorio').trim(),
  body('appointment_date')
    .notEmpty().withMessage('La fecha de la cita es obligatoria')
    .isISO8601().withMessage('La fecha debe tener formato ISO 8601 (ej: 2025-05-10T14:30:00)'),
  body('reason')
    .notEmpty().withMessage('El motivo de la cita es obligatorio').trim(),
];

const uuidValidation = [
  param('id').isUUID().withMessage('El ID debe ser un UUID valido'),
];

const statusValidation = [
  body('status')
    .notEmpty().withMessage('El estado es obligatorio')
    .isIn(['pendiente', 'confirmada', 'cancelada'])
    .withMessage('El estado debe ser: pendiente, confirmada o cancelada'),
];

router.get('/', getAppointments);
router.get('/:id', uuidValidation, authMiddleware,validateRequest, getAppointmentById);
router.post('/', appointmentValidations, validateRequest, createAppointment);
router.put('/:id', [...uuidValidation], authMiddleware, validateRequest, updateAppointment);
router.delete('/:id', uuidValidation, authMiddleware, validateRequest, deleteAppointment);
router.patch('/:id/status', [...uuidValidation, ...statusValidation], authMiddleware, validateRequest, updateAppointmentStatus);

export default router;