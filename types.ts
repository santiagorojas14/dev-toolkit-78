export interface CryptoPrice {
  symbol: string;
  priceUsd: number;
  timestamp: number;
  source: string;
}

export interface MarketVolume {
  baseSymbol: string;
  quoteSymbol: string;
  volume24h: number;
}

export type PriceMap = Record<string, CryptoPrice>;

/**
 * Validates crypto price structure
 */
export function isValidPrice(data: any): data is CryptoPrice {
  return (
    typeof data === 'object' &&
    typeof data.symbol === 'string' &&
    typeof data.priceUsd === 'number' &&
    !isNaN(data.priceUsd) &&
    typeof data.timestamp === 'number'
  );
}

/**
 * Calculates average from array of price entries
 */
export const calculateAveragePrice = (prices: CryptoPrice[]): number => {
  if (prices.length === 0) return 0;
  const sum = prices.reduce((acc, curr) => acc + curr.priceUsd, 0);
  return sum / prices.length;
};