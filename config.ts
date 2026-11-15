import winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Logging configuration for dev-toolkit-78
 * Rotates logs daily and keeps 14 days of history
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: 'logs/crypto-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export interface LogContext {
  txHash?: string;
  market?: string;
  error?: unknown;
}