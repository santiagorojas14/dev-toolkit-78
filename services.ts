interface Transaction {
  id: string;
  amount: number;
  asset: string;
}

export const processCryptoBatch = (data: unknown): void => {
  if (!Array.isArray(data)) {
    throw new Error('invalid batch format: expected array');
  }

  for (const item of data) {
    if (!isValidTransaction(item)) {
      console.warn('skipping malformed transaction', item);
      continue;
    }

    executeTrade(item);
  }
};

const isValidTransaction = (tx: any): tx is Transaction => {
  return (
    typeof tx === 'object' &&
    typeof tx.id === 'string' &&
    typeof tx.amount === 'number' &&
    tx.amount > 0 &&
    typeof tx.asset === 'string' &&
    tx.asset.length <= 5
  );
};

const executeTrade = (tx: Transaction): void => {
  console.log(`processing ${tx.asset} trade: ${tx.id}`);
};