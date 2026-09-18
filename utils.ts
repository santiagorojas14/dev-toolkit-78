/**
 * Crypto utility functions for dev-toolkit-78
 */

export interface Transaction {
  id: string;
  amount: bigint;
  recipient: string;
  timestamp: number;
}

/**
 * Formats a BigInt crypto amount into a readable string
 */
export const formatUnits = (value: bigint, decimals: number = 18): string => {
  const divisor = BigInt(10) ** BigInt(decimals);
  const integerPart = value / divisor;
  const fractionalPart = value % divisor;

  return `${integerPart}.${fractionalPart.toString().padStart(decimals, '0')}`;
};

/**
 * Validates a basic hexadecimal address string
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Generates a mock transaction object for testing purposes
 */
export const createMockTx = (recipient: string, amount: bigint): Transaction => {
  return {
    id: Math.random().toString(36).substring(2),
    amount,
    recipient,
    timestamp: Date.now(),
  };
};

/**
 * Safely calculates fee based on a percentage (basis points)
 */
export const calculateFee = (amount: bigint, basisPoints: number): bigint => {
  return (amount * BigInt(basisPoints)) / BigInt(10000);
};