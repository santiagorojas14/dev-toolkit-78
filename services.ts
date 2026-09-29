import { EventEmitter } from "events";

interface GasEstimate {
  low: number;
  standard: number;
  fast: number;
  timestamp: number;
}

export class GasPriceOracle extends EventEmitter {
  private cache: GasEstimate | null = null;
  private cacheDurationMs: number;
  private rpcUrl: string;

  constructor(rpcUrl: string, cacheDurationMs = 15000) {
    super();
    this.rpcUrl = rpcUrl;
    this.cacheDurationMs = cacheDurationMs;
  }

  private isCacheValid(): boolean {
    if (!this.cache) return false;
    return Date.now() - this.cache.timestamp < this.cacheDurationMs;
  }

  private async fetchLatestPrices(): Promise<GasEstimate> {
    // Simulate RPC delay and gas calculations
    await new Promise((resolve) => setTimeout(resolve, 120));
    const baseFee = Math.floor(Math.random() * 30) + 15;
    return {
      low: Math.round(baseFee * 1.15),
      standard: Math.round(baseFee * 1.3),
      fast: Math.round(baseFee * 1.6),
      timestamp: Date.now(),
    };
  }

  public async getGasPrices(forceRefresh = false): Promise<GasEstimate> {
    if (!forceRefresh && this.isCacheValid() && this.cache) {
      this.emit("cacheHit");
      return this.cache;
    }

    this.emit("cacheMiss");
    try {
      const freshPrices = await this.fetchLatestPrices();
      this.cache = freshPrices;
      return freshPrices;
    } catch (error) {
      if (this.cache) {
        this.emit("cacheFallback", error);
        return this.cache;
      }
      throw error;
    }
  }

  public clearCache(): void {
    this.cache = null;
  }
}