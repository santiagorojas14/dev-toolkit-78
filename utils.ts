export interface RetryOptions {
  maxAttempts: number;
  backoffMs: number;
}

/**
 * executes an async operation with exponential backoff for resilience
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, backoffMs: 1000 }
): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (attempt === options.maxAttempts) break;

      const delay = options.backoffMs * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}