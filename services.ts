export interface TransactionRequest {
  asset: string;
  amount: number;
  recipient: string;
}

export const validateTransaction = (tx: unknown): TransactionRequest => {
  if (typeof tx !== 'object' || tx === null) {
    throw new Error('invalid payload format');
  }

  const { asset, amount, recipient } = tx as TransactionRequest;

  if (typeof asset !== 'string' || asset.length < 3) {
    throw new Error('invalid asset identifier');
  }

  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('invalid transaction amount');
  }

  if (typeof recipient !== 'string' || !recipient.startsWith('0x')) {
    throw new Error('invalid recipient address');
  }

  return { asset, amount, recipient };
};

export const processMainLoop = (queue: unknown[]) => {
  for (const item of queue) {
    try {
      const validTx = validateTransaction(item);
      console.log(`processing ${validTx.asset} for ${validTx.amount}`);
    } catch (err) {
      console.error(`skipped invalid transaction: ${(err as Error).message}`);
    }
  }
};