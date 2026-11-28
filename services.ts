import { LRUCache } from 'lru-cache';

interface CryptoQuote {
  symbol: string;
  price: number;
  timestamp: number;
}

// Cache instance with 5 minute expiration for performance optimization
const quoteCache = new LRUCache<string, CryptoQuote>({
  max: 500,
  ttl: 1000 * 60 * 5,
});

/**
 * Fetches market data with memoization to reduce latency
 * for frequent redundant blockchain state queries
 */
export const getMarketQuote = async (symbol: string): Promise<CryptoQuote> => {
  const cached = quoteCache.get(symbol);
  if (cached) return cached;

  // Simulated external API call to node provider
  const response = await fetch(`https://api.dev-toolkit-78.io/v1/quote/${symbol}`);
  const data: CryptoQuote = await response.json();

  quoteCache.set(symbol, data);
  return data;
};

export const clearCache = (): void => {
  quoteCache.clear();
};