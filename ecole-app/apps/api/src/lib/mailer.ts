import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from './logger';

/**
 * Creates a configured nodemailer transporter.
 * Uses Ethereal Email for development/testing if real SMTP config isn't provided.
 */
const createTransporter = async () => {
  // Use environment variables if they are configured
  if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT) || 587,
      secure: Number(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  // Fallback for development: Use a test account
  logger.info('No SMTP config found. Generating Ethereal test account...');
  const testAccount = await nodemailer.createTestAccount();
  
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
};

export const sendInternalMail = async (
  toEmail: string,
  subject: string,
  content: string
): Promise<boolean> => {
  try {
    const transporter = await createTransporter();
    
    const info = await transporter.sendMail({
      from: '"DIGISCHOOL" <no-reply@digischool.cm>', // sender address
      to: toEmail, // list of receivers
      subject, // Subject line
      html: content, // html body
    });

    logger.info(`Message sent: ${info.messageId}`);
    
    // Preview only available when sending through an Ethereal account
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      logger.info(`Email Preview URL: ${previewUrl}`);
    }
    
    return true;
  } catch (error) {
    logger.error('Error sending email:', error);
    return false;
  }
};
