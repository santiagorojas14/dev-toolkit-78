export interface RawTransactionInput {
  txHash?: string;
  senderAddress?: string;
  recipientAddress?: string;
  amount?: string | number;
  nonce?: number;
}

export interface ValidatedTransaction {
  txHash: string;
  senderAddress: string;
  recipientAddress: string;
  amount: bigint;
  nonce: number;
}

export interface ValidationResult {
  valid: ValidatedTransaction[];
  invalid: { input: RawTransactionInput; reason: string }[];
}

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const TX_HASH_REGEX = /^0x[a-fA-F0-9]{64}$/;

/**
 * Validates a batch of raw transaction inputs before processing.
 * Filters out malformed addresses, negative amounts, and invalid hashes.
 */
export function validateBatchInputs(inputs: RawTransactionInput[]): ValidationResult {
  const result: ValidationResult = {
    valid: [],
    invalid: [],
  };

  for (let i = 0; i < inputs.length; i++) {
    const item = inputs[i];

    if (!item.txHash || !TX_HASH_REGEX.test(item.txHash)) {
      result.invalid.push({ input: item, reason: `Invalid transaction hash at index ${i}` });
      continue;
    }

    if (!item.senderAddress || !ADDRESS_REGEX.test(item.senderAddress)) {
      result.invalid.push({ input: item, reason: `Invalid sender address for tx ${item.txHash}` });
      continue;
    }

    if (!item.recipientAddress || !ADDRESS_REGEX.test(item.recipientAddress)) {
      result.invalid.push({ input: item, reason: `Invalid recipient address for tx ${item.txHash}` });
      continue;
    }

    if (item.amount === undefined || item.amount === null) {
      result.invalid.push({ input: item, reason: `Missing amount for tx ${item.txHash}` });
      continue;
    }

    let parsedAmount: bigint;
    try {
      parsedAmount = BigInt(item.amount);
      if (parsedAmount <= 0n) {
        result.invalid.push({ input: item, reason: `Amount must be positive for tx ${item.txHash}` });
        continue;
      }
    } catch {
      result.invalid.push({ input: item, reason: `Unparseable amount value for tx ${item.txHash}` });
      continue;
    }

    if (typeof item.nonce !== 'number' || item.nonce < 0) {
      result.invalid.push({ input: item, reason: `Invalid nonce value for tx ${item.txHash}` });
      continue;
    }

    result.valid.push({
      txHash: item.txHash,
      senderAddress: item.senderAddress,
      recipientAddress: item.recipientAddress,
      amount: parsedAmount,
      nonce: item.nonce,
    });
  }

  return result;
}