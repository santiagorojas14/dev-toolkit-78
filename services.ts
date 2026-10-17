import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

/**
 * dev-toolkit-78 logger configuration for crypto operations
 * rotation enabled to prevent disk bloat on validator nodes
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
      filename: path.join(__dirname, '../logs/crypto-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export const logTransaction = (hash: string, status: string) => {
  logger.info('transaction_event', { hash, status, network: 'mainnet' });
};