import fs from 'fs';
import path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes: number;
  maxFiles: number;
}

export class RotatingLogger {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes;
    this.maxFiles = options.maxFiles;
    this.currentFilePath = path.join(this.logDir, 'crypto-toolkit.log');

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotateLogs(): void {
    if (!fs.existsSync(this.currentFilePath)) return;

    const stats = fs.statSync(this.currentFilePath);
    if (stats.size < this.maxSizeBytes) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldFile = path.join(this.logDir, `crypto-toolkit.${i}.log`);
      const newFile = path.join(this.logDir, `crypto-toolkit.${i + 1}.log`);

      if (fs.existsSync(oldFile)) {
        if (i + 1 > this.maxFiles) {
          fs.unlinkSync(oldFile);
        } else {
          fs.renameSync(oldFile, newFile);
        }
      }
    }

    const backupPath = path.join(this.logDir, 'crypto-toolkit.1.log');
    fs.renameSync(this.currentFilePath, backupPath);
  }

  public log(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
    this.rotateLogs();
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [${level}] [crypto-sdk] ${message}\n`;
    fs.appendFileSync(this.currentFilePath, entry, 'utf-8');
  }
}

export const defaultLoggerConfig: LoggerOptions = {
  logDir: './logs',
  maxSizeBytes: 5 * 1024 * 1024,
  maxFiles: 5,
};