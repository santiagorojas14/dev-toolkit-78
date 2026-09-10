export interface RetryOptions {
  retries: number;
  delay: number;
}

/**
 * executes an async function with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { retries: 3, delay: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < options.retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, options.delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
}

/**
 * generic delay utility for network throttling
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));