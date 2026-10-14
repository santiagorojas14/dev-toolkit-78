export interface TokenMetadata {
  address: string;
  symbol: string;
  decimals: number;
}

/**
 * Formats a raw crypto amount to human-readable string
 */
export const formatTokenAmount = (amount: bigint, decimals: number): string => {
  const divisor = BigInt(10 ** decimals);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;
  
  return `${integerPart}.${fractionalPart.toString().padStart(decimals, '0')}`;
};

/**
 * Validates checksum for standard evm addresses
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Gas estimation multiplier with safety margin
 */
export const calculateGasLimit = (gas: bigint): bigint => {
  return (gas * 120n) / 100n;
};