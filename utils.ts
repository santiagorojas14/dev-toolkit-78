import { ethers } from 'ethers';

/**
 * Formats wei string to decimal string for UI display
 */
export const formatUnits = (value: string, decimals: number = 18): string => {
  return ethers.formatUnits(value, decimals);
};

/**
 * Validates ethereum address format
 */
export const isValidAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

/**
 * Safely parses transaction amount to big integer
 */
export const parseAmount = (amount: string, decimals: number = 18): bigint => {
  try {
    return ethers.parseUnits(amount, decimals);
  } catch (error) {
    return 0n;
  }
};

/**
 * Truncates hash string for console logging
 */
export const truncateHash = (hash: string, length: number = 6): string => {
  if (hash.length <= length * 2) return hash;
  return `${hash.slice(0, length)}...${hash.slice(-length)}`;
};

/**
 * Sleeps for given milliseconds
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Calculates percentage slippage between two amounts
 */
export const calculateSlippage = (expected: bigint, actual: bigint): number => {
  const diff = expected - actual;
  return Number((diff * 10000n) / expected) / 100;
};