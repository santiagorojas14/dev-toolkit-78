export interface RawTransactionInput {
  recipient: string;
  amount: string | number;
  token: string;
}

export interface ValidatedTransaction {
  recipient: string;
  amount: bigint;
  token: string;
}

export interface BatchProcessingResult {
  successful: ValidatedTransaction[];
  failed: { input: RawTransactionInput; error: string }[];
}

const SUPPORTED_TOKENS = new Set(['BTC', 'ETH', 'SOL', 'USDC']);
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

/**
 * Validates a single raw crypto transaction input.
 */
export function validateTransactionInput(input: RawTransactionInput): ValidatedTransaction {
  if (!input.recipient || typeof input.recipient !== 'string') {
    throw new Error('Invalid or missing recipient address');
  }

  if (!ETH_ADDRESS_REGEX.test(input.recipient)) {
    throw new Error('Recipient must be a valid EVM hex address');
  }

  if (input.amount === undefined || input.amount === null || input.amount === '') {
    throw new Error('Transaction amount is required');
  }

  let parsedAmount: bigint;
  try {
    parsedAmount = BigInt(input.amount);
  } catch {
    throw new Error('Amount must be a valid numeric value');
  }

  if (parsedAmount <= 0n) {
    throw new Error('Amount must be greater than zero');
  }

  if (!input.token || !SUPPORTED_TOKENS.has(input.token.toUpperCase())) {
    throw new Error(`Unsupported token symbol: ${input.token}`);
  }

  return {
    recipient: input.recipient.toLowerCase(),
    amount: parsedAmount,
    token: input.token.toUpperCase(),
  };
}

/**
 * Processes a batch of raw transaction inputs with strict validation in the main loop.
 */
export function processBatchLoop(inputs: RawTransactionInput[]): BatchProcessingResult {
  const successful: ValidatedTransaction[] = [];
  const failed: { input: RawTransactionInput; error: string }[] = [];

  for (const input of inputs) {
    try {
      const validated = validateTransactionInput(input);
      successful.push(validated);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown validation error';
      failed.push({ input, error: message });
    }
  }

  return { successful, failed };
}