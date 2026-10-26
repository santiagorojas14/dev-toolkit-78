export interface TokenAmount {
  value: bigint;
  decimals: number;
}

/**
 * formats token amounts for human readability
 */
export const formatTokenAmount = (amount: bigint, decimals: number): string => {
  const divisor = 10n ** BigInt(decimals);
  const integerPart = amount / divisor;
  const fractionalPart = (amount % divisor).toString().padStart(decimals, '0');
  return `${integerPart}.${fractionalPart.slice(0, 6)}`;
};

/**
 * calculates basis points for slippage tolerance
 */
export const calculateSlippage = (amount: bigint, bps: number): bigint => {
  return (amount * BigInt(bps)) / 10000n;
};

/**
 * validates ethereum-style addresses
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * scales token amount based on decimal difference
 */
export const normalizeDecimals = (
  amount: bigint,
  fromDecimals: number,
  toDecimals: number
): bigint => {
  const diff = toDecimals - fromDecimals;
  if (diff === 0) return amount;
  return diff > 0 
    ? amount * (10n ** BigInt(diff)) 
    : amount / (10n ** BigInt(Math.abs(diff)));
};