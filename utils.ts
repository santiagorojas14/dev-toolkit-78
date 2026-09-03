export class CryptoError extends Error {
  constructor(public message: string, public code: string, public context?: any) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const safeBigIntConversion = (value: unknown): bigint => {
  try {
    if (typeof value === 'string' || typeof value === 'number') {
      return BigInt(value);
    }
    throw new Error('Invalid numeric input');
  } catch (err) {
    throw new CryptoError('Failed to convert value to bigint', 'INVALID_BIGINT_CONVERSION', { value });
  }
};

export const handleTransactionError = (error: unknown): void => {
  if (error instanceof CryptoError) {
    console.error(`[${error.code}] ${error.message}`, error.context);
  } else if (error instanceof Error) {
    console.error(`Unexpected transaction failure: ${error.message}`);
  } else {
    console.error('Unknown critical failure during execution');
  }
};

export const validateAddress = (address: string): boolean => {
  const isValid = /^0x[a-fA-F0-9]{40}$/.test(address);
  if (!isValid) {
    throw new CryptoError('Invalid Ethereum address format', 'INVALID_ADDRESS', { address });
  }
  return true;
};