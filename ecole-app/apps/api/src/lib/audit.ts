import { logger } from './logger';

export const logAction = (
  userId: number | string,
  action: string,
  resource: string,
  ip: string,
  details?: any
) => {
  logger.info(`[AuditTrail] User: ${userId} - Action: ${action} - Resource: ${resource} - IP: ${ip}`, {
    userId,
    action,
    resource,
    ip,
    details,
    timestamp: new Date()
  });
};
