/**
 * Optimized cache for hot crypto ticker data
 * Reduces object instantiation in high-frequency streams
 */

const TICKER_CACHE = new Map<string, number>();
const PRICE_BUFFER = new Float64Array(1024);

export const updateTickerPrice = (symbol: string, price: number, index: number): void => {
  TICKER_CACHE.set(symbol, price);
  
  // Using typed array for memory-efficient access
  if (index >= 0 && index < PRICE_BUFFER.length) {
    PRICE_BUFFER[index] = price;
  }
};

export const getCachedPrice = (symbol: string): number | undefined => {
  return TICKER_CACHE.get(symbol);
};

/**
 * Memoized calculation to prevent redundant math cycles
 */
export const calculateSlippage = (executionPrice: number, marketPrice: number): number => {
  if (marketPrice === 0) return 0;
  return (executionPrice - marketPrice) / marketPrice;
};

export const clearCache = (): void => {
  TICKER_CACHE.clear();
  PRICE_BUFFER.fill(0);
};