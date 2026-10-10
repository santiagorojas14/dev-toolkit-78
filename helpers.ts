interface CryptoPrice {
  symbol: string;
  priceUsd: number;
  timestamp: number;
}

/**
 * Normalizes raw API response into standard application format
 */
export const formatPriceData = (data: any): CryptoPrice => {
  if (!data?.s || typeof data.p !== 'string') {
    throw new Error('Invalid crypto payload structure');
  }

  return {
    symbol: String(data.s).toUpperCase(),
    priceUsd: parseFloat(data.p),
    timestamp: Date.now(),
  };
};

/**
 * Calculates percentage change between two values
 */
export const calculateDelta = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Sanitizes numeric values to fixed decimal precision
 */
export const formatPrecision = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

/**
 * Validates common crypto ticker patterns
 */
export const isValidTicker = (ticker: string): boolean => {
  const pattern = /^[A-Z0-9]{2,10}$/;
  return pattern.test(ticker);
};