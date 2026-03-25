import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    next();
  };
};