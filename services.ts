export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  backoffFactor?: number;
}

export interface RpcResponse<T = unknown> {
  jsonrpc: '2.0';
  id: number | string;
  result?: T;
  error?: {
    code: number;
    message: string;
  };
}

/**
 * Service to execute JSON-RPC calls with configurable exponential backoff retry logic.
 */
export class CryptoRpcService {
  constructor(private readonly endpoint: string) {}

  /**
   * Executes RPC call and automatically retries on transient network failures.
   */
  async executeWithRetry<T>(
    method: string,
    params: unknown[] = [],
    options: RetryOptions = {}
  ): Promise<T> {
    const { maxRetries = 3, initialDelayMs = 500, backoffFactor = 2 } = options;
    let currentDelay = initialDelayMs;

    const payload = {
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    };

    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      try {
        const response = await fetch(this.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP network error: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as RpcResponse<T>;
        if (data.error) {
          throw new Error(`RPC node error ${data.error.code}: ${data.error.message}`);
        }

        if (data.result === undefined) {
          throw new Error('Malformed RPC response: missing result');
        }

        return data.result;
      } catch (err) {
        const error = err as Error;
        if (attempt > maxRetries) {
          throw new Error(`RPC call '${method}' failed after ${maxRetries} retries: ${error.message}`);
        }

        // Wait before retrying with exponential backoff
        await new Promise((resolve) => setTimeout(resolve, currentDelay));
        currentDelay *= backoffFactor;
      }
    }

    throw new Error('Exceeded maximum retry attempts');
  }
}