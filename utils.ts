import * as winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Configure logger with daily rotation for crypto services
 * Retains logs for 14 days and limits size to 20MB per file
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
      dirname: 'logs',
      filename: 'dev-toolkit-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export interface LogMetadata {
  asset?: string;
  txHash?: string;
  status: 'pending' | 'success' | 'failed';
  [key: string]: any;
}