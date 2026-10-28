import { BigNumber } from 'ethers';

/**
 * Converts wei string to formatted token decimal string
 */
export const formatTokenAmount = (amount: string, decimals: number = 18): string => {
  const bn = BigNumber.from(amount);
  const divisor = BigNumber.from(10).pow(decimals);
  return (bn.div(divisor)).toString() + '.' + (bn.mod(divisor)).toString().padStart(decimals, '0');
};

/**
 * Calculates slippage-adjusted minimum output amount
 */
export const calculateMinOutput = (amountIn: string, slippageBps: number): string => {
  const bn = BigNumber.from(amountIn);
  const slippageFactor = 10000 - slippageBps;
  return bn.mul(slippageFactor).div(10000).toString();
};

/**
 * Truncates ethereum addresses for UI display
 */
export const shortenAddress = (address: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * Delay execution for retry logic or rate limiting
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Safely parses transaction errors
 */
export const parseContractError = (error: any): string => {
  return error?.data?.message || error?.message || 'unknown transaction error';
};