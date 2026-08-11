import * as fs from 'fs';
import * as path from 'path';
import { createLogger, transports, format } from 'winston';

const logDir = 'logs'; // directory for log files

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const maxSize = '20m'; // maximum size of each log file
const maxFiles = '14d'; // retain logs for 14 days

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.File({
            filename: path.join(logDir, 'application.log'),
            maxsize: maxSize,
            maxFiles: maxFiles,
            tailable: true,
            level: 'info',
        }),
        new transports.Console({
            format: format.simple(),
            level: 'debug',
        }),
    ],
});

export default logger;