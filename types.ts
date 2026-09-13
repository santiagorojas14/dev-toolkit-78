export interface TransactionPayload {
  id: string;
  amount: number;
  currency: string;
  timestamp: number;
}

export const isValidTransaction = (tx: unknown): tx is TransactionPayload => {
  if (!tx || typeof tx !== 'object') return false;

  const t = tx as Partial<TransactionPayload>;
  
  // Basic schema validation for crypto processing
  const hasValidAmount = typeof t.amount === 'number' && t.amount > 0;
  const hasValidId = typeof t.id === 'string' && t.id.length > 0;
  const hasValidCurrency = typeof t.currency === 'string' && t.currency.length >= 3;

  return !!(hasValidAmount && hasValidId && hasValidCurrency);
};

export const processLoop = (input: unknown[]): TransactionPayload[] => {
  const validItems: TransactionPayload[] = [];

  for (const item of input) {
    if (isValidTransaction(item)) {
      validItems.push(item);
    } else {
      console.warn('Skipping invalid crypto transaction payload');
    }
  }

  return validItems;
};