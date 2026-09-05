import { CryptoPair, TradeConfig } from './types';

/**
 * Handles trade execution operations against exchange APIs.
 */
export class TradeService {
  private readonly endpoint: string;

  constructor(config: TradeConfig) {
    this.endpoint = config.apiBase;
  }

  /**
   * Executes a market order for a given asset pair.
   * @param pair The crypto trading pair (e.g., 'BTC/USDT')
   * @param amount The quantity to purchase
   * @returns Promise containing transaction hash
   */
  public async executeMarketOrder(pair: CryptoPair, amount: number): Promise<string> {
    if (amount <= 0) {
      throw new Error('Order amount must be positive');
    }

    const payload = {
      symbol: pair.symbol,
      qty: amount,
      side: 'BUY',
      type: 'MARKET',
      timestamp: Date.now(),
    };

    const response = await fetch(`${this.endpoint}/v1/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Order failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.txId as string;
  }
}