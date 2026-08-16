import fs from 'fs';
import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';

const logDirectory = path.join(__dirname, 'logs');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const transport = new winston.transports.DailyRotateFile({
    filename: path.join(logDirectory, '%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    prepend: true,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        transport,
        new winston.transports.Console(),
    ],
});

export default logger;
