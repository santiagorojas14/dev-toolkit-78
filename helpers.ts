import { BigNumber } from 'ethers';

/**
 * Formats a wei value to a human-readable string
 */
export const formatUnits = (value: string | bigint, decimals: number = 18): string => {
  const divisor = BigInt(10) ** BigInt(decimals);
  const quotient = BigInt(value) / divisor;
  const remainder = BigInt(value) % divisor;
  return `${quotient}.${remainder.toString().padStart(decimals, '0').slice(0, 6)}`;
};

/**
 * Safely parses string amount to BigNumber for contract interaction
 */
export const parseAmount = (amount: string, decimals: number = 18): bigint => {
  const [integer, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(integer + paddedFraction);
};

/**
 * Calculates percentage impact for trade slippage
 */
export const calculateSlippage = (amount: bigint, slippagePercent: number): bigint => {
  const factor = BigInt(Math.floor(slippagePercent * 100));
  return (amount * factor) / 10000n;
};

/**
 * Validates address format for EVM chains
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};