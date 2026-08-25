import * as fs from 'fs';
import * as path from 'path';
type LogLevel = 'info' | 'warn' | 'error' | 'debug';
interface LoggerOptions {
  logDir?: string;
  maxFileSize?: number;
  maxFiles?: number;
}
// Logger with automatic rotation when file size limit is reached
class RotatingLogger {
  private currentLogPath: string;
  private options: Required<LoggerOptions>;
  constructor(options: LoggerOptions = {}) {
    this.options = {
      logDir: options.logDir || './logs',
      maxFileSize: options.maxFileSize || 5 * 1024 * 1024,
      maxFiles: options.maxFiles || 3
    };
    if (!fs.existsSync(this.options.logDir)) {
      fs.mkdirSync(this.options.logDir, { recursive: true });
    }
    this.currentLogPath = path.join(this.options.logDir, 'current.log');
  }
  private rotateLogs(): void {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '');
    const archivePath = path.join(this.options.logDir, `log-${timestamp}.log`);
    if (fs.existsSync(this.currentLogPath)) {
      fs.renameSync(this.currentLogPath, archivePath);
    }
    this.cleanupOldLogs();
  }
  private cleanupOldLogs(): void {
    // Keep only the most recent maxFiles archived logs
    const files = fs.readdirSync(this.options.logDir)
      .filter((file: string) => file.startsWith('log-') && file.endsWith('.log'))
      .map((file: string) => ({
        path: path.join(this.options.logDir, file),
        mtime: fs.statSync(path.join(this.options.logDir, file)).mtime.getTime()
      }))
      .sort((a, b) => b.mtime - a.mtime);
    while (files.length > this.options.maxFiles) {
      const oldest = files.pop();
      if (oldest) fs.unlinkSync(oldest.path);
    }
  }
  log(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level.toUpperCase()}] ${message}\n`;
    if (fs.existsSync(this.currentLogPath)) {
      const stats = fs.statSync(this.currentLogPath);
      if (stats.size >= this.options.maxFileSize) {
        this.rotateLogs();
      }
    }
    fs.appendFileSync(this.currentLogPath, logMessage);
  }
  info(message: string): void { this.log('info', message); }
  warn(message: string): void { this.log('warn', message); }
  error(message: string): void { this.log('error', message); }
}
export function createLogger(options?: LoggerOptions): RotatingLogger {
  return new RotatingLogger(options);
}
export const logger = createLogger();