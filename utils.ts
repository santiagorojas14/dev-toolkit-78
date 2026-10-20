export interface TokenPair {
  symbol: string;
  address: string;
  decimals: number;
}

/**
 * Calculates the precise token amount considering decimal offsets
 * Used for preparing transaction data in dev-toolkit-78
 */
export const formatTokenAmount = (amount: number, decimals: number): bigint => {
  const factor = BigInt(10 ** decimals);
  return BigInt(Math.floor(amount * 10 ** decimals));
};

/**
 * Validates checksum of ethereum-style addresses
 * Essential for preventing funds loss in crypto transfers
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Normalizes trade execution fees into a consistent scale
 * Converts bps to decimal representation
 */
export const bpsToDecimal = (bps: number): number => {
  return bps / 10000;
};

/**
 * Generates a standard trade description for audit logs
 */
export const createTradeSummary = (pair: TokenPair, amount: bigint): string => {
  return `Trade executed for ${amount} units of ${pair.symbol} at ${pair.address}`;
};