import { BigNumber } from 'ethers';

/**
 * Formats token amount from raw BigNumber to human-readable string
 */
export const formatTokenAmount = (amount: BigNumber, decimals: number): string => {
  const divisor = BigNumber.from(10).pow(decimals);
  return (amount.div(divisor)).toString() + '.' + (amount.mod(divisor)).toString().padStart(decimals, '0').slice(0, 4);
};

/**
 * Calculates slippage output based on bps (basis points)
 */
export const calculateSlippage = (amount: BigNumber, bps: number): BigNumber => {
  return amount.mul(10000 - bps).div(10000);
};

/**
 * Validates standard crypto wallet address format
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Safely parses string to BigNumber with error handling
 */
export const safeParseUnits = (value: string, decimals: number): BigNumber => {
  try {
    return BigNumber.from(value).mul(BigNumber.from(10).pow(decimals));
  } catch (err) {
    console.error('Invalid token conversion:', err);
    return BigNumber.from(0);
  }
};