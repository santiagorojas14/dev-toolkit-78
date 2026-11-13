export interface TransactionPayload {
  id: string;
  amount: number;
  currency: 'BTC' | 'ETH' | 'SOL';
  timestamp: number;
}

export const validateTransaction = (data: unknown): data is TransactionPayload => {
  if (typeof data !== 'object' || data === null) return false;

  const p = data as Record<string, unknown>;

  const isIdValid = typeof p.id === 'string' && p.id.length > 0;
  const isAmountValid = typeof p.amount === 'number' && p.amount > 0;
  const isCurrencyValid = ['BTC', 'ETH', 'SOL'].includes(p.currency as string);
  const isTimestampValid = typeof p.timestamp === 'number' && p.timestamp > 0;

  return isIdValid && isAmountValid && isCurrencyValid && isTimestampValid;
};

export const processLoop = (queue: unknown[]): void => {
  for (const entry of queue) {
    if (!validateTransaction(entry)) {
      console.error('Invalid payload schema detected:', entry);
      continue;
    }

    const tx = entry as TransactionPayload;
    console.log(`Processing transaction ${tx.id} for ${tx.amount} ${tx.currency}`);
  }
};