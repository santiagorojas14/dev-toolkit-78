export interface PriceData {
  symbol: string;
  price: number;
  timestamp: number;
}

/**
 * Normalizes crypto price data for internal processing
 */
export const formatPrice = (raw: any): PriceData => {
  return {
    symbol: String(raw.s).toUpperCase(),
    price: parseFloat(raw.p),
    timestamp: Date.now(),
  };
};

/**
 * Retries a promise-based operation with exponential backoff
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((res) => setTimeout(res, delay));
    return withRetry(fn, retries - 1, delay * 2);
  }
};

/**
 * Validates crypto wallet addresses basic length and prefix
 */
export const isValidAddress = (address: string): boolean => {
  const hexRegex = /^0x[a-fA-F0-9]{40}$/;
  return hexRegex.test(address);
};