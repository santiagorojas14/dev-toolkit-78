import { LRUCache } from 'lru-cache';

interface CryptoQuote {
  price: string;
  timestamp: number;
}

// Cache instance for expensive price lookups
const priceCache = new LRUCache<string, CryptoQuote>({
  max: 500,
  ttl: 1000 * 30, // 30 seconds expiry
});

/**
 * Fetches asset price with memoization to reduce API calls
 */
export const getCachedPrice = async (symbol: string): Promise<CryptoQuote> => {
  const cached = priceCache.get(symbol);
  if (cached) return cached;

  // Simulated network latency for crypto oracle lookup
  const response = await fetch(`https://api.dex-data.io/v1/price/${symbol}`);
  const data: CryptoQuote = await response.json();

  priceCache.set(symbol, data);
  return data;
};

/**
 * Bulk processing for high-frequency trading data
 */
export const processMarketUpdates = (updates: CryptoQuote[]): number => {
  return updates.reduce((acc, curr) => acc + parseFloat(curr.price), 0) / updates.length;
};