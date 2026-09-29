export interface CryptoTransaction {
  id: string;
  amount: number;
  currency: string;
  timestamp: number;
}

export type ValidationResult = { isValid: true } | { isValid: false; error: string };

/**
 * input validation for main crypto processing loop
 */
export const validateTransaction = (tx: unknown): ValidationResult => {
  if (!tx || typeof tx !== 'object') {
    return { isValid: false, error: 'transaction payload must be an object' };
  }

  const { id, amount, currency } = tx as Partial<CryptoTransaction>;

  if (typeof id !== 'string' || id.length === 0) {
    return { isValid: false, error: 'invalid or missing transaction id' };
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return { isValid: false, error: 'invalid transaction amount' };
  }

  if (typeof currency !== 'string' || currency.length < 3) {
    return { isValid: false, error: 'invalid currency code' };
  }

  return { isValid: true };
};

export const processLoop = (transactions: unknown[]): CryptoTransaction[] => {
  const validated: CryptoTransaction[] = [];

  for (const tx of transactions) {
    const result = validateTransaction(tx);
    if (result.isValid) {
      validated.push(tx as CryptoTransaction);
    } else {
      console.error(`skipping invalid tx: ${result.error}`);
    }
  }

  return validated;
};