/**
 * Crypto utility helpers for dev-toolkit-78
 */

export interface TransactionConfig {
  asset: string;
  amount: bigint;
  recipient: string;
  gasLimit?: number;
}

/**
 * Validates crypto address format against simple heuristic
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Normalizes asset amounts from human-readable strings to atomic units
 */
export const toAtomicUnits = (amount: string, decimals: number): bigint => {
  const [integer, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(integer + paddedFraction);
};

/**
 * Calculates estimated gas cost based on standard rate
 */
export const calculateGasCost = (limit: number, priceGwei: number): bigint => {
  return BigInt(limit) * BigInt(priceGwei) * 1_000_000_000n;
};

/**
 * Formats big integers for UI display with precision
 */
export const formatCurrency = (amount: bigint, decimals: number): string => {
  const str = amount.toString().padStart(decimals + 1, '0');
  const splitPoint = str.length - decimals;
  return `${str.slice(0, splitPoint)}.${str.slice(splitPoint)}`;
};