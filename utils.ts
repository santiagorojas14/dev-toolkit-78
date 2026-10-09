export class CryptoError extends Error {
  constructor(public message: string, public code: string, public retryable: boolean = false) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const handleTransactionError = (error: unknown): void => {
  if (error instanceof CryptoError) {
    if (error.retryable) {
      console.warn(`[dev-toolkit-78] Retryable error encountered: ${error.message}`);
      return;
    }
    console.error(`[dev-toolkit-78] Critical error [${error.code}]: ${error.message}`);
    throw error;
  }

  if (error instanceof Error) {
    console.error(`[dev-toolkit-78] Unexpected system error: ${error.message}`);
  } else {
    console.error('[dev-toolkit-78] Unknown non-error object thrown');
  }

  throw new Error('Transaction execution aborted due to unexpected failure');
};

export const validateWalletAddress = (address: string): boolean => {
  const pattern = /^0x[a-fA-F0-9]{40}$/;
  if (!pattern.test(address)) {
    throw new CryptoError('Invalid wallet format', 'INVALID_ADDRESS', false);
  }
  return true;
};