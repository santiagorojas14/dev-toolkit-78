import { BigNumber } from 'ethers';

/**
 * Helper functions for dev-toolkit-78 crypto operations
 */

export const formatUnits = (value: string | number | BigNumber, decimals: number = 18): string => {
  const bn = BigNumber.from(value);
  const divisor = BigNumber.from(10).pow(decimals);
  const quotient = bn.div(divisor);
  const remainder = bn.mod(divisor);
  
  return `${quotient.toString()}.${remainder.toString().padStart(decimals, '0')}`;
};

export const parseUnits = (value: string, decimals: number = 18): BigNumber => {
  const [integer, fraction = ''] = value.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigNumber.from(integer).mul(BigNumber.from(10).pow(decimals)).add(BigNumber.from(paddedFraction));
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const calculateGasBuffer = (gasLimit: BigNumber, multiplier: number = 1.2): BigNumber => {
  return gasLimit.mul(Math.floor(multiplier * 100)).div(100);
};