import * as winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Crypto service logger configuration
 * rotating logs daily for audit compliance
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
      filename: 'logs/dev-toolkit-78-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export interface LogMetadata {
  txHash?: string;
  network?: 'mainnet' | 'testnet';
  errorCode?: number;
}

export const logError = (message: string, meta: LogMetadata) => {
  logger.error(message, meta);
};