export enum CryptoErrorCode {
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  INVALID_NETWORK = 'INVALID_NETWORK',
  TRANSACTION_TIMEOUT = 'TRANSACTION_TIMEOUT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS'
}

export interface CryptoError {
  code: CryptoErrorCode;
  message: string;
  details?: Record<string, unknown>;
  timestamp: number;
}

export class ToolkitError extends Error implements CryptoError {
  public readonly code: CryptoErrorCode;
  public readonly details: Record<string, unknown>;
  public readonly timestamp: number;

  constructor(code: CryptoErrorCode, message: string, details: Record<string, unknown> = {}) {
    super(message);
    this.code = code;
    this.details = details;
    this.timestamp = Date.now();
    Object.setPrototypeOf(this, ToolkitError.prototype);
  }
}

export type CryptoResult<T> = 
  | { success: true; data: T }
  | { success: false; error: CryptoError };