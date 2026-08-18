export function isValidAddress(address: string): boolean {
  const regex = /^(0x)?[0-9a-f]{40}$/i;
  return regex.test(address);
}

export function formatTransactionAmount(amount: number, decimals: number = 18): string {
  return (amount / Math.pow(10, decimals)).toFixed(decimals);
}

export function calculateGasPrice(basePrice: number, premiumMultiplier: number = 1.2): number {
  return basePrice * premiumMultiplier;
}

export function logError(error: any): void {
  console.error(`[ERROR] ${new Date().toISOString()}:`, error);
}

export function parseTransactionData(data: string): Record<string, any> {
  try {
    return JSON.parse(data);
  } catch (error) {
    logError('Failed to parse transaction data');
    return {};
  }
}
