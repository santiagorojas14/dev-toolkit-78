import { BigNumber } from 'ethers';

/**
 * Formats a crypto balance for UI display
 */
export const formatUnits = (value: string | bigint, decimals: number = 18): string => {
  const bn = BigNumber.from(value);
  const divisor = BigNumber.from(10).pow(decimals);
  return (bn.div(divisor)).toString() + '.' + (bn.mod(divisor)).toString().padStart(decimals, '0').slice(0, 4);
};

/**
 * Normalizes addresses for comparison
 */
export const normalizeAddress = (address: string): string => {
  return address.toLowerCase().trim();
};

/**
 * Calculates slippage output amount
 */
export const calculateSlippage = (amount: string, slippageBasisPoints: number): string => {
  const val = BigNumber.from(amount);
  const result = val.mul(10000 - slippageBasisPoints).div(10000);
  return result.toString();
};

/**
 * Sleep utility for rate limiting
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};