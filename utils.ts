export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  shouldRetry?: (error: unknown) => boolean;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  baseDelayMs: 500,
  maxDelayMs: 5000,
  backoffFactor: 2,
  shouldRetry: (error: unknown) => {
    // Retry on standard transient network failures and rate limits
    if (error instanceof Error) {
      const msg = error.message.toLowerCase();
      return msg.includes('429') || msg.includes('timeout') || msg.includes('network');
    }
    return true;
  },
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Executes an async operation with exponential backoff retry logic.
 * Designed for resilient crypto RPC node requests and API queries.
 */
export async function retryOperation<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  let attempt = 0;
  let currentDelay = config.baseDelayMs;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;

      if (attempt > config.maxRetries || !config.shouldRetry(error)) {
        throw error;
      }

      // Apply jitter to prevent thundering herd on RPC nodes
      const jitter = Math.floor(Math.random() * 100);
      const delay = Math.min(currentDelay + jitter, config.maxDelayMs);

      await sleep(delay);
      currentDelay *= config.backoffFactor;
    }
  }
}