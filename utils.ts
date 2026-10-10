import * as fs from 'fs';
import * as path from 'path';

export interface LoggerConfig {
  logDir: string;
  maxSizeBytes: number;
  maxFiles: number;
  prefix?: string;
}

export class RotatingLogger {
  private currentFile: string;
  private currentSize: number = 0;
  private stream: fs.WriteStream | null = null;
  private prefix: string;

  constructor(private config: LoggerConfig) {
    this.prefix = config.prefix || 'crypto-toolkit';
    if (!fs.existsSync(config.logDir)) {
      fs.mkdirSync(config.logDir, { recursive: true });
    }
    this.currentFile = path.join(config.logDir, `${this.prefix}-active.log`);
    this.initStream();
  }

  private initStream(): void {
    if (fs.existsSync(this.currentFile)) {
      const stats = fs.statSync(this.currentFile);
      this.currentSize = stats.size;
    } else {
      this.currentSize = 0;
    }
    this.stream = fs.createWriteStream(this.currentFile, { flags: 'a' });
  }

  private rotate(): void {
    if (this.stream) {
      this.stream.end();
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archivedPath = path.join(this.config.logDir, `${this.prefix}-${timestamp}.log`);

    if (fs.existsSync(this.currentFile)) {
      fs.renameSync(this.currentFile, archivedPath);
    }

    this.pruneOldLogs();
    this.initStream();
  }

  private pruneOldLogs(): void {
    const files = fs.readdirSync(this.config.logDir)
      .filter(file => file.startsWith(this.prefix) && file.endsWith('.log'))
      .map(file => path.join(this.config.logDir, file))
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);

    if (files.length > this.config.maxFiles) {
      files.slice(this.config.maxFiles).forEach(file => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });
    }
  }

  public log(level: 'INFO' | 'WARN' | 'ERROR', message: string, meta?: Record<string, unknown>): void {
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...meta,
    }) + '\n';

    const entrySize = Buffer.byteLength(entry, 'utf8');
    if (this.currentSize + entrySize >= this.config.maxSizeBytes) {
      this.rotate();
    }

    if (this.stream) {
      this.stream.write(entry);
      this.currentSize += entrySize;
    }
  }
}