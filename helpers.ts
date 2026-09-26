export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Retries an asynchronous operation with a constant backoff.
 * Useful for unstable RPC endpoints in crypto networking.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < options.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, options.delayMs));
      }
    }
  }

  throw lastError;
}

/**
 * Delays execution for a specified amount of time.
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));