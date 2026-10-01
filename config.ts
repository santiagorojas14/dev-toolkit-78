import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

/**
 * Logging configuration for dev-toolkit-78
 * Uses daily rotation to manage disk space for crypto node logs
 */
const logDirectory = path.join(__dirname, '../logs');

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(logDirectory, 'toolkit-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info'
});

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    transport,
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});