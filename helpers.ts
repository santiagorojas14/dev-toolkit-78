import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

const logDirectory = process.env.LOG_DIR || 'logs';

/**
 * Configures a rotating file logger for crypto operation audits
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
      filename: path.join(logDirectory, 'dev-toolkit-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export interface LogMeta {
  txHash?: string;
  asset?: string;
  code?: number;
}

export const logInfo = (message: string, meta?: LogMeta) => {
  logger.info(message, meta);
};

export const logError = (message: string, error?: unknown, meta?: LogMeta) => {
  logger.error(message, { ...meta, error: String(error) });
};