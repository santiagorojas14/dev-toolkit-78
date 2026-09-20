export interface RetryOptions {
  retries: number;
  minDelayMs: number;
  maxDelayMs: number;
  backoffFactor: number;
  retryableErrors?: RegExp[];
}

const DEFAULT_OPTIONS: RetryOptions = {
  retries: 3,
  minDelayMs: 1000,
  maxDelayMs: 10000,
  backoffFactor: 2,
};

/**
 * Executes an operation and retries it with exponential backoff and jitter if it fails.
 * Useful for resilient connection to blockchain RPC nodes and crypto APIs.
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  let attempt = 0;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      attempt++;

      if (attempt > config.retries) {
        throw error;
      }

      if (config.retryableErrors && error instanceof Error) {
        const isRetryable = config.retryableErrors.some((regex) =>
          regex.test(error.message)
        );
        if (!isRetryable) {
          throw error;
        }
      }

      // Calculate delay using exponential backoff with full jitter
      const rawDelay = Math.min(
        config.maxDelayMs,
        config.minDelayMs * Math.pow(config.backoffFactor, attempt - 1)
      );
      const jitteredDelay = Math.random() * rawDelay;

      await new Promise((resolve) => setTimeout(resolve, jitteredDelay));
    }
  }
}