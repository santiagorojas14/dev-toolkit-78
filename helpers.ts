import { BigNumber } from 'ethers';

/**
 * Formats wei values to human-readable strings
 */
export const formatCryptoValue = (value: string | bigint, decimals: number = 18): string => {
  const bn = BigNumber.from(value);
  const divisor = BigNumber.from(10).pow(decimals);
  return (bn.div(divisor)).toString() + '.' + (bn.mod(divisor).toString().padStart(decimals, '0').slice(0, 4));
};

/**
 * Validates checksummed address format
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Calculates slippage tolerance for trade execution
 */
export const calculateSlippage = (amount: bigint, percent: number): bigint => {
  const factor = BigInt(Math.floor(percent * 100));
  return (amount * factor) / 10000n;
};

/**
 * Type guard for numeric inputs in crypto calculations
 */
export const isNumeric = (value: unknown): value is string | number | bigint => {
  if (typeof value === 'string') return !isNaN(Number(value));
  return typeof value === 'number' || typeof value === 'bigint';
};