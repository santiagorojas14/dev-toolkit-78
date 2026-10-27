export interface RpcConfig {
  endpoint: string;
  timeoutMs: number;
  maxRetries: number;
}

export class CryptoServiceError extends Error {
  constructor(
    message: string,
    public readonly code: 'INVALID_ADDRESS' | 'TIMEOUT' | 'RPC_ERROR' | 'INSUFFICIENT_FUNDS',
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'CryptoServiceError';
  }
}

export class TransactionService {
  private readonly config: RpcConfig;

  constructor(config: RpcConfig) {
    this.config = config;
  }

  public validateAddress(address: string): boolean {
    if (!address || typeof address !== 'string') {
      throw new CryptoServiceError('Address must be a non-empty string', 'INVALID_ADDRESS', { address });
    }
    const hexPattern = /^0x[a-fA-F0-9]{40}$/;
    if (!hexPattern.test(address)) {
      throw new CryptoServiceError('Invalid EVM address format', 'INVALID_ADDRESS', { address });
    }
    return true;
  }

  public async executeRpcQuery<T>(queryFn: () => Promise<T>): Promise<T> {
    let attempt = 0;
    while (attempt <= this.config.maxRetries) {
      try {
        let timer: NodeJS.Timeout;
        const timeoutPromise = new Promise<never>((_, reject) => {
          timer = setTimeout(
            () => reject(new CryptoServiceError('RPC request timed out', 'TIMEOUT')),
            this.config.timeoutMs
          );
        });

        const result = await Promise.race([queryFn(), timeoutPromise]);
        clearTimeout(timer!);
        return result;
      } catch (err) {
        attempt++;
        if (err instanceof CryptoServiceError && err.code === 'TIMEOUT' && attempt <= this.config.maxRetries) {
          continue;
        }
        if (err instanceof Error && err.message.includes('insufficient funds')) {
          throw new CryptoServiceError('Insufficient funds for execution', 'INSUFFICIENT_FUNDS', {
            originalError: err.message,
          });
        }
        throw new CryptoServiceError(
          `RPC Query failed: ${err instanceof Error ? err.message : String(err)}`,
          'RPC_ERROR',
          { attempt, originalError: err }
        );
      }
    }
    throw new CryptoServiceError('Max retries exceeded for RPC query', 'TIMEOUT');
  }
}
