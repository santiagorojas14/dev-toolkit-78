import { ethers } from 'ethers';

/**
 * Formats a wei value to a human-readable ether string
 */
export const formatEtherBalance = (balance: bigint, decimals: number = 18): string => {
  return ethers.formatUnits(balance, decimals);
};

/**
 * Validates an ethereum address format
 */
export const isValidAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

/**
 * Calculates slippage for trade operations
 */
export const calculateSlippageAmount = (
  amount: bigint,
  slippageBasisPoints: bigint
): bigint => {
  const basis = 10000n;
  return (amount * slippageBasisPoints) / basis;
};

/**
 * Parses input string to raw BigInt units
 */
export const parseInputAmount = (amount: string, decimals: number = 18): bigint => {
  try {
    return ethers.parseUnits(amount, decimals);
  } catch {
    return 0n;
  }
};

/**
 * Normalizes address to checksum format
 */
export const normalizeAddress = (address: string): string => {
  return ethers.getAddress(address);
};