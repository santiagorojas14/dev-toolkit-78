export interface TransactionInput {
  fromAddress: string;
  toAddress: string;
  amount: string;
  signature: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates basic crypto transaction inputs.
 * Checks hex address formats, positive amount values, and signature length.
 */
export function validateTransaction(tx: TransactionInput): ValidationResult {
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  const signatureRegex = /^0x[a-fA-F0-9]{130}$/;

  if (!addressRegex.test(tx.fromAddress)) {
    return { isValid: false, error: "invalid sender address format" };
  }

  if (!addressRegex.test(tx.toAddress)) {
    return { isValid: false, error: "invalid recipient address format" };
  }

  if (tx.fromAddress.toLowerCase() === tx.toAddress.toLowerCase()) {
    return { isValid: false, error: "sender and recipient must be different" };
  }

  try {
    const amountBigInt = BigInt(tx.amount);
    if (amountBigInt <= 0n) {
      return { isValid: false, error: "amount must be greater than zero" };
    }
  } catch {
    return { isValid: false, error: "amount must be a valid numeric string" };
  }

  if (!signatureRegex.test(tx.signature)) {
    return { isValid: false, error: "invalid cryptographic signature format" };
  }

  return { isValid: true };
}

/**
 * Filters a batch of transactions to ensure only valid inputs enter the processing loop.
 */
export function validateAndFilterBatch(transactions: TransactionInput[]): TransactionInput[] {
  return transactions.filter((tx) => {
    const validation = validateTransaction(tx);
    return validation.isValid;
  });
}