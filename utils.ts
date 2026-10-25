import winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Crypto-focused logger setup for dev-toolkit-78
 * Implements daily rotation to manage disk space
 */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: 'logs/toolkit-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export interface LogMetadata {
  asset?: string;
  txHash?: string;
  status?: 'success' | 'failure';
  [key: string]: any;
}

export const logTrade = (message: string, meta: LogMetadata) => {
  logger.info(message, meta);
};