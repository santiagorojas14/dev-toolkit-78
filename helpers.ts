export class CryptoError extends Error {
  constructor(public message: string, public code: string, public context?: any) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const validateTransaction = (tx: any): boolean => {
  if (!tx || typeof tx !== 'object') {
    throw new CryptoError('Invalid transaction structure', 'ERR_INVALID_TX');
  }
  if (!tx.hash || tx.hash.length < 64) {
    throw new CryptoError('Missing or malformed hash', 'ERR_INVALID_HASH', { hash: tx.hash });
  }
  return true;
};

export const safeParseBigInt = (value: string): bigint => {
  try {
    return BigInt(value);
  } catch (err) {
    throw new CryptoError('Failed to parse numeric value', 'ERR_PARSE_FAILURE', { value });
  }
};

export const withErrorHandling = async <T>(fn: () => Promise<T>): Promise<T | null> => {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof CryptoError) {
      console.error(`[${err.code}]: ${err.message}`, err.context);
    } else {
      console.error('Unexpected internal failure', err);
    }
    return null;
  }
};