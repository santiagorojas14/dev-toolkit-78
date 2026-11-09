import { createHash } from 'crypto';

interface CacheOptions {
  maxSize?: number;
  ttlMs?: number;
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

/**
 * High-performance LRU cache specifically optimized for frequent
 * cryptographic hash operations in high-throughput RPC pipelines.
 */
export class FastHashCache {
  private cache = new Map<string, CacheEntry<string>>();
  private readonly maxSize: number;
  private readonly ttlMs: number;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize ?? 5000;
    this.ttlMs = options.ttlMs ?? 60000;
  }

  public getSHA256(data: string): string {
    const now = Date.now();
    const cached = this.cache.get(data);

    if (cached && cached.expiresAt > now) {
      // Move to end of Map to maintain LRU eviction order
      this.cache.delete(data);
      this.cache.set(data, cached);
      return cached.value;
    }

    // Evict oldest entry if capacity exceeded
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    const hash = createHash('sha256').update(data).digest('hex');
    this.cache.set(data, { value: hash, expiresAt: now + this.ttlMs });
    return hash;
  }

  public pruneExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt <= now) {
        this.cache.delete(key);
      }
    }
  }

  public get size(): number {
    return this.cache.size;
  }
}