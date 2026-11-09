/**
 * Utility helper functions for crypto and blockchain data operations.
 */

/**
 * Truncates an Ethereum/crypto address for UI display.
 */
export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Converts a human-readable token amount string to atomic units (e.g. Wei).
 */
export function toAtomicUnits(amount: string | number, decimals = 18): bigint {
  const [integerPart, decimalPart = ''] = amount.toString().split('.');
  const paddedDecimal = decimalPart.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(`${integerPart}${paddedDecimal}`);
}

/**
 * Converts an atomic unit amount to a human-readable decimal string.
 */
export function fromAtomicUnits(amount: bigint | string, decimals = 18): string {
  const str = amount.toString().padStart(decimals + 1, '0');
  const integerPart = str.slice(0, str.length - decimals);
  const decimalPart = str.slice(str.length - decimals).replace(/0+$/, '');
  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

/**
 * Validates whether a given string matches standard 32-byte hex hash format.
 */
export function isValidTxHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Calculates minimum and maximum expected amounts given slippage in basis points.
 */
export function calculateSlippageBounds(
  amount: bigint,
  slippageBps: number
): { minAmount: bigint; maxAmount: bigint } {
  const bpsDenominator = 10000n;
  const bpsFactor = BigInt(slippageBps);
  const delta = (amount * bpsFactor) / bpsDenominator;

  return {
    minAmount: amount - delta,
    maxAmount: amount + delta,
  };
}
