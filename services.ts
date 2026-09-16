import { ethers } from 'ethers';

/**
 * Crypto helper service for dev-toolkit-78
 */

export const formatUnits = (value: string | bigint, decimals: number = 18): string => {
  return ethers.formatUnits(value, decimals);
};

export const parseUnits = (value: string, decimals: number = 18): bigint => {
  return ethers.parseUnits(value, decimals);
};

export const calculateSlippage = (amount: bigint, slippageBps: number): bigint => {
  // Calculate min output based on basis points (1 bps = 0.01%)
  const bpsDivisor = 10000n;
  return (amount * (bpsDivisor - BigInt(slippageBps))) / bpsDivisor;
};

export const truncateAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const isTransactionSuccessful = (receipt: { status?: number }): boolean => {
  return receipt.status === 1;
};