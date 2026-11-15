import * as winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Configure centralized logger for dev-toolkit-78
 * Uses daily rotation to manage crypto node log growth
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
      filename: 'logs/crypto-%DATE%.log',
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
  component: string;
}

export const logEvent = (message: string, meta: LogMetadata) => {
  logger.info(message, meta);
};