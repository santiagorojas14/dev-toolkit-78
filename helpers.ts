/**
 * Optimized price parsing for high-frequency crypto feeds
 * Uses a map-based cache to avoid redundant decimal parsing
 */

const cache = new Map<string, number>();

export const parsePrice = (priceString: string): number => {
  if (cache.has(priceString)) {
    return cache.get(priceString)!;
  }

  // Limit cache size to 1000 entries for memory management
  if (cache.size >= 1000) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }

  const parsed = parseFloat(priceString);
  cache.set(priceString, parsed);
  return parsed;
};

/**
 * Batch update processor to reduce event loop blocking
 */
export const processBatch = <T>(items: T[], callback: (item: T) => void): void => {
  const CHUNK_SIZE = 50;
  let index = 0;

  const run = () => {
    const end = Math.min(index + CHUNK_SIZE, items.length);
    for (; index < end; index++) {
      callback(items[index]);
    }

    if (index < items.length) {
      setTimeout(run, 0);
    }
  };

  run();
};

export const clearCache = (): void => {
  cache.clear();
};