export interface Transaction {
  id: string;
  amount: number;
  currency: 'BTC' | 'ETH' | 'SOL';
  timestamp: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * schema validation for incoming crypto payloads
 */
export const validateTransaction = (tx: any): ValidationResult => {
  if (typeof tx.id !== 'string' || tx.id.length < 8) {
    return { isValid: false, error: 'invalid transaction identifier' };
  }

  if (typeof tx.amount !== 'number' || tx.amount <= 0) {
    return { isValid: false, error: 'positive numerical amount required' };
  }

  const validCurrencies = ['BTC', 'ETH', 'SOL'];
  if (!validCurrencies.includes(tx.currency)) {
    return { isValid: false, error: 'unsupported crypto asset type' };
  }

  return { isValid: true };
};

export const processLoop = (queue: any[]): void => {
  for (const item of queue) {
    const validation = validateTransaction(item);

    if (!validation.isValid) {
      console.error(`skipping invalid tx: ${validation.error}`);
      continue;
    }

    // perform core business logic here
    console.log(`processing validated transaction: ${item.id}`);
  }
};