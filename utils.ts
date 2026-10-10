export interface PricePoint {
  timestamp: number;
  value: number;
}

/**
 * Optimized lookup for high-frequency price data
 * uses a simple binary search to minimize overhead
 */
export const findClosestTimestamp = (
  data: PricePoint[],
  target: number
): PricePoint | null => {
  if (data.length === 0) return null;

  let left = 0;
  let right = data.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (data[mid].timestamp === target) return data[mid];
    if (data[mid].timestamp < target) left = mid + 1;
    else right = mid - 1;
  }

  const prev = data[right] ?? data[0];
  const next = data[left] ?? data[data.length - 1];

  return Math.abs(target - prev.timestamp) < Math.abs(target - next.timestamp)
    ? prev
    : next;
};

/**
 * Memoized calculation wrapper for expensive crypto math
 */
export const createMemoizedCalculator = <T, R>(fn: (arg: T) => R) => {
  const cache = new Map<string, R>();
  return (arg: T): R => {
    const key = JSON.stringify(arg);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(arg);
    cache.set(key, result);
    return result;
  };
};