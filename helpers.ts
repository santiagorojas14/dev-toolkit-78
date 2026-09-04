export type Wei = bigint;

/**
 * Converts human-readable token amount to Wei
 */
export const toWei = (amount: number, decimals: number = 18): Wei => {
  const factor = BigInt(10) ** BigInt(decimals);
  return BigInt(Math.floor(amount * 10 ** decimals)) * factor / BigInt(10 ** decimals);
};

/**
 * Formats Wei back to human-readable string
 */
export const fromWei = (wei: Wei, decimals: number = 18): string => {
  const s = wei.toString();
  const pad = s.padStart(decimals + 1, '0');
  const integer = pad.slice(0, -decimals) || '0';
  const fraction = pad.slice(-decimals).replace(/0+$/, '');
  return fraction ? `${integer}.${fraction}` : integer;
};

/**
 * Safely parses hex strings to bigints
 */
export const parseHex = (hex: string): bigint => {
  return BigInt(hex.startsWith('0x') ? hex : `0x${hex}`);
};

/**
 * Calculates percentage slippage
 */
export const getSlippageAmount = (amount: Wei, basisPoints: number): Wei => {
  return (amount * BigInt(basisPoints)) / BigInt(10000);
};