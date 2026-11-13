/**
 * Core performance interfaces for dev-toolkit-78
 * Uses fixed-point precision for crypto calculations
 */

export interface CryptoTransaction {
  readonly id: string;
  readonly amount: bigint;
  readonly timestamp: number;
}

export interface MemoizedResult<T> {
  readonly data: T;
  readonly lastUpdated: number;
}

/**
 * Optimized batch structure for memory efficiency
 */
export type TransactionBatch = Map<string, CryptoTransaction>;

/**
 * Constants for throughput performance tuning
 */
export const PERFORMANCE_CONFIG = {
  CACHE_TTL_MS: 5000,
  BATCH_SIZE_LIMIT: 1000,
  PRECISION_FACTOR: 10n ** 18n
} as const;

export function calculateGasFee(amount: bigint, gasPrice: bigint): bigint {
  return (amount * gasPrice) / PERFORMANCE_CONFIG.PRECISION_FACTOR;
}

export class PerformanceStore<T> {
  private cache: Map<string, MemoizedResult<T>> = new Map();

  public set(key: string, value: T): void {
    this.cache.set(key, { data: value, lastUpdated: Date.now() });
  }

  public get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || Date.now() - entry.lastUpdated > PERFORMANCE_CONFIG.CACHE_TTL_MS) {
      return null;
    }
    return entry.data;
  }
}