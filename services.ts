export interface TokenData {
  symbol: string;
  priceUsd: number;
  decimals: number;
  lastUpdated: number;
}

export class TokenPriceCacheService {
  private cache = new Map<string, TokenData>();
  private readonly ttlMs: number;

  constructor(ttlSeconds = 60) {
    this.ttlMs = ttlSeconds * 1000;
  }

  /**
   * Caches token data or updates existing entry if expired.
   */
  public set(address: string, data: Omit<TokenData, 'lastUpdated'>): void {
    const normalizedAddress = address.toLowerCase();
    this.cache.set(normalizedAddress, {
      ...data,
      lastUpdated: Date.now(),
    });
  }

  /**
   * Retrieves active token data. Returns null if expired or not found.
   */
  public get(address: string): TokenData | null {
    const normalizedAddress = address.toLowerCase();
    const cached = this.cache.get(normalizedAddress);

    if (!cached) {
      return null;
    }

    const isExpired = Date.now() - cached.lastUpdated > this.ttlMs;
    if (isExpired) {
      this.cache.delete(normalizedAddress);
      return null;
    }

    return cached;
  }

  /**
   * Batch retrieves non-expired cached tokens.
   */
  public getBatch(addresses: string[]): Record<string, TokenData> {
    const result: Record<string, TokenData> = {};
    for (const address of addresses) {
      const cached = this.get(address);
      if (cached) {
        result[address.toLowerCase()] = cached;
      }
    }
    return result;
  }

  /**
   * Clears all expired items to prevent memory leaks.
   */
  public prune(): void {
    const now = Date.now();
    for (const [address, cached] of this.cache.entries()) {
      if (now - cached.lastUpdated > this.ttlMs) {
        this.cache.delete(address);
      }
    }
  }
}