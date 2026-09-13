export class CryptoError extends Error {
  constructor(public message: string, public code: string, public statusCode: number = 500) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const handleChainResponse = <T>(data: T | null, errorMessage: string): T => {
  if (data === null || data === undefined) {
    throw new CryptoError(errorMessage, 'DATA_NULL_OR_UNDEFINED', 404);
  }
  return data;
};

export const safeExecute = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof CryptoError) {
      throw error;
    }
    // Wrap unknown network or parsing errors
    throw new CryptoError(
      error instanceof Error ? error.message : 'Unknown execution failure',
      'EXECUTION_FAILURE',
      502
    );
  }
};

export const validateWalletAddress = (address: string): boolean => {
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  if (!addressRegex.test(address)) {
    return false;
  }
  return true;
};