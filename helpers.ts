/**
 * Utility helper functions for common cryptocurrency data formatting and validation tasks.
 */

/**
 * Truncates a crypto wallet address (e.g., Ethereum or Bitcoin address) to a readable format.
 *
 * @param address - The full wallet address to truncate.
 * @param startLength - The number of characters to keep at the start. Default is 6.
 * @param endLength - The number of characters to keep at the end. Default is 4.
 * @returns The truncated address (e.g., "0x1234...abcd"), or the original address if too short.
 */
export function truncateAddress(
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address || address.length <= startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * Formats a raw crypto balance represented as a bigint or string (in smallest unit/wei/satoshi) into a decimal string.
 *
 * @param rawBalance - The raw balance as a BigInt, string, or number.
 * @param decimals - The token decimals (e.g., 18 for ETH, 8 for BTC). Default is 18.
 * @param precision - The number of decimal places to display in the formatted output. Default is 4.
 * @returns The formatted balance as a readable string.
 */
export function formatCryptoBalance(
  rawBalance: bigint | string | number,
  decimals: number = 18,
  precision: number = 4
): string {
  const base = BigInt(rawBalance.toString());
  const divisor = 10n ** BigInt(decimals);
  
  const integerPart = base / divisor;
  const remainder = base % divisor;
  
  if (remainder === 0n) {
    return integerPart.toString();
  }
  
  let fractionalPart = remainder.toString().padStart(decimals, '0');
  // Trim trailing zeros
  fractionalPart = fractionalPart.replace(/0+$/, '');
  
  if (fractionalPart.length > precision) {
    fractionalPart = fractionalPart.substring(0, precision);
  }
  
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart.toString();
}

/**
 * Validates whether a given string is a valid hexadecimal transaction hash.
 * Supports standard EVM transaction hashes (0x followed by 64 hex characters).
 *
 * @param hash - The transaction hash string to validate.
 * @returns True if the hash is valid, false otherwise.
 */
export function isValidTxHash(hash: string): boolean {
  const evmTxHashRegex = /^0x([A-Fa-f0-9]{64})$/;
  return evmTxHashRegex.test(hash);
}