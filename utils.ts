interface Transaction {
  id: string;
  amount: number;
  currency: string;
}

/**
 * validate crypto transaction structure
 * ensures input meets processing requirements
 */
export function validateTransaction(tx: unknown): tx is Transaction {
  if (!tx || typeof tx !== 'object') return false;

  const { id, amount, currency } = tx as Partial<Transaction>;

  return (
    typeof id === 'string' &&
    id.length > 0 &&
    typeof amount === 'number' &&
    amount > 0 &&
    typeof currency === 'string' &&
    currency.length === 3
  );
}

/**
 * processing loop entry guard
 * filters invalid data before block execution
 */
export function processTransactions(data: unknown[]): Transaction[] {
  return data.reduce<Transaction[]>((acc, entry) => {
    if (validateTransaction(entry)) {
      acc.push(entry);
    }
    return acc;
  }, []);
}