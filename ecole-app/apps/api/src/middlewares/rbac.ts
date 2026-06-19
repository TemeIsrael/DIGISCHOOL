import { Request, Response, NextFunction } from 'express';

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'Access denied: insufficient permissions'
        }
      });
      return;
    }

    next();
  };
};

export const requireAdminType = (allowedTypes: number[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== 'ADMIN') {
      res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'Access denied: administrator account required'
        }
      });
      return;
    }

    if (req.user.typeAdmin === undefined || !allowedTypes.includes(req.user.typeAdmin)) {
      res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'Access denied: this administrator type lacks permission'
        }
      });
      return;
    }

    next();
  };
};
