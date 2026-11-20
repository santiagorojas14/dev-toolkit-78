export interface CryptoTransaction {
  id: string;
  amount: number;
  asset: string;
  timestamp: number;
}

export const validateTransaction = (tx: unknown): tx is CryptoTransaction => {
  if (typeof tx !== 'object' || tx === null) return false;
  const t = tx as Record<string, unknown>;

  return (
    typeof t.id === 'string' &&
    typeof t.amount === 'number' &&
    t.amount > 0 &&
    typeof t.asset === 'string' &&
    typeof t.timestamp === 'number'
  );
};

export const processTransactions = (batch: unknown[]): void => {
  for (const item of batch) {
    if (!validateTransaction(item)) {
      console.error('Invalid transaction schema detected', item);
      continue;
    }

    // Proceed with secure crypto operations
    console.log(`Processing asset ${item.asset} for ${item.amount}`);
  }
};