export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffFactor?: number;
  retryableErrors?: (error: unknown) => boolean;
}

/**
 * Executes an async operation with exponential backoff retry logic.
 * Tailored for crypto RPC calls prone to transient network failures.
 */
export async function fetchWithRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? 3;
  const initialDelay = options.delayMs ?? 1000;
  const backoffFactor = options.backoffFactor ?? 2;
  const isRetryable = options.retryableErrors ?? (() => true);

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts || !isRetryable(error)) {
        throw error;
      }

      const delay = initialDelay * Math.pow(backoffFactor, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Helper to identify transient network errors or RPC rate limits (HTTP 429).
 */
export function isCryptoRpcRateLimit(error: unknown): boolean {
  if (typeof error === 'object' && error !== null) {
    const err = error as { status?: number; code?: number; message?: string };
    return (
      err.status === 429 ||
      err.code === -32005 ||
      (typeof err.message === 'string' && err.message.toLowerCase().includes('rate limit'))
    );
  }
  return false;
}