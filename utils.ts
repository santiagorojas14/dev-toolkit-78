export interface PriceData {
  symbol: string;
  price: number;
  timestamp: number;
}

/**
 * Normalizes raw websocket data into standardized price format
 */
export const formatCryptoPrice = (data: any): PriceData => {
  if (!data || typeof data.p !== 'string' || typeof data.s !== 'string') {
    throw new Error('invalid crypto price payload structure');
  }

  return {
    symbol: data.s.toUpperCase(),
    price: parseFloat(data.p),
    timestamp: data.t || Date.now(),
  };
};

/**
 * Calculates percentage change between two price points
 */
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Precision truncation for volatile asset values
 */
export const formatDisplayPrice = (value: number, decimals: number = 2): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};