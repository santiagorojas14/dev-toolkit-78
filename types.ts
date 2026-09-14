export enum CryptoErrorCode {
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  INVALID_SIGNATURE = 'INVALID_SIGNATURE',
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  UNKNOWN_TRANSACTION_STATE = 'UNKNOWN_TRANSACTION_STATE'
}

export interface CryptoError extends Error {
  code: CryptoErrorCode;
  context?: Record<string, unknown>;
  retryable: boolean;
}

export class ToolkitError extends Error implements CryptoError {
  public readonly code: CryptoErrorCode;
  public readonly retryable: boolean;
  public readonly context?: Record<string, unknown>;

  constructor(message: string, code: CryptoErrorCode, context?: Record<string, unknown>) {
    super(message);
    this.name = 'ToolkitError';
    this.code = code;
    this.context = context;
    this.retryable = [CryptoErrorCode.NETWORK_TIMEOUT, CryptoErrorCode.RATE_LIMIT_EXCEEDED].includes(code);

    Object.setPrototypeOf(this, ToolkitError.prototype);
  }
}

export type CryptoResult<T> = 
  | { success: true; data: T }
  | { success: false; error: CryptoError };