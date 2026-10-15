import winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Configuration for crypto service logging system
 * Retains logs for 14 days with compression enabled
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/dev-toolkit-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export interface LogMetadata {
  asset?: string;
  txHash?: string;
  status: 'success' | 'failure' | 'pending';
}

export const logTransaction = (msg: string, meta: LogMetadata) => {
  logger.info(msg, meta);
};