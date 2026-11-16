export interface CryptoPrice {
  symbol: string;
  price: number;
  timestamp: number;
  source: 'binance' | 'coinbase' | 'kraken';
}

export interface MarketVolume {
  baseSymbol: string;
  quoteSymbol: string;
  volume24h: number;
  liquidityDepth: number;
}

/**
 * Normalizes raw API responses into application-standard types
 */
export const normalizePriceData = (raw: any): CryptoPrice => ({
  symbol: String(raw.s || raw.symbol).toUpperCase(),
  price: parseFloat(raw.p || raw.price),
  timestamp: Date.now(),
  source: raw.src || 'binance'
});

/**
 * Validates price stability for high-frequency trades
 */
export const isValidPrice = (data: CryptoPrice): boolean => {
  return !isNaN(data.price) && data.price > 0 && data.symbol.length <= 6;
};