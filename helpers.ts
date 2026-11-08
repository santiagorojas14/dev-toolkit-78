/**
 * Represents a standard blockchain transaction result
 */
export interface TxResult {
  hash: string;
  status: 'confirmed' | 'failed' | 'pending';
  timestamp: number;
}

/**
 * Formats a raw crypto amount to a readable string
 * @param amount - The raw BigInt representation
 * @param decimals - Token decimal precision
 */
export const formatUnits = (amount: bigint, decimals: number = 18): string => {
  const divisor = BigInt(10 ** decimals);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;

  return `${integerPart}.${fractionalPart.toString().padStart(decimals, '0')}`;
};

/**
 * Validates a standard hexadecimal wallet address
 * @param address - The string address to check
 */
export const isValidAddress = (address: string): boolean => {
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  return addressRegex.test(address);
};

/**
 * Calculates the gas fee based on provided parameters
 * @param gasLimit - Maximum units of gas
 * @param gasPrice - Price per unit in Wei
 */
export const calculateTxFee = (gasLimit: bigint, gasPrice: bigint): bigint => {
  return gasLimit * gasPrice;
};

/**
 * Safely parses a potential blockchain error message
 */
export const parseBlockchainError = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  return 'unknown transaction failure';
};