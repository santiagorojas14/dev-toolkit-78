import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

const logDirectory = 'logs';

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(logDirectory, 'dev-toolkit-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info'
});

/**
 * Logger instance for crypto toolkit operations
 */
export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    transport,
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Log uncaught exceptions to file
logger.exceptions.handle(
  new winston.transports.File({ filename: path.join(logDirectory, 'exceptions.log') })
);