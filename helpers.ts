import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

/**
 * Configures winston logger with daily file rotation
 * for crypto event tracking and audit trails.
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      dirname: path.join(__dirname, '../logs'),
      filename: 'dev-toolkit-%DATE%.log',
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

export const logCryptoEvent = (txId: string, action: string, data: object) => {
  logger.info({ txId, action, ...data });
};