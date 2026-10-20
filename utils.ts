import * as fs from 'fs';
import * as path from 'path';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes?: number;
  maxFiles?: number;
  prefix?: string;
}

export class CryptoLogger {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private currentFile: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes ?? 5 * 1024 * 1024;
    this.maxFiles = options.maxFiles ?? 5;
    const prefix = options.prefix ?? 'crypto-toolkit';

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    this.currentFile = path.join(this.logDir, `${prefix}-current.log`);
  }

  private rotateIfNeeded(): void {
    if (!fs.existsSync(this.currentFile)) return;

    const stats = fs.statSync(this.currentFile);
    if (stats.size < this.maxSizeBytes) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldPath = `${this.currentFile}.${i}`;
      const newPath = `${this.currentFile}.${i + 1}`;
      if (fs.existsSync(oldPath)) {
        if (i + 1 > this.maxFiles) {
          fs.unlinkSync(oldPath);
        } else {
          fs.renameSync(oldPath, newPath);
        }
      }
    }

    fs.renameSync(this.currentFile, `${this.currentFile}.1`);
  }

  public log(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
    this.rotateIfNeeded();
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
    const entry = `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}\n`;

    fs.appendFileSync(this.currentFile, entry, { encoding: 'utf8' });
  }

  public info(msg: string, meta?: Record<string, unknown>): void {
    this.log('info', msg, meta);
  }

  public error(msg: string, meta?: Record<string, unknown>): void {
    this.log('error', msg, meta);
  }

  public logTx(txHash: string, status: 'pending' | 'confirmed' | 'failed', meta?: Record<string, unknown>): void {
    this.log('info', `[TX ${status.toUpperCase()}] ${txHash}`, meta);
  }
}