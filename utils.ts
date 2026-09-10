/**
 * Utility functions for handling high-precision crypto currency values
 * preventing floating-point inaccuracies by using BigInt.
 */

const ETH_DECIMALS = 18;

/**
 * Converts a raw integer string (e.g. Wei) to a decimal representation (e.g. Ether).
 */
export function formatUnits(value: bigint | string, decimals: number = ETH_DECIMALS): string {
  const bigintValue = typeof value === 'bigint' ? value : BigInt(value);
  const negative = bigintValue < 0n;
  const absoluteValue = negative ? -bigintValue : bigintValue;

  let fraction = (absoluteValue % BigInt(10 ** decimals)).toString();
  while (fraction.length < decimals) {
    fraction = '0' + fraction;
  }

  // Trim trailing zeros from the fraction
  fraction = fraction.replace(/0+$/, '');

  const whole = (absoluteValue / BigInt(10 ** decimals)).toString();
  const result = fraction === '' ? whole : `${whole}.${fraction}`;

  return negative ? `-${result}` : result;
}

/**
 * Converts a human-readable decimal string (e.g. Ether) to raw BigInt units (e.g. Wei).
 */
export function parseUnits(value: string, decimals: number = ETH_DECIMALS): bigint {
  const [whole, fraction = ''] = value.split('.');
  const trimmedFraction = fraction.slice(0, decimals).padEnd(decimals, '0');
  const wholePart = BigInt(whole) * BigInt(10 ** decimals);
  const fractionPart = BigInt(trimmedFraction);

  return value.startsWith('-') ? -(wholePart + fractionPart) : wholePart + fractionPart;
}

/**
 * Formats a crypto balance with its ticker symbol, limiting decimal display.
 */
export function displayBalance(
  value: bigint | string,
  decimals: number = ETH_DECIMALS,
  displayDecimals: number = 4,
  symbol: string = 'ETH'
): string {
  const formatted = formatUnits(value, decimals);
  const [whole, fraction = ''] = formatted.split('.');
  const truncatedFraction = fraction.slice(0, displayDecimals);
  const displayValue = truncatedFraction ? `${whole}.${truncatedFraction}` : whole;
  return `${displayValue} ${symbol}`;
}