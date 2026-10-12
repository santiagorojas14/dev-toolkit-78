export class CryptoError extends Error {
  constructor(public message: string, public code: string, public context?: unknown) {
    super(message);
    this.name = 'CryptoError';
  }
}

/**
 * Safely executes async crypto operations with error normalization
 */
export async function executeSafeTrade<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message.includes('insufficient funds')) {
        throw new CryptoError('Balance too low for transaction', 'INSUFFICIENT_FUNDS', err);
      }
      if (err.message.includes('network timeout')) {
        throw new CryptoError('Rpc provider unreachable', 'NETWORK_TIMEOUT', err);
      }
      throw new CryptoError(err.message, 'UNKNOWN_CRYPTO_FAILURE', err);
    }
    throw new CryptoError('An unexpected non-error object was thrown', 'INTERNAL_ERROR', err);
  }
}

export function validateAddress(address: string): boolean {
  const hexRegex = /^0x[a-fA-F0-9]{40}$/;
  if (!hexRegex.test(address)) {
    return false;
  }
  return true;
}