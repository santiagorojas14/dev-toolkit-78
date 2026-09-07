export interface RetryOptions {
  retries?: number;
  minTimeout?: number;
  maxTimeout?: number;
  factor?: number;
  onRetry?: (error: any, attempt: number) => void;
}

/**
 * Executes an asynchronous operation with exponential backoff retry logic.
 * Tailored for flaky blockchain RPC calls or rate-limited crypto API endpoints.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    retries = 3,
    minTimeout = 1000,
    maxTimeout = 10000,
    factor = 2,
    onRetry,
  } = options;

  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt > retries) {
        throw error;
      }

      if (onRetry) {
        onRetry(error, attempt);
      }

      // Calculate exponential backoff delay with jitter to avoid thundering herd
      const delay = Math.min(
        minTimeout * Math.pow(factor, attempt - 1),
        maxTimeout
      );
      const jitter = Math.random() * 200;

      await new Promise((resolve) => setTimeout(resolve, delay + jitter));
    }
  }
}