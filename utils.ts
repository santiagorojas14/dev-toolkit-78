/**
 * Truncates a crypto address (e.g., Ethereum, Solana) for UI display.
 * @param address The full wallet address
 * @param startLength Number of characters to keep at the start (default: 6)
 * @param endLength Number of characters to keep at the end (default: 4)
 */
export function truncateAddress(
  address: string,
  startLength = 6,
  endLength = 4
): string { 
  if (!address) return "";
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * Formats a raw bigint token/gas balance to a human-readable decimal string.
 * @param balance The raw balance as a BigInt (e.g., in wei)
 * @param decimals The decimal places of the token (default: 18 for ETH)
 * @param displayDecimals The maximum decimal places to show in the output (default: 4)
 */
export function formatUnits(
  balance: bigint | string,
  decimals = 18,
  displayDecimals = 4
): string {
  const balanceBI = typeof balance === "string" ? BigInt(balance) : balance;
  const base = 10n ** BigInt(decimals);
  const integerPart = balanceBI / base;
  const fractionalPart = balanceBI % base;

  if (fractionalPart === 0n) {
    return integerPart.toString();
  }

  let fractionStr = fractionalPart.toString().padStart(decimals, "0");
  // Trim trailing zeros
  fractionStr = fractionStr.replace(/0+$/, "");

  if (fractionStr.length > displayDecimals) {
    fractionStr = fractionStr.slice(0, displayDecimals);
  }

  return fractionStr.length > 0 ? `${integerPart}.${fractionStr}` : integerPart.toString();
}

/**
 * Converts a human-readable decimal string representation of a token value to its BigInt unit.
 * @param value The human-readable string (e.g., "1.5")
 * @param decimals The decimal places of the token (default: 18)
 */
export function parseUnits(value: string, decimals = 18): bigint {
  const [integer, fraction = ""] = value.split(".");
  const safeFraction = fraction.slice(0, decimals).padEnd(decimals, "0");
  const merged = `${integer}${safeFraction}`;
  return BigInt(merged);
}
