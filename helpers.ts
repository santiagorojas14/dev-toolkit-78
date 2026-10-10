import { ethers } from 'ethers';

/**
 * Format raw crypto balances from Wei to Ether units
 */
export const formatBalance = (balance: bigint, decimals: number = 18): string => {
  return ethers.formatUnits(balance, decimals);
};

/**
 * Validates checksum of a crypto wallet address
 */
export const isValidAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

/**
 * Converts numeric amounts to BigInt for contract interactions
 */
export const parseAmount = (amount: string, decimals: number = 18): bigint => {
  try {
    return ethers.parseUnits(amount, decimals);
  } catch (error) {
    return 0n;
  }
};

/**
 * Sleep helper for rate-limited RPC requests
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Truncates address for display purposes (e.g. 0x123...abc)
 */
export const truncateAddress = (address: string): string => {
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};