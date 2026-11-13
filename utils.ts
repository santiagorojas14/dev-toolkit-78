export interface CryptoPrice {
  symbol: string;
  price: number;
  timestamp: number;
}

/**
 * Normalizes raw api response data to local structure
 */
export const formatPriceData = (raw: any): CryptoPrice => {
  if (!raw?.s || !raw?.p) {
    throw new Error('invalid payload structure');
  }

  return {
    symbol: String(raw.s).toUpperCase(),
    price: parseFloat(raw.p),
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
 * Formats number for currency display
 */
export const formatCurrency = (value: number, precision: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: precision,
  }).format(value);
};