export interface CryptoPrice {
  symbol: string;
  price: number;
  timestamp: number;
  source: string;
}

export interface MarketStats {
  volume24h: number;
  marketCap: number;
  changePercent: number;
}

/**
 * Normalizes raw API data into standardized crypto interfaces
 */
export function formatCryptoData(raw: any): CryptoPrice {
  if (!raw.symbol || typeof raw.price !== 'number') {
    throw new Error('Invalid crypto data payload structure');
  }

  return {
    symbol: raw.symbol.toUpperCase(),
    price: parseFloat(raw.price.toFixed(8)),
    timestamp: Date.now(),
    source: raw.provider || 'unknown'
  };
}

/**
 * Calculates percentage change between two price points
 */
export const calculateDelta = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export type PriceUpdateCallback = (data: CryptoPrice) => void;