export interface RetryOptions {
  retries: number;
  delayMs: number;
}

/**
 * Executes a network operation with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { retries: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= options.retries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (attempt < options.retries) {
        const backoff = options.delayMs * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  throw lastError;
}

export const isNetworkError = (error: unknown): boolean => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as any).code === 'ECONNRESET'
  );
};