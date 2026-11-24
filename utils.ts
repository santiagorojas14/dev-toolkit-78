import winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Crypto-focused logger setup for dev-toolkit-78
 * Configured for daily rotation to manage disk I/O
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/toolkit-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

export interface LogMetadata {
  asset?: string;
  txHash?: string;
  status: 'pending' | 'success' | 'failed';
  latencyMs?: number;
}