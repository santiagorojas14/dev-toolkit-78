/**
 * Memoizes crypto price conversion results to reduce redundant calculations.
 * Uses an LRU-like pattern for memory efficiency in high-frequency trading loops.
 */
const cache = new Map<string, { value: number; expiry: number }>();
const TTL_MS = 5000;

export const getCachedPrice = (pair: string, fetcher: () => number): number => {
  const now = Date.now();
  const cached = cache.get(pair);

  if (cached && cached.expiry > now) {
    return cached.value;
  }

  const freshValue = fetcher();
  cache.set(pair, {
    value: freshValue,
    expiry: now + TTL_MS,
  });

  // Maintain heap size to prevent memory leaks
  if (cache.size > 100) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }

  return freshValue;
};

/**
 * Optimized batch processing for transaction status verification.
 * Reduces syscall overhead for crypto wallet synchronization tasks.
 */
export const batchProcess = <T, R>(items: T[], processor: (batch: T[]) => R[], chunkSize: number = 10): R[] => {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    results.push(...processor(chunk));
  }
  return results;
};