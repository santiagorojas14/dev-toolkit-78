import winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Crypto service logger with daily rotation
 * Retains logs for 14 days to manage disk usage
 */
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
    new winston.transports.DailyRotateFile({
      filename: 'logs/dev-toolkit-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export const logTransaction = (txHash: string, status: string): void => {
  logger.info('transaction_update', { txHash, status, timestamp: new Date().toISOString() });
};