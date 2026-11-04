interface Transaction {
  id: string;
  amount: number;
  currency: string;
}

/**
 * Validates transaction objects before processing
 */
const validateTransaction = (tx: unknown): tx is Transaction => {
  const t = tx as Transaction;
  return (
    typeof t?.id === 'string' &&
    typeof t?.amount === 'number' &&
    t.amount > 0 &&
    typeof t?.currency === 'string'
  );
};

/**
 * Main processing loop with input sanitization
 */
export const processTransactions = (queue: unknown[]): void => {
  for (const item of queue) {
    if (!validateTransaction(item)) {
      console.error('Invalid transaction payload ignored');
      continue;
    }

    try {
      console.log(`Processing crypto transfer: ${item.id} of ${item.amount} ${item.currency}`);
      // Additional processing logic for dev-toolkit-78
    } catch (err) {
      console.error(`System error during processing: ${item.id}`, err);
    }
  }
};