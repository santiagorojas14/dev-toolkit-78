import { BigNumber } from 'ethers';

/**
 * Formats a raw crypto balance to a human-readable string
 */
export const formatUnits = (value: string | BigNumber, decimals: number = 18): string => {
  const bn = BigNumber.from(value);
  const divisor = BigNumber.from(10).pow(decimals);
  return (bn.div(divisor)).toString() + '.' + (bn.mod(divisor)).toString().padStart(decimals, '0').slice(0, 4);
};

/**
 * Validates standard crypto addresses
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Calculates slippage impact for trading operations
 */
export const calculateSlippage = (amountIn: string, expectedOut: string, actualOut: string): number => {
  const expected = parseFloat(expectedOut);
  const actual = parseFloat(actualOut);
  if (expected === 0) return 0;
  return ((expected - actual) / expected) * 100;
};

/**
 * Delays execution for rate-limited RPC calls
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};