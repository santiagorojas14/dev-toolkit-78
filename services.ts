import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

/**
 * logger setup for dev-toolkit-78 crypto services
 * rotates logs daily and keeps 14 days of history
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
      dirname: path.join(__dirname, '../logs'),
      filename: 'crypto-service-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export const logTransaction = (txHash: string, status: string) => {
  logger.info('transaction status updated', { txHash, status });
};