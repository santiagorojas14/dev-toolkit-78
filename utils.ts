/**
 * Utility functions for common cryptocurrency and blockchain operations.
 */

/**
 * Formats a raw token amount (in the smallest unit, like Wei or Satoshis) 
 * into a human-readable decimal string representation.
 * 
 * @param amount - The raw amount as a bigint, string, or number.
 * @param decimals - The number of decimals the token uses (e.g., 18 for ETH, 8 for BTC).
 * @returns The formatted decimal string.
 */
export function formatCryptoAmount(
  amount: bigint | string | number,
  decimals: number
): string {
  const bigAmount = BigInt(amount);
  const divisor = 10n ** BigInt(decimals);
  
  const integerPart = bigAmount / divisor;
  const fractionalPart = bigAmount % divisor;
  
  if (fractionalPart === 0n) {
    return integerPart.toString();
  }
  
  // Pad fractional part with leading zeros if necessary
  let fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  
  // Trim trailing zeros from fractional part for cleaner representation
  fractionalStr = fractionalStr.replace(/0+$/, '');
  
  return `${integerPart}.${fractionalStr}`;
}

/**
 * Validates whether a given string is a standard Ethereum address format.
 * Supports both standard 40-character hex addresses (with or without '0x' prefix).
 * 
 * @param address - The string to validate.
 * @returns True if the string matches the Ethereum address format, false otherwise.
 */
export function isValidEthAddress(address: string): boolean {
  if (typeof address !== 'string') {
    return false;
  }
  
  // Check if it matches the 40 hex character pattern, optional '0x' prefix
  const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  return ethAddressRegex.test(address);
}
