export interface CryptoTransaction {
  id: string;
  amount: number;
  currency: 'BTC' | 'ETH' | 'SOL';
  timestamp: number;
}

export const validateTransaction = (tx: unknown): tx is CryptoTransaction => {
  if (typeof tx !== 'object' || tx === null) return false;

  const { id, amount, currency, timestamp } = tx as any;

  const isIdValid = typeof id === 'string' && id.length > 0;
  const isAmountValid = typeof amount === 'number' && amount > 0;
  const isCurrencyValid = ['BTC', 'ETH', 'SOL'].includes(currency);
  const isTimestampValid = typeof timestamp === 'number' && timestamp <= Date.now();

  return isIdValid && isAmountValid && isCurrencyValid && isTimestampValid;
};

export const processTransactions = (data: unknown[]): CryptoTransaction[] => {
  const validTransactions: CryptoTransaction[] = [];

  for (const item of data) {
    if (validateTransaction(item)) {
      validTransactions.push(item);
    } else {
      console.error('Invalid transaction payload skipped', item);
    }
  }

  return validTransactions;
};