import { BigNumber } from 'ethers';

/**
 * Formats raw crypto units to human-readable decimals
 */
export const formatUnits = (value: string | number, decimals: number = 18): string => {
  const bigValue = BigNumber.from(value.toString());
  const divisor = BigNumber.from(10).pow(decimals);
  
  const integerPart = bigValue.div(divisor).toString();
  const fractionalPart = bigValue.mod(divisor).toString().padStart(decimals, '0');
  
  return `${integerPart}.${fractionalPart.replace(/0+$/, '') || '0'}`;
};

/**
 * Sanitizes address strings for uniform comparison
 */
export const normalizeAddress = (address: string): string => {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('Invalid crypto address format');
  }
  return address.toLowerCase();
};

/**
 * Calculates percentage change between price points
 */
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Safely truncates long transaction hashes
 */
export const truncateHash = (hash: string, start: number = 6, end: number = 4): string => {
  if (hash.length <= start + end) return hash;
  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
};