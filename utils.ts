export interface TransactionInput {
  id: string;
  recipient: string;
  amountWei: string;
  chainId: number;
}

export interface ValidationResult {
  validInputs: TransactionInput[];
  invalidInputs: Array<{ input: TransactionInput; error: string }>;
}

const EVM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const SUPPORTED_CHAIN_IDS = [1, 56, 137, 42161, 10];

/**
 * Validates and filters a batch of crypto transactions in the main processing loop.
 */
export function processAndValidateBatch(inputs: TransactionInput[]): ValidationResult {
  const validInputs: TransactionInput[] = [];
  const invalidInputs: Array<{ input: TransactionInput; error: string }> = [];

  for (const item of inputs) {
    if (!item.id || typeof item.id !== 'string') {
      invalidInputs.push({ input: item, error: 'Invalid or missing transaction ID' });
      continue;
    }

    if (!item.recipient || !EVM_ADDRESS_REGEX.test(item.recipient)) {
      invalidInputs.push({ input: item, error: 'Invalid EVM recipient address' });
      continue;
    }

    try {
      const amount = BigInt(item.amountWei);
      if (amount <= 0n) {
        invalidInputs.push({ input: item, error: 'Amount must be greater than zero' });
        continue;
      }
    } catch {
      invalidInputs.push({ input: item, error: 'Amount must be a valid numeric string' });
      continue;
    }

    if (!SUPPORTED_CHAIN_IDS.includes(item.chainId)) {
      invalidInputs.push({ input: item, error: `Unsupported chain ID: ${item.chainId}` });
      continue;
    }

    validInputs.push(item);
  }

  return { validInputs, invalidInputs };
}