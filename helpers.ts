import { BigNumber } from 'ethers';

/**
 * Converts human-readable token amount to atomic units
 */
export const toWei = (amount: string, decimals: number = 18): BigNumber => {
  const [integer, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigNumber.from(integer + paddedFraction);
};

/**
 * Safely formats address for display in UI
 */
export const truncateAddress = (address: string): string => {
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Delay execution for async polling cycles
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Calculate slippage impact on transaction value
 */
export const getSlippageLimit = (amount: BigNumber, slippageBps: number): BigNumber => {
  const basis = 10000;
  return amount.mul(basis - slippageBps).div(basis);
};