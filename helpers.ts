import { createHash } from 'crypto';

/**
 * Optimized LRU cache for cryptographic hashing operations to prevent redundant CPU cycles.
 */
export class HashCache {
  private cache: Map<string, string>;
  private maxEntries: number;

  constructor(maxEntries = 1000) {
    this.cache = new Map();
    this.maxEntries = maxEntries;
  }

  /**
   * Computes the SHA-256 hash of a string, returning a cached result if available.
   */
  public sha256(data: string): string {
    const cached = this.cache.get(data);
    if (cached !== undefined) {
      // Refresh key position in the Map to maintain LRU order
      this.cache.delete(data);
      this.cache.set(data, cached);
      return cached;
    }

    const hash = createHash('sha256').update(data).digest('hex');

    if (this.cache.size >= this.maxEntries) {
      // Evict the least recently used entry (first key in insertion order)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(data, hash);
    return hash;
  }

  /**
   * Clears the current hash cache.
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * Returns the current size of the cache.
   */
  public size(): number {
    return this.cache.size;
  }
}