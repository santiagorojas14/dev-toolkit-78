export interface TransactionPayload {
  id: string;
  amount: number;
  asset: 'BTC' | 'ETH' | 'SOL';
  timestamp: number;
}

export const isValidPayload = (data: any): data is TransactionPayload => {
  if (typeof data !== 'object' || data === null) return false;

  const isAmountValid = typeof data.amount === 'number' && data.amount > 0;
  const isAssetValid = ['BTC', 'ETH', 'SOL'].includes(data.asset);
  const isIdValid = typeof data.id === 'string' && data.id.length > 0;

  return isAmountValid && isAssetValid && isIdValid;
};

export const processCryptoQueue = (queue: any[]): TransactionPayload[] => {
  const validTransactions: TransactionPayload[] = [];

  for (const item of queue) {
    // validate integrity of incoming crypto payload
    if (isValidPayload(item)) {
      validTransactions.push(item);
    } else {
      console.warn(`invalid transaction skipped: ${item?.id || 'unknown'}`);
    }
  }

  return validTransactions;
};