interface CryptoPrice {
  symbol: string;
  priceUsd: number;
  timestamp: number;
}

/**
 * Formats raw API price data for internal toolkit consumption
 */
export const formatPriceData = (rawData: any): CryptoPrice | null => {
  if (!rawData || typeof rawData !== 'object') return null;

  const price = parseFloat(rawData.price || rawData.last_price);
  if (isNaN(price)) return null;

  return {
    symbol: String(rawData.symbol || 'UNKNOWN').toUpperCase(),
    priceUsd: price,
    timestamp: Date.now(),
  };
};

/**
 * Calculates percentage change between two price points
 */
export const calculateDelta = (oldPrice: number, newPrice: number): number => {
  if (oldPrice === 0) return 0;
  return ((newPrice - oldPrice) / oldPrice) * 100;
};

/**
 * Sanitizes crypto address strings by removing whitespace
 */
export const sanitizeAddress = (address: string): string => {
  return address.trim().replace(/\s+/g, '');
};