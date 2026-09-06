export interface TokenPair {
  address: string;
  symbol: string;
  decimals: number;
}

export const formatCurrency = (amount: number, decimals: number): string => {
  const factor = Math.pow(10, decimals);
  return (amount / factor).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
};

export const validateAddress = (address: string): boolean => {
  const ethRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethRegex.test(address);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const calculateSlippage = (expected: number, actual: number): number => {
  if (expected === 0) return 0;
  return Math.abs((actual - expected) / expected) * 100;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().toLowerCase();
};