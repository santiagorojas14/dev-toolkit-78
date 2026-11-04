/**
 * Utility helpers for formatting and validating cryptocurrency data.
 */

/**
 * Options for formatting a wallet address.
 */
export interface FormatAddressOptions {
  /** Number of leading characters to retain (including 0x). Default: 6 */
  prefixLength?: number;
  /** Number of trailing characters to retain. Default: 4 */
  suffixLength?: number;
}

/**
 * Truncates an Ethereum or crypto wallet address for display purposes.
 *
 * @param address - The full hex address string.
 * @param options - Configuration for truncation lengths.
 * @returns The formatted truncated address string.
 */
export function formatAddress(
  address: string,
  options: FormatAddressOptions = {}
): string {
  const { prefixLength = 6, suffixLength = 4 } = options;

  if (!address || address.length <= prefixLength + suffixLength) {
    return address;
  }

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);
  return `${prefix}...${suffix}`;
}

/**
 * Converts a Gwei value into Wei BigInt.
 *
 * @param gwei - Amount in Gwei (numeric or string representation).
 * @returns BigInt representation of the value in Wei.
 */
export function gweiToWei(gwei: number | string): bigint {
  const gweiNum = typeof gwei === 'string' ? parseFloat(gwei) : gwei;
  if (isNaN(gweiNum) || gweiNum < 0) {
    throw new Error('Invalid Gwei value provided');
  }
  const weiMultiplier = 1_000_000_000n;
  const integerGwei = BigInt(Math.floor(gweiNum));
  const fractionalGwei = BigInt(Math.round((gweiNum % 1) * 1_000_000_000));
  return integerGwei * weiMultiplier + fractionalGwei;
}

/**
 * Validates whether a given string is a valid Ethereum hex address.
 *
 * @param address - String to be checked for hex address format.
 * @returns Boolean indicating validity of address format.
 */
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
