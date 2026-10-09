export interface PriceData {
  symbol: string;
  price: number;
  timestamp: number;
}

/**
 * Normalizes crypto price objects from varying exchange APIs
 */
export const formatPrice = (raw: any): PriceData => {
  return {
    symbol: String(raw.s || raw.symbol).toUpperCase(),
    price: parseFloat(raw.p || raw.price),
    timestamp: Date.now(),
  };
};

/**
 * Validates price data structure for dev-toolkit-78 processing
 */
export const isValidPrice = (data: PriceData): boolean => {
  return typeof data.price === 'number' && !isNaN(data.price) && data.symbol.length > 0;
};

/**
 * Calculates percentage change between two price points
 */
export const calculateDelta = (prev: number, current: number): number => {
  if (prev === 0) return 0;
  return ((current - prev) / prev) * 100;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};