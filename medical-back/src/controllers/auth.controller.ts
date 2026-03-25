import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/connection';
import { sendSuccess, sendError } from '../utils/response.utils';
import { RegisterDTO, LoginDTO, JwtPayload, RoleName } from '../models/user.model';

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.name, u.email, r.name as role, u.created_at
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
    `);

    sendSuccess(res, result.rows, 'Usuarios obtenidos correctamente');
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    sendError(res, 'Error al obtener los usuarios', 500);
  }
};


export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password }: RegisterDTO = req.body;

  try {
    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existing.rowCount! > 0) {
      sendError(res, 'El email ya está registrado', 409);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(`
      INSERT INTO users (name, email, password, role_id)
      VALUES (
        $1, 
        $2, 
        $3, 
        (SELECT id FROM roles WHERE name = 'patient')
      )
      RETURNING id, name, email, created_at
    `, [name, email, hashedPassword]);

    const user = result.rows[0];

    sendSuccess(res, user, 'Usuario registrado correctamente', 201);

  } catch (error) {
    console.error('Error en registro:', error);
    sendError(res, 'Error al registrar el usuario', 500);
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: LoginDTO = req.body;

  try {
    const result = await pool.query(`
      SELECT u.*, r.name as role
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.email = $1
    `, [email]);

    if (result.rowCount === 0) {
      sendError(res, 'Credenciales incorrectas', 401);
      return;
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      sendError(res, 'Credenciales incorrectas', 401);
      return;
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role as RoleName
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      }
    );

    const { password: _, role_id, ...userPublic } = user;

    sendSuccess(
      res,
      { user: userPublic, token },
      'Inicio de sesión exitoso'
    );

  } catch (error) {
    console.error('Error en login:', error);
    sendError(res, 'Error al iniciar sesión', 500);
  }
};


export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const result = await pool.query(`
      SELECT u.id, u.name, u.email, r.name as role, u.created_at
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = $1
    `, [userId]);

    if (result.rowCount === 0) {
      sendError(res, 'Usuario no encontrado', 404);
      return;
    }

    sendSuccess(res, result.rows[0], 'Usuario obtenido correctamente');

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    sendError(res, 'Error al obtener el usuario', 500);
  }
};