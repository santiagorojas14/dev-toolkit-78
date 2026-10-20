import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes?: number;
  maxFiles?: number;
  prefix?: string;
}

export class RotatingLogger {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private prefix: string;
  private currentFile: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes || 5 * 1024 * 1024; // 5MB default
    this.maxFiles = options.maxFiles || 5;
    this.prefix = options.prefix || 'crypto-toolkit';

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    this.currentFile = path.join(this.logDir, `${this.prefix}-current.log`);
  }

  /** Rotates log files when current log exceeds size threshold */
  private rotate(): void {
    if (!fs.existsSync(this.currentFile)) return;

    const stats = fs.statSync(this.currentFile);
    if (stats.size < this.maxSizeBytes) return;

    const oldestLog = path.join(this.logDir, `${this.prefix}-${this.maxFiles}.log`);
    if (fs.existsSync(oldestLog)) {
      fs.unlinkSync(oldestLog);
    }

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const src = path.join(this.logDir, `${this.prefix}-${i}.log`);
      const dest = path.join(this.logDir, `${this.prefix}-${i + 1}.log`);
      if (fs.existsSync(src)) {
        fs.renameSync(src, dest);
      }
    }

    fs.renameSync(this.currentFile, path.join(this.logDir, `${this.prefix}-1.log`));
  }

  /** Writes formatted entry to active log file and console output */
  public log(level: 'INFO' | 'WARN' | 'ERROR' | 'TX', message: string, data?: unknown): void {
    this.rotate();

    const timestamp = new Date().toISOString();
    const payload = data ? ` | ${JSON.stringify(data)}` : '';
    const entry = `[${timestamp}] [${level}] ${message}${payload}\n`;

    fs.appendFileSync(this.currentFile, entry, 'utf-8');
    process.stdout.write(entry);
  }

  public tx(hash: string, details?: unknown): void {
    this.log('TX', `Transaction hash: ${hash}`, details);
  }
}
