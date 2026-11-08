import { RPCConfig, TransactionFeeEstimate } from './types';

export class CryptoRpcService {
  private primaryUrl: string;
  private fallbackUrl: string;
  private timeoutMs: number;

  constructor(config: { primaryUrl: string; fallbackUrl?: string; timeoutMs?: number }) {
    this.primaryUrl = config.primaryUrl;
    this.fallbackUrl = config.fallbackUrl || '';
    this.timeoutMs = config.timeoutMs || 5000;
  }

  /**
   * Fetches latest gas price with fallback mechanism
   */
  public async getGasPrice(): Promise<bigint> {
    try {
      return await this.fetchGasPriceFromUrl(this.primaryUrl);
    } catch (error) {
      if (this.fallbackUrl) {
        console.warn('Primary RPC failed. Switching to fallback provider.');
        return await this.fetchGasPriceFromUrl(this.fallbackUrl);
      }
      throw new Error(`Failed to fetch gas price: ${(error as Error).message}`);
    }
  }

  /**
   * Calculates estimated fee for transactions based on gas limit
   */
  public async estimateTxFee(gasLimit: bigint): Promise<{ maxFee: bigint; priorityFee: bigint }> {
    const baseFee = await this.getGasPrice();
    const priorityFee = BigInt(2000000000); // 2 Gwei standard tip
    const maxFee = (baseFee * BigInt(2)) + priorityFee;

    return {
      maxFee: maxFee * gasLimit,
      priorityFee: priorityFee * gasLimit,
    };
  }

  private async fetchGasPriceFromUrl(url: string): Promise<bigint> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_gasPrice',
          params: [],
          id: 1,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      return BigInt(data.result);
    } finally {
      clearTimeout(timer);
    }
  }
}