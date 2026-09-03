export class CryptoError extends Error {
  constructor(public message: string, public code: string, public retriable: boolean = false) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const handleTransactionError = (error: unknown): never => {
  if (error instanceof CryptoError) {
    throw error;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (message.includes('insufficient funds')) {
      throw new CryptoError('insufficient balance for transaction', 'INSUFFICIENT_FUNDS', false);
    }
    if (message.includes('nonce too low')) {
      throw new CryptoError('nonce conflict, retry with higher value', 'NONCE_ERROR', true);
    }
    throw new CryptoError(`unexpected execution error: ${error.message}`, 'INTERNAL_ERROR', false);
  }

  throw new CryptoError('unknown cryptographic failure', 'UNKNOWN_ERROR', false);
};

export const validateAddress = (address: string): boolean => {
  const ethRegex = /^0x[a-fA-F0-9]{40}$/;
  if (!ethRegex.test(address)) {
    throw new CryptoError('invalid wallet address format', 'INVALID_ADDRESS', false);
  }
  return true;
};