import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';

/**
 * Configuration for dev-toolkit-78 logging system
 * Rotates files daily and retains 14 days of history
 */
export const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    }),
    new (transports as any).DailyRotateFile({
      filename: 'logs/crypto-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

// Usage example for crypto operations
export const logTrade = (pair: string, amount: number) => {
  logger.info('Trade executed', { pair, amount, timestamp: new Date().toISOString() });
};