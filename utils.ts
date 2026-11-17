export interface PricePoint {
  timestamp: number;
  price: number;
}

/**
 * optimized moving average calculation using sliding window
 * reduces O(n^2) complexity to O(n) for crypto analysis
 */
export function calculateMovingAverage(
  data: PricePoint[],
  windowSize: number
): number[] {
  if (windowSize <= 0 || data.length < windowSize) return [];

  const results: number[] = [];
  let currentSum = 0;

  for (let i = 0; i < data.length; i++) {
    currentSum += data[i].price;

    if (i >= windowSize) {
      currentSum -= data[i - windowSize].price;
    }

    if (i >= windowSize - 1) {
      results.push(currentSum / windowSize);
    }
  }

  return results;
}

/**
 * memoized price formatter to reduce garbage collection
 */
const formatterCache = new Map<number, string>();
export function formatPrice(price: number, decimals: number = 2): string {
  const key = price * Math.pow(10, decimals);
  if (formatterCache.has(key)) return formatterCache.get(key)!;

  const formatted = price.toFixed(decimals);
  if (formatterCache.size > 1000) formatterCache.clear();
  
  formatterCache.set(key, formatted);
  return formatted;
}