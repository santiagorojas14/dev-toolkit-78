/**
 * Utility functions for crypto address formatting, unit conversion, and validation.
 */

export const WEI_PER_ETH = BigInt("1000000000000000000");
export const GWEI_PER_ETH = BigInt("1000000000");

/**
 * Truncates a crypto wallet address for UI display.
 */
export function truncateAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Validates if a string matches basic EVM address specifications.
 */
export function isValidEvmAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Converts Wei (BigInt) to Ether string representation with decimal precision control.
 */
export function formatWeiToEth(wei: bigint, decimals: number = 4): string {
  const integerPart = wei / WEI_PER_ETH;
  const remainder = wei % WEI_PER_ETH;

  if (remainder === 0n) {
    return integerPart.toString();
  }

  const remainderStr = remainder.toString().padStart(18, "0");
  const trimmedFraction = remainderStr.slice(0, decimals).replace(/0+$/, "");

  return trimmedFraction.length > 0
    ? `${integerPart}.${trimmedFraction}`
    : integerPart.toString();
}

/**
 * Safely converts Gwei values to Wei for transaction payload formatting.
 */
export function gweiToWei(gwei: number): bigint {
  if (gwei < 0) {
    throw new RangeError("Gwei value must be non-negative");
  }
  return BigInt(Math.floor(gwei * 1e9));
}