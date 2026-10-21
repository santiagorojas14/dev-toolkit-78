import winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * logger configuration for crypto operations
 * daily rotation keeps logs manageable for audit
 */
const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/dev-toolkit-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

export const logger = winston.createLogger({
  level: 'info',
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