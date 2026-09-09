/**
 * Fast LRU Cache for expensive crypto operations like address normalization
 * and public key validation.
 */
export class CryptoLRUCache<K, V> {
  private readonly maxCapacity: number;
  private cache: Map<K, V>;

  constructor(maxCapacity: number = 1000) {
    this.maxCapacity = maxCapacity;
    this.cache = new Map<K, V>();
  }

  public get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item !== undefined) {
      // Refresh key position for LRU strategy
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  public set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxCapacity) {
      // Evict oldest entry
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

// Global cache instance for address validation optimization
const addressNormalizeCache = new CryptoLRUCache<string, string>(5000);

/**
 * Optimizes address formatting by caching previously normalized crypto addresses.
 */
export function memoizedNormalizeAddress(address: string): string {
  const cached = addressNormalizeCache.get(address);
  if (cached) {
    return cached;
  }

  // Fast sanitization and lowercase conversion
  const sanitized = address.trim().toLowerCase();
  const normalized = sanitized.startsWith('0x') ? sanitized : `0x${sanitized}`;
  
  addressNormalizeCache.set(address, normalized);
  return normalized;
}