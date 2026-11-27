export interface PriceData {
  symbol: string;
  price: number;
  timestamp: number;
}

/**
 * Normalizes raw websocket price streams into a standardized format.
 * Filters out invalid entries with non-positive prices.
 */
export const formatPriceUpdate = (data: any): PriceData | null => {
  if (!data || typeof data.p !== 'string' || typeof data.s !== 'string') {
    return null;
  }

  const price = parseFloat(data.p);

  if (isNaN(price) || price <= 0) {
    return null;
  }

  return {
    symbol: data.s.toUpperCase(),
    price,
    timestamp: data.t || Date.now(),
  };
};

/**
 * Calculates the percentage change between two price points.
 */
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Formats a number to a fixed crypto-friendly decimal precision.
 */
export const formatCurrency = (amount: number, decimals: number = 8): string => {
  return amount.toFixed(decimals).replace(/\.?0+$/, '');
};