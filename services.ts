export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffFactor?: number;
  retryableErrors?: string[];
}

/**
 * Executes an async operation with exponential backoff retry mechanism.
 * Designed for resilient crypto RPC calls and network queries.
 */
export async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    backoffFactor = 2,
    retryableErrors = ['ECONNRESET', 'ETIMEDOUT', '429', '503', 'HTTP 429'],
  } = options;

  let currentAttempt = 0;
  let currentDelay = delayMs;

  while (currentAttempt < maxAttempts) {
    try {
      return await fn();
    } catch (error: any) {
      currentAttempt++;
      const errorMessage = error?.message || String(error);
      const isRetryable = retryableErrors.some((code) => errorMessage.includes(code));

      if (currentAttempt >= maxAttempts || !isRetryable) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= backoffFactor;
    }
  }

  throw new Error('Maximum retry attempts reached');
}

/**
 * Crypto node JSON-RPC request wrapper with built-in retry handling.
 */
export async function queryCryptoRpc<T>(
  rpcUrl: string,
  method: string,
  params: unknown[] = []
): Promise<T> {
  return fetchWithRetry(async () => {
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method, params }),
    });

    if (!response.ok) {
      throw new Error(`RPC server error HTTP ${response.status}`);
    }

    const data = (await response.json()) as { result?: T; error?: { code: number; message: string } };
    if (data.error) {
      throw new Error(`RPC error ${data.error.code}: ${data.error.message}`);
    }

    return data.result as T;
  });
}
