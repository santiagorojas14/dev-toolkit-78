interface CryptoPrice {
  symbol: string;
  price: number;
  timestamp: number;
}

/**
 * Formats raw asset data for frontend display
 * Normalizes numeric values and adds validation timestamps
 */
export const formatAssetData = (raw: any): CryptoPrice => {
  if (!raw || typeof raw.price !== 'number') {
    throw new Error('Invalid crypto data payload provided');
  }

  return {
    symbol: String(raw.symbol).toUpperCase(),
    price: parseFloat(raw.price.toFixed(8)),
    timestamp: Date.now()
  };
};

/**
 * Calculates percentage change between two price points
 * Returns 0 if current price is unavailable
 */
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Sanitizes crypto pair strings to ensure consistent formatting
 * e.g., 'btc-usd' -> 'BTC/USD'
 */
export const sanitizePair = (pair: string): string => {
  return pair.replace(/[-_]/, '/').toUpperCase();
};

export type { CryptoPrice };