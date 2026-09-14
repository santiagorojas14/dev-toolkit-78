export interface TransactionPayload {
  id: string;
  amount: number;
  address: string;
}

/**
 * Validates crypto transaction fields before main processing
 */
export function validateTransaction(data: any): data is TransactionPayload {
  if (typeof data !== 'object' || data === null) return false;

  const { id, amount, address } = data;

  const isIdValid = typeof id === 'string' && id.length > 0;
  const isAmountValid = typeof amount === 'number' && amount > 0;
  const isAddressValid = typeof address === 'string' && /^0x[a-fA-F0-9]{40}$/.test(address);

  return isIdValid && isAmountValid && isAddressValid;
}

/**
 * Processing loop with input validation
 */
export function processBatch(inputs: unknown[]): TransactionPayload[] {
  const validated: TransactionPayload[] = [];

  for (const input of inputs) {
    if (validateTransaction(input)) {
      validated.push(input);
    } else {
      console.error('Invalid crypto transaction data skipped:', input);
    }
  }

  return validated;
}