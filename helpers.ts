import { BigNumber } from 'ethers';

/**
 * Formats a wei value to a human-readable string
 */
export const formatUnits = (value: string | bigint, decimals: number = 18): string => {
  const divisor = BigInt(10) ** BigInt(decimals);
  const quotient = BigInt(value) / divisor;
  const remainder = BigInt(value) % divisor;
  return `${quotient}.${remainder.toString().padStart(decimals, '0')}`;
};

/**
 * Validates a standard EVM address format
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Calculates slippage-adjusted price for trade execution
 */
export const calculateSlippage = (
  price: number, 
  slippagePercent: number, 
  isBuy: boolean
): number => {
  const factor = 1 + (isBuy ? slippagePercent / 100 : -slippagePercent / 100);
  return price * factor;
};

/**
 * Delays execution for rate limiting purposes
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Sanitizes numeric input to handle string overflows
 */
export const parseSafeBigInt = (input: string | number): bigint => {
  try {
    return BigInt(input);
  } catch {
    return 0n;
  }
};