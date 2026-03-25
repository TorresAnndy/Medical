import { Router } from 'express';
import { body } from 'express-validator';
import {
    register,
    login,
    getMe,
    getUsers
} from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware'; // 🔥 IMPORTANTE

const router = Router();

const registerValidations = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio').trim(),
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email debe ser válido').normalizeEmail(),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const loginValidations = [
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email debe ser válido').normalizeEmail(),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria'),
];

//Publicas
router.post('/register', registerValidations, validateRequest, register);
router.post('/login', loginValidations, validateRequest, login);

//Protegidas
router.get('/me', authMiddleware, getMe);
router.get('/', authMiddleware, getUsers);

export default router;