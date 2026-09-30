/**
 * Converts a raw token balance (BigInt or string) to a human-readable decimal string.
 * Useful for formatting ERC-20 tokens (e.g., 18 decimals) or Bitcoin (8 decimals).
 */
export function formatTokenAmount(amount: bigint | string, decimals: number = 18): string {
  const amt = BigInt(amount);
  const base = 10n ** BigInt(decimals);
  const integerPart = amt / base;
  const fractionalPart = amt % base;

  if (fractionalPart === 0n) {
    return integerPart.toString();
  }

  // Pad fractional part with leading zeros
  let fractionStr = fractionalPart.toString().padStart(decimals, '0');
  // Trim trailing zeros for cleaner representation
  fractionStr = fractionStr.replace(/0+$/, '');

  return `${integerPart}.${fractionStr}`;
}

/**
 * Parses a decimal string (human readable) into a raw token amount BigInt based on decimals.
 */
export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  const parts = amount.split('.');
  if (parts.length > 2) {
    throw new Error('Invalid decimal format');
  }

  const [integerPart, fractionalPart = ''] = parts;
  const cleanFractionalStr = fractionalPart.slice(0, decimals).padEnd(decimals, '0');

  const integerVal = BigInt(integerPart) * (10n ** BigInt(decimals));
  const fractionalVal = BigInt(cleanFractionalStr);

  return integerVal + fractionalVal;
}

/**
 * Masks a crypto address for UI presentation (e.g., 0x1234...5678)
 */
export function maskAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}