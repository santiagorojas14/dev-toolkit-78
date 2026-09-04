export interface CryptoPrice {
  symbol: string;
  price: number;
  timestamp: number;
}

/**
 * Calculates the weighted average price from a list of market ticks
 */
export const calculateWeightedAverage = (ticks: CryptoPrice[]): number => {
  if (ticks.length === 0) return 0;

  const totalValue = ticks.reduce((acc, tick) => acc + tick.price, 0);
  return totalValue / ticks.length;
};

/**
 * Formats a crypto amount to a localized string with specific precision
 */
export const formatCurrency = (amount: number, precision: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(amount);
};

/**
 * Validates that an asset symbol conforms to crypto standard naming
 */
export const isValidSymbol = (symbol: string): boolean => {
  const symbolRegex = /^[A-Z0-9]{2,10}$/;
  return symbolRegex.test(symbol);
};

/**
 * Normalizes numeric inputs to prevent float precision issues
 */
export const sanitizePrice = (value: number | string): number => {
  const parsed = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
};