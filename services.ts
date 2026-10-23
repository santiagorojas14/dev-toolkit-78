import { ethers } from 'ethers';

/**
 * Formats a crypto balance for UI display
 */
export const formatBalance = (balance: string, decimals: number = 18): string => {
  const parsed = ethers.formatUnits(balance, decimals);
  return parseFloat(parsed).toFixed(4);
};

/**
 * Validates an ethereum address format
 */
export const isValidAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

/**
 * Calculates slippage-adjusted amounts for swaps
 */
export const calculateSlippageAmount = (
  amount: bigint,
  slippageBasisPoints: bigint,
  isBuy: boolean = true
): bigint => {
  const basis = 10000n;
  const slippage = isBuy ? basis + slippageBasisPoints : basis - slippageBasisPoints;
  return (amount * slippage) / basis;
};

/**
 * Pausable delay for rate-limited RPC calls
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Normalizes error messages from contract reverts
 */
export const parseContractError = (error: any): string => {
  return error.reason || error.message || 'unknown transaction error';
};