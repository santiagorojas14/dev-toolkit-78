/**
 * Truncates a crypto address (e.g., Ethereum) to a readable format like 0x1234...abcd
 * @param address The full hex address
 * @param startChars Number of characters to keep at the start (default: 6)
 * @param endChars Number of characters to keep at the end (default: 4)
 */
export function truncateAddress(
  address: string,
  startChars = 6,
  endChars = 4
): string {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Formats a BigInt value (such as Wei) into a human-readable decimal string
 * @param value The value in the smallest unit (e.g., Wei)
 * @param decimals The decimal places of the token (default: 18 for ETH)
 * @param precision The maximum number of decimal places to show in the output
 */
export function formatCryptoAmount(
  value: bigint,
  decimals = 18,
  precision = 4
): string {
  const valueStr = value.toString();
  
  if (valueStr === '0') return '0';

  // Handle fractions smaller than 1 (e.g., 0.001)
  if (valueStr.length <= decimals) {
    const padded = valueStr.padStart(decimals, '0');
    const fraction = padded.slice(0, precision).replace(/0+$/, '');
    return fraction.length > 0 ? `0.${fraction}` : '0';
  }

  const integerPart = valueStr.slice(0, valueStr.length - decimals);
  let fractionPart = valueStr.slice(valueStr.length - decimals, valueStr.length - decimals + precision);
  
  // Remove trailing zeros
  fractionPart = fractionPart.replace(/0+$/, '');

  return fractionPart.length > 0 ? `${integerPart}.${fractionPart}` : integerPart;
}

/**
 * Validates whether a string is a standard 40-character hex address
 * @param address The address string to validate
 */
export function isValidHexAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}