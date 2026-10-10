import winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Logging configuration for dev-toolkit-78.
 * Implements daily rotation to manage disk space
 * for high-frequency crypto trading logs.
 */
const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/crypto-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info'
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    transport
  ]
});