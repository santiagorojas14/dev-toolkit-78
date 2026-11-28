export interface RetryOptions {
  retries: number;
  delayMs: number;
}

/**
 * executes an async operation with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { retries: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= options.retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt < options.retries) {
        const backoff = options.delayMs * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  throw lastError;
}

/**
 * wraps a network call to ensure resilient connectivity
 */
export async function fetchWithRetry<T>(url: string, init?: RequestInit): Promise<T> {
  return withRetry(async () => {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`request failed with status ${response.status}`);
    }
    return response.json() as Promise<T>;
  });
}