export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  retryOn?: (error: unknown) => boolean;
}

/**
 * Retries an asynchronous network operation with exponential backoff.
 * Designed for handling transient RPC node rate limits and network glitches.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelayMs = 500,
    maxDelayMs = 10000,
    backoffFactor = 2,
    retryOn = () => true,
  } = options;

  let attempt = 0;
  let delay = initialDelayMs;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      attempt++;
      if (attempt > maxRetries || !retryOn(error)) {
        throw error;
      }

      // Calculate jittered delay to mitigate thundering herd on crypto endpoints
      const jitter = Math.random() * 0.2 + 0.9;
      const actualDelay = Math.min(delay * jitter, maxDelayMs);

      await new Promise((resolve) => setTimeout(resolve, actualDelay));
      delay *= backoffFactor;
    }
  }
}