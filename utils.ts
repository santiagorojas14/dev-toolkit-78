import winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Crypto-focused logger setup for dev-toolkit-78
 * Rotates daily and keeps logs for 14 days
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
      filename: 'logs/crypto-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export const logMarketEvent = (action: string, data: Record<string, any>) => {
  logger.info(`market_event: ${action}`, { ...data });
};

export const logError = (error: Error, context: string) => {
  logger.error(`critical_failure: ${context}`, {
    message: error.message,
    stack: error.stack
  });
};