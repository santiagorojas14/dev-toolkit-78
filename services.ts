export interface BalanceInfo {
  balance: string;
  decimals: number;
  timestamp: number;
}

export class TokenBalanceService {
  private balanceCache: Map<string, BalanceInfo> = new Map();
  private readonly cacheTtlMs: number;

  constructor(cacheTtlSeconds: number = 30) {
    this.cacheTtlMs = cacheTtlSeconds * 1000;
  }

  private getCacheKey(address: string, tokenAddress: string): string {
    return `${address.toLowerCase()}-${tokenAddress.toLowerCase()}`;
  }

  public getCachedBalance(address: string, tokenAddress: string): BalanceInfo | null {
    const key = this.getCacheKey(address, tokenAddress);
    const cached = this.balanceCache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.cacheTtlMs;
    if (isExpired) {
      this.balanceCache.delete(key);
      return null;
    }

    return cached;
  }

  public async fetchBalance(
    address: string,
    tokenAddress: string,
    rpcProviderCall: () => Promise<{ balance: string; decimals: number }>
  ): Promise<BalanceInfo> {
    const cached = this.getCachedBalance(address, tokenAddress);
    if (cached) {
      return cached;
    }

    const result = await rpcProviderCall();
    const balanceInfo: BalanceInfo = {
      balance: result.balance,
      decimals: result.decimals,
      timestamp: Date.now(),
    };

    const key = this.getCacheKey(address, tokenAddress);
    this.balanceCache.set(key, balanceInfo);
    return balanceInfo;
  }

  public clearCache(): void {
    this.balanceCache.clear();
  }
}