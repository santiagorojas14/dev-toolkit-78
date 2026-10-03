import { BigNumber } from 'ethers';

/**
 * Formats a BigNumber to a human-readable string based on decimals
 */
export const formatUnits = (value: BigNumber, decimals: number = 18): string => {
  const divisor = BigNumber.from(10).pow(decimals);
  return value.div(divisor).toString();
};

/**
 * Validates crypto address format (basic hex check)
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Calculates gas fee for given amount and price
 */
export const calculateTxFee = (gasLimit: BigNumber, gasPrice: BigNumber): BigNumber => {
  return gasLimit.mul(gasPrice);
};

/**
 * Retries a promise-based function with simple backoff
 */
export const retryOperation = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryOperation(fn, retries - 1, delay * 2);
  }
};