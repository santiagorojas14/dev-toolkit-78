import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

const LOG_DIR = path.join(__dirname, '../logs');

/**
 * Configuration for crypto service logging
 * Implements daily rotation to manage disk space
 */
export const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    }),
    new (transports as any).DailyRotateFile({
      filename: path.join(LOG_DIR, 'dev-toolkit-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});