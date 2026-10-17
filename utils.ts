/**
 * Utility functions for crypto transaction data formatting and validation.
 */

export interface FormattedCryptoAmount {
  raw: string;
  formatted: string;
  symbol: string;
}

/**
 * Truncates a crypto wallet address for UI display.
 * Example: 0x1234567890abcdef1234567890abcdef12345678 -> 0x1234...5678
 */
export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Converts atomic crypto units (e.g., Satoshis, Wei) to standard units (e.g., BTC, ETH).
 */
export function formatCryptoBalance(
  amount: bigint | string | number,
  decimals: number = 18,
  symbol: string = 'ETH'
): FormattedCryptoAmount {
  const bigintAmount = typeof amount === 'bigint' ? amount : BigInt(amount.toString());
  const divisor = BigInt(10 ** decimals);
  
  const integerPart = bigintAmount / divisor;
  const remainderPart = bigintAmount % divisor;
  
  // Pad left with zeros to ensure full decimal precision length
  const remainderStr = remainderPart.toString().padStart(decimals, '0');
  // Trim trailing zeros for display
  const trimmedDecimal = remainderStr.replace(/0+$/, '');
  
  const formattedValue = trimmedDecimal.length > 0 
    ? `${integerPart.toString()}.${trimmedDecimal.slice(0, 6)}` 
    : integerPart.toString();

  return {
    raw: bigintAmount.toString(),
    formatted: `${formattedValue} ${symbol}`,
    symbol,
  };
}

/**
 * Validates basic hex structure of an EVM wallet address.
 */
export function isValidEvmAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}