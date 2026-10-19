export enum CryptoErrorCode {
  INVALID_ADDRESS = 'INVALID_ADDRESS',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface CryptoError extends Error {
  code: CryptoErrorCode;
  details?: Record<string, unknown>;
  retryable: boolean;
}

export class ToolkitError extends Error implements CryptoError {
  public readonly code: CryptoErrorCode;
  public readonly retryable: boolean;
  public readonly details?: Record<string, unknown>;

  constructor(message: string, code: CryptoErrorCode, details?: Record<string, unknown>) {
    super(message);
    this.name = 'ToolkitError';
    this.code = code;
    this.details = details;
    this.retryable = [CryptoErrorCode.NETWORK_TIMEOUT, CryptoErrorCode.RATE_LIMIT_EXCEEDED].includes(code);

    Object.setPrototypeOf(this, ToolkitError.prototype);
  }
}

export type CryptoResult<T> = 
  | { success: true; data: T }
  | { success: false; error: CryptoError };