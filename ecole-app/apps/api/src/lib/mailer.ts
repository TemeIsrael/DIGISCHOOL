import { logger } from './logger';

export const sendInternalMail = async (
  toEmail: string,
  subject: string,
  content: string
): Promise<boolean> => {
  logger.info(`[Mailer] Simulating internal mail send to ${toEmail}. Subject: "${subject}". Content length: ${content.length} chars.`);
  // Stub resolving successfully
  return true;
};
