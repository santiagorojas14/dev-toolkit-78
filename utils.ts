/**
 * Crypto utility functions for dev-toolkit-78
 */

export interface AssetPrice {
  symbol: string;
  priceUsd: number;
  timestamp: number;
}

/**
 * Normalizes raw price data from multiple providers
 */
export const normalizePrice = (raw: any): AssetPrice => {
  if (!raw.symbol || typeof raw.price !== 'number') {
    throw new Error('Invalid price data structure provided');
  }

  return {
    symbol: raw.symbol.toUpperCase(),
    priceUsd: parseFloat(raw.price.toFixed(8)),
    timestamp: Date.now(),
  };
};

/**
 * Calculates percentage change between two values
 */
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Formats numeric values to standard crypto precision
 */
export const formatCurrency = (amount: number, decimals: number = 2): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};