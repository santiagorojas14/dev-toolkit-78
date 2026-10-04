/**
 * Crypto utility helpers for dev-toolkit-78
 */

export interface TransactionRecord {
  hash: string;
  amount: bigint;
  timestamp: number;
}

/**
 * Formats a BigInt crypto amount into a human-readable decimal string
 */
export const formatAmount = (amount: bigint, decimals: number = 18): string => {
  const divisor = BigInt(10) ** BigInt(decimals);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;

  return `${integerPart}.${fractionalPart.toString().padStart(decimals, '0')}`;
};

/**
 * Validates a standard hexadecimal hash string
 */
export const isValidHash = (hash: string): boolean => {
  return /^0x[0-9a-fA-F]{64}$/.test(hash);
};

/**
 * Safely parses a string into a BigInt to prevent overflow errors
 */
export const safeParseBigInt = (value: string | number): bigint => {
  try {
    return BigInt(value);
  } catch (error) {
    console.error('Failed to parse bigint', error);
    return 0n;
  }
};

/**
 * Calculates the absolute difference between two crypto amounts
 */
export const getDelta = (a: bigint, b: bigint): bigint => {
  return a > b ? a - b : b - a;
};