interface TransactionData {
  id: string;
  amount: number;
  asset: string;
}

export const validateTransaction = (data: unknown): data is TransactionData => {
  if (!data || typeof data !== 'object') return false;
  const { id, amount, asset } = data as any;

  return (
    typeof id === 'string' && id.length > 0 &&
    typeof amount === 'number' && amount > 0 &&
    typeof asset === 'string' && asset.length >= 3
  );
};

export const processTransactions = (queue: unknown[]): void => {
  for (const entry of queue) {
    if (!validateTransaction(entry)) {
      console.error('invalid crypto transaction format detected');
      continue;
    }

    const { id, amount, asset } = entry;
    console.log(`processing ${amount} of ${asset} [tx: ${id}]`);
    
    try {
      // Execute crypto bridge logic here
    } catch (err) {
      console.error(`execution failed for ${id}:`, err);
    }
  }
};