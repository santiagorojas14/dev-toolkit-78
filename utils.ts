export interface TransactionPayload {
  id: string;
  amount: number;
  currency: string;
  timestamp: number;
}

/**
 * Validates incoming crypto transaction payloads
 * Ensures basic data integrity before processing
 */
export function validateTransaction(data: any): data is TransactionPayload {
  if (!data || typeof data !== 'object') return false;
  
  const { id, amount, currency, timestamp } = data;

  const isValidId = typeof id === 'string' && id.length > 0;
  const isValidAmount = typeof amount === 'number' && amount > 0;
  const isValidCurrency = typeof currency === 'string' && currency.length === 3;
  const isValidTimestamp = typeof timestamp === 'number' && timestamp <= Date.now();

  return isValidId && isValidAmount && isValidCurrency && isValidTimestamp;
}

/**
 * Main processing loop wrapper for transaction stream
 */
export function processTransactionStream(stream: any[]): TransactionPayload[] {
  const validTransactions: TransactionPayload[] = [];

  for (const item of stream) {
    if (validateTransaction(item)) {
      validTransactions.push(item);
    } else {
      console.error(`Invalid transaction data received: ${JSON.stringify(item)}`);
    }
  }

  return validTransactions;
}