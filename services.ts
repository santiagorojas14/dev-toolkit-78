import * as winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Logger configuration for crypto event monitoring
 * Uses daily file rotation to maintain disk health
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

export const logCryptoEvent = (event: string, meta: Record<string, any>) => {
  logger.info(event, { service: 'dev-toolkit-78', ...meta });
};