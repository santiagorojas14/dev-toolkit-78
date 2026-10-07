export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  shouldRetry?: (error: unknown) => boolean;
}

/**
 * Executes an async network operation with exponential backoff and jitter.
 * Designed for handling crypto RPC rate limits and transient network glitches.
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelayMs = 500,
    maxDelayMs = 10000,
    backoffFactor = 2,
    shouldRetry = () => true,
  } = options;

  let attempt = 0;
  let delay = initialDelayMs;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;

      if (attempt > maxRetries || !shouldRetry(error)) {
        throw error;
      }

      // Exponential backoff with full jitter to avoid RPC thundering herd issues
      const currentMax = Math.min(delay, maxDelayMs);
      const jitteredDelay = Math.floor(Math.random() * currentMax);

      await new Promise((resolve) => setTimeout(resolve, jitteredDelay));
      delay *= backoffFactor;
    }
  }
}