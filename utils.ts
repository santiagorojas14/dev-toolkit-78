import { BigNumber } from 'ethers';

/**
 * Formats token amounts for display purposes
 */
export const formatTokenAmount = (amount: string, decimals: number = 18): string => {
  const bn = BigNumber.from(amount);
  const divisor = BigNumber.from(10).pow(decimals);
  return (bn.div(divisor)).toString() + '.' + (bn.mod(divisor)).toString().padStart(decimals, '0').slice(0, 4);
};

/**
 * Calculates slippage impact for trading operations
 */
export const calculateSlippage = (expected: BigNumber, actual: BigNumber): number => {
  const diff = expected.sub(actual).abs();
  const percentage = diff.mul(10000).div(expected);
  return percentage.toNumber() / 100;
};

/**
 * Standardized retry wrapper for async network calls
 */
export async function retryOperation<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryOperation(fn, retries - 1, delay);
  }
}

/**
 * Validates checksum of crypto addresses
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};