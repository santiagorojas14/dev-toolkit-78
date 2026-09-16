import { AxiosError } from 'axios';

/**
 * Configuration for network retry behavior
 */
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000;

export async function withRetry<T>(
  operation: () => Promise<T>,
  retries: number = MAX_RETRIES,
  delay: number = INITIAL_DELAY_MS
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const isRetryable = (error as AxiosError).response?.status !== 404;
    
    if (retries > 0 && isRetryable) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return withRetry(operation, retries - 1, delay * 2);
    }
    
    throw error;
  }
}

/**
 * Example wrapper for crypto market data fetch
 */
export const fetchPriceData = async (symbol: string) => {
  return withRetry(async () => {
    const response = await fetch(`https://api.crypto-provider.com/v1/price/${symbol}`);
    if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
    return response.json();
  });
};