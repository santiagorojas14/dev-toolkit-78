export interface TokenPrice {
  symbol: string;
  priceUsd: number;
  timestamp: number;
}

export class CryptoPriceService {
  private cache: Map<string, TokenPrice> = new Map();
  private ttlMs: number;

  constructor(ttlSeconds: number = 60) {
    this.ttlMs = ttlSeconds * 1000;
  }

  /**
   * Retrieves cached price or fetches fresh data if expired.
   */
  public async getPrice(symbol: string, fetcher: (sym: string) => Promise<number>): Promise<TokenPrice> {
    const uppercaseSymbol = symbol.toUpperCase();
    const cached = this.cache.get(uppercaseSymbol);
    const now = Date.now();

    if (cached && (now - cached.timestamp < this.ttlMs)) {
      return cached;
    }

    const priceUsd = await fetcher(uppercaseSymbol);
    const entry: TokenPrice = {
      symbol: uppercaseSymbol,
      priceUsd,
      timestamp: now,
    };

    this.cache.set(uppercaseSymbol, entry);
    return entry;
  }

  /**
   * Purges stale entries from internal memory cache.
   */
  public purgeStaleCache(): number {
    const now = Date.now();
    let purgedCount = 0;

    for (const [symbol, entry] of this.cache.entries()) {
      if (now - entry.timestamp >= this.ttlMs) {
        this.cache.delete(symbol);
        purgedCount++;
      }
    }

    return purgedCount;
  }

  /**
   * Resets all cached token price data.
   */
  public clearAll(): void {
    this.cache.clear();
  }
}