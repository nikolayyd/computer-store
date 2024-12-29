import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils'; 

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    verifyToken(token);
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid key' });
  }
}