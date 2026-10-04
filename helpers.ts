/**
 * Crypto edge case error handlers for dev-toolkit-78
 */

export class CryptoError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const validateTransaction = (amount: number, balance: number): void => {
  if (amount <= 0) {
    throw new CryptoError('Transaction amount must be positive', 'INVALID_AMOUNT');
  }

  if (amount > balance) {
    throw new CryptoError('Insufficient funds for transaction', 'INSUFFICIENT_BALANCE');
  }
};

export const handleProviderError = (err: unknown): string => {
  if (err instanceof Error) {
    // Handle specific RPC provider connection drops
    if (err.message.includes('connection refused')) {
      return 'RPC_NODE_OFFLINE';
    }
    return err.message;
  }
  return 'UNKNOWN_PROVIDER_FAILURE';
};

export const safeBigIntConversion = (value: any): bigint => {
  try {
    return BigInt(value);
  } catch {
    throw new CryptoError('Invalid hex or numeric string format', 'INVALID_BIGINT_FORMAT');
  }
};