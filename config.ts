import { createLogger, format, transports } from 'winston';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

const logFormat = format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
            options: { flags: 'a' },
        }),
        new transports.File({
            filename: 'logs/combined.log',
            options: { flags: 'a' },
        })
    ]
});

export default logger;