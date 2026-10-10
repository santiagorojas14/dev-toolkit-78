import { ethers } from 'ethers';

/**
 * format wei to ether units for ui display
 */
export const formatBalance = (balance: bigint, decimals: number = 18): string => {
  return ethers.formatUnits(balance, decimals);
};

/**
 * calculate fee with slippage buffer for tx
 */
export const calculateSlippageAmount = (amount: bigint, slippagePercent: number): bigint => {
  const basisPoints = BigInt(Math.floor(slippagePercent * 100));
  return (amount * (10000n - basisPoints)) / 10000n;
};

/**
 * validate checksum address format
 */
export const isValidAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

/**
 * sleep utility for rate limiting requests
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * parse transaction error messages for logging
 */
export const parseTxError = (error: any): string => {
  if (error.reason) return error.reason;
  if (error.message) return error.message;
  return 'unknown transaction execution error';
};