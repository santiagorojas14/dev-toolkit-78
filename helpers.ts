export interface TokenAmountOptions {
  decimals?: number;
  symbol?: string;
  compact?: boolean;
}

/**
 * Truncates a crypto wallet address for display purposes.
 * Example: 0x1234567890abcdef1234567890abcdef12345678 -> 0x1234...5678
 */
export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Converts raw token units (e.g., Wei, Satoshi) to human-readable balance format.
 */
export function formatTokenBalance(
  rawAmount: string | bigint,
  decimals = 18,
  displayDecimals = 4
): string {
  const amountBigInt = typeof rawAmount === 'string' ? BigInt(rawAmount) : rawAmount;
  const base = BigInt(10);
  const divisor = base ** BigInt(decimals);

  const integerPart = amountBigInt / divisor;
  const remainder = amountBigInt % divisor;

  if (remainder === 0n) {
    return integerPart.toString();
  }

  const remainderStr = remainder.toString().padStart(decimals, '0');
  const trimmedRemainder = remainderStr.slice(0, displayDecimals).replace(/0+$/, '');

  return trimmedRemainder.length > 0
    ? `${integerPart.toString()}.${trimmedRemainder}`
    : integerPart.toString();
}

/**
 * Validates basic Ethereum address format.
 */
export function isValidEthAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}