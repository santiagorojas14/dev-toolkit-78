export class CryptoError extends Error {
  constructor(public code: string, message: string, public retryable: boolean = false) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const validateAddress = (address: string): boolean => {
  if (!address || typeof address !== 'string') return false;
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | null> => {
  try {
    return await fn();
  } catch (error: any) {
    if (error instanceof CryptoError && error.retryable) {
      console.warn(`Retryable error encountered: ${error.message}`);
    } else {
      console.error('Fatal execution error:', error.message);
    }
    return null;
  }
};

export const formatBalance = (balance: bigint, decimals: number = 18): string => {
  try {
    if (balance < 0n) throw new Error('Negative balance');
    const divisor = 10n ** BigInt(decimals);
    return (Number(balance) / Number(divisor)).toFixed(4);
  } catch (err) {
    return '0.0000';
  }
};
