export interface PriceData {
  symbol: string;
  price: number;
  timestamp: number;
}

/**
 * Normalizes raw crypto API response into a standard format
 */
export const formatPriceData = (raw: any): PriceData => {
  if (!raw?.s || !raw?.p) {
    throw new Error('Invalid crypto price payload structure');
  }

  return {
    symbol: String(raw.s),
    price: parseFloat(raw.p),
    timestamp: raw.t || Date.now(),
  };
};

/**
 * Safely calculates percentage change between two values
 */
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Rounds crypto values for cleaner UI display
 */
export const formatCurrency = (amount: number, decimals: number = 2): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};