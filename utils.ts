export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * executes async functions with exponential backoff for network resilience
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === options.maxAttempts) break;

      const backoff = options.delayMs * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }

  throw lastError;
}

/**
 * checks if an error originates from a network timeout or connection reset
 */
export function isNetworkError(error: any): boolean {
  const networkErrors = ['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED'];
  return error?.code && networkErrors.includes(error.code);
}