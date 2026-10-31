export interface RetryOptions {
  maxAttempts?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  shouldRetry?: (error: unknown) => boolean;
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 4,
  initialDelayMs: 500,
  maxDelayMs: 8000,
  backoffFactor: 2,
  shouldRetry: (error: unknown) => {
    if (error instanceof Error) {
      const msg = error.message.toLowerCase();
      // Automatically retry network timeouts, rate-limits (429), and connection resets
      return (
        msg.includes('timeout') ||
        msg.includes('429') ||
        msg.includes('econnrefused') ||
        msg.includes('network error')
      );
    }
    return true;
  },
};

/**
 * Executes a crypto RPC/network call with exponential backoff and jitter.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let currentDelay = config.initialDelayMs;
  let lastError: unknown;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      const isLastAttempt = attempt === config.maxAttempts;
      if (isLastAttempt || !config.shouldRetry(error)) {
        throw error;
      }

      // Add a small randomized jitter (0-20%) to prevent thundering herd on RPC nodes
      const jitter = Math.random() * 0.2 * currentDelay;
      const waitTime = Math.min(currentDelay + jitter, config.maxDelayMs);

      await new Promise((resolve) => setTimeout(resolve, waitTime));
      currentDelay = Math.min(currentDelay * config.backoffFactor, config.maxDelayMs);
    }
  }

  throw lastError;
}