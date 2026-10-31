export interface CryptoTransaction {
  id: string;
  recipientAddress: string;
  amount: number;
  assetSymbol: string;
  nonce: number;
}

export interface ProcessingSummary {
  processedCount: number;
  failedCount: number;
  errors: Array<{ id: string; reason: string }>;
}

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const SUPPORTED_ASSETS = new Set(['BTC', 'ETH', 'USDT', 'USDC', 'SOL']);

export function validateTransactionInput(tx: CryptoTransaction): { valid: boolean; reason?: string } {
  if (!tx || typeof tx !== 'object') {
    return { valid: false, reason: 'Invalid payload format' };
  }
  if (!tx.id || typeof tx.id !== 'string') {
    return { valid: false, reason: 'Missing or invalid transaction ID' };
  }
  if (!tx.recipientAddress || !ADDRESS_REGEX.test(tx.recipientAddress)) {
    return { valid: false, reason: 'Invalid recipient EVM wallet address' };
  }
  if (typeof tx.amount !== 'number' || tx.amount <= 0 || !Number.isFinite(tx.amount)) {
    return { valid: false, reason: 'Amount must be a positive finite number' };
  }
  if (!tx.assetSymbol || !SUPPORTED_ASSETS.has(tx.assetSymbol.toUpperCase())) {
    return { valid: false, reason: `Unsupported asset symbol: ${tx.assetSymbol}` };
  }
  if (typeof tx.nonce !== 'number' || tx.nonce < 0) {
    return { valid: false, reason: 'Nonce must be a non-negative integer' };
  }
  return { valid: true };
}

export function processTransactionBatch(batch: CryptoTransaction[]): ProcessingSummary {
  const summary: ProcessingSummary = {
    processedCount: 0,
    failedCount: 0,
    errors: [],
  };

  for (const tx of batch) {
    // Validate input before executing downstream processing
    const validation = validateTransactionInput(tx);
    if (!validation.valid) {
      summary.failedCount++;
      summary.errors.push({ id: tx?.id || 'unknown', reason: validation.reason || 'Unknown validation failure' });
      continue;
    }

    // Execute valid transaction processing
    summary.processedCount++;
  }

  return summary;
}