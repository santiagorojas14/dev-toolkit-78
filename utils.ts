export interface RetryOptions {
  retries: number;
  delay: number;
}

/**
 * executes async operation with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { retries: 3, delay: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i <= options.retries; i++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (i < options.retries) {
        await new Promise((resolve) => 
          setTimeout(resolve, options.delay * Math.pow(2, i))
        );
      }
    }
  }

  throw lastError;
}