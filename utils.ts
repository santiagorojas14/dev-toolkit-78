/**
 * Optimized LRU cache for expensive cryptographic calculations
 * like public key derivation or signature verification results.
 */
export class CryptoLRUCache<T> {
  private cache = new Map<string, T>();
  private readonly maxEntries: number;

  constructor(maxEntries = 1000) {
    this.maxEntries = maxEntries;
  }

  public get(key: string): T | undefined {
    const hasKey = this.cache.has(key);
    if (hasKey) {
      const val = this.cache.get(key)!;
      // Refresh key priority in map
      this.cache.delete(key);
      this.cache.set(key, val);
      return val;
    }
    return undefined;
  }

  public set(key: string, value: T): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxEntries) {
      // Map maintains insertion order, first element is the oldest
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, value);
  }

  public clear(): void {
    this.cache.clear();
  }

  public get size(): number {
    return this.cache.size;
  }
}