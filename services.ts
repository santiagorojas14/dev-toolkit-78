import { LRUCache } from 'lru-cache';

interface MarketData {
  price: number;
  timestamp: number;
}

// Cache for crypto price lookups to reduce network calls
const priceCache = new LRUCache<string, MarketData>({
  max: 500,
  ttl: 1000 * 30, // 30 seconds cache
});

export class CryptoService {
  /**
   * Fetches price with memoization layer
   */
  async getMarketPrice(symbol: string): Promise<number> {
    const cached = priceCache.get(symbol);
    if (cached) return cached.price;

    const freshPrice = await this.fetchFromExchange(symbol);
    priceCache.set(symbol, { price: freshPrice, timestamp: Date.now() });
    
    return freshPrice;
  }

  private async fetchFromExchange(symbol: string): Promise<number> {
    // Simulate network latency for niche exchange API
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Math.random() * 50000;
  }
}

export const cryptoService = new CryptoService();