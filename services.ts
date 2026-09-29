export interface TransactionPayload {
  txHash: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  chainId: number;
}

export interface ProcessingResult {
  successful: string[];
  failed: { txHash: string; reason: string }[];
}

export class BatchTransactionService {
  private supportedChainIds: Set<number> = new Set([1, 137, 42161]);
  private addressRegex: RegExp = /^0x[a-fA-F0-9]{40}$/;
  private txHashRegex: RegExp = /^0x[a-fA-F0-9]{64}$/;

  public processBatch(payloads: TransactionPayload[]): ProcessingResult {
    const result: ProcessingResult = { successful: [], failed: [] };

    for (const tx of payloads) {
      const validationError = this.validateTransaction(tx);
      if (validationError) {
        result.failed.push({ txHash: tx?.txHash || 'unknown', reason: validationError });
        continue;
      }

      try {
        this.executeTransaction(tx);
        result.successful.push(tx.txHash);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Execution failed';
        result.failed.push({ txHash: tx.txHash, reason: message });
      }
    }

    return result;
  }

  private validateTransaction(tx: TransactionPayload): string | null {
    if (!tx || typeof tx !== 'object') return 'Invalid payload structure';
    if (!this.txHashRegex.test(tx.txHash)) return 'Invalid transaction hash format';
    if (!this.addressRegex.test(tx.fromAddress)) return 'Invalid sender address';
    if (!this.addressRegex.test(tx.toAddress)) return 'Invalid recipient address';
    if (!this.supportedChainIds.has(tx.chainId)) return 'Unsupported chain ID';
    
    try {
      const amount = BigInt(tx.amount);
      if (amount <= 0n) return 'Amount must be greater than zero';
    } catch {
      return 'Invalid numeric amount';
    }

    return null;
  }

  private executeTransaction(tx: TransactionPayload): void {
    if (tx.fromAddress === tx.toAddress) {
      throw new Error('Self-transfer is not allowed');
    }
  }
}