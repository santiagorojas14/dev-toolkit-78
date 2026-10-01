/**
 * Utility functions for formatting and validating cryptocurrency data.
 */

/**
 * Options for formatting cryptocurrency token amounts.
 */
export interface FormatOptions {
  /** Number of decimal places to include in the formatted string. Default is 4. */
  decimals?: number;
  /** Symbol or ticker to append to the formatted output (e.g., "ETH", "BTC"). */
  symbol?: string;
}

/**
 * Formats a raw atomic token amount into a human-readable decimal string.
 *
 * @param amount - The raw amount as a bigint or string representation.
 * @param baseDecimals - The base decimals for the token (e.g., 18 for ETH, 8 for BTC).
 * @param options - Additional formatting options such as display decimals and symbol.
 * @returns Formatted cryptocurrency string.
 */
export function formatCryptoAmount(
  amount: bigint | string,
  baseDecimals: number,
  options: FormatOptions = {}
): string {
  const { decimals = 4, symbol } = options;
  const rawBigInt = typeof amount === 'string' ? BigInt(amount) : amount;
  const base = BigInt(10 ** baseDecimals);
  
  const integerPart = rawBigInt / base;
  const fractionalPart = rawBigInt % base;
  
  const paddedFraction = fractionalPart.toString().padStart(baseDecimals, '0');
  const trimmedFraction = paddedFraction.slice(0, decimals).replace(/0+$/, '');
  
  const formattedNumber = trimmedFraction.length > 0 
    ? `${integerPart.toString()}.${trimmedFraction}` 
    : integerPart.toString();

  return symbol ? `${formattedNumber} ${symbol}` : formattedNumber;
}

/**
 * Truncates a crypto wallet address for user interface display.
 *
 * @param address - The full public address string.
 * @param startChars - Number of characters to preserve at the start. Default is 6.
 * @param endChars - Number of characters to preserve at the end. Default is 4.
 * @returns Truncated address string (e.g., "0x1234...abcd").
 */
export function truncateAddress(
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Validates whether a given string is a valid hexadecimal transaction hash.
 *
 * @param hash - The transaction hash string to validate.
 * @param expectedLength - Expected string length including prefix (default 66 for 32-byte EVM hash).
 * @returns True if valid hex string with expected length, false otherwise.
 */
export function isValidTxHash(hash: string, expectedLength: number = 66): boolean {
  if (!hash || hash.length !== expectedLength) {
    return false;
  }
  return /^0x[0-9a-fA-F]+$/.test(hash);
}