export interface Transaction {
  id: string;
  amount: number;
  asset: string;
}

/**
 * Validates crypto transaction objects to ensure processing integrity.
 */
export const isValidTransaction = (tx: any): tx is Transaction => {
  if (typeof tx !== 'object' || tx === null) return false;
  if (typeof tx.id !== 'string' || tx.id.length < 8) return false;
  if (typeof tx.amount !== 'number' || tx.amount <= 0) return false;
  if (typeof tx.asset !== 'string' || tx.asset.length < 3) return false;
  return true;
};

/**
 * Main processing loop validation utility for dev-toolkit-78.
 */
export const processTransactions = (data: unknown[]): Transaction[] => {
  const validTransactions: Transaction[] = [];
  
  for (const item of data) {
    if (isValidTransaction(item)) {
      validTransactions.push(item);
    } else {
      console.warn('Skipping malformed transaction:', item);
    }
  }
  
  return validTransactions;
};