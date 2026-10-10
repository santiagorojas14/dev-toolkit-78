export const formatUnits = (value: bigint, decimals: number): string => {
  const divisor = 10n ** BigInt(decimals);
  const integer = value / divisor;
  const fractional = value % divisor;
  const paddedFractional = fractional.toString().padStart(decimals, '0');
  return `${integer}.${paddedFractional}`;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const calculateSlippage = (expected: bigint, actual: bigint): number => {
  const diff = expected > actual ? expected - actual : actual - expected;
  return Number((diff * 10000n) / expected) / 100;
};

export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const parseCryptoAmount = (amount: string, decimals: number): bigint => {
  const [integer, fractional] = amount.split('.');
  const normalizedFraction = (fractional || '').padEnd(decimals, '0').slice(0, decimals);
  return BigInt(`${integer}${normalizedFraction}`);
};