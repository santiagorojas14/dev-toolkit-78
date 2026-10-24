export interface Trade {
  id: string;
  price: number;
  amount: number;
  timestamp: number;
  side: 'buy' | 'sell';
}

export interface VWAPResult {
  symbol: string;
  vwap: number;
  totalVolume: number;
  tradeCount: number;
  startTime: number;
  endTime: number;
}

/**
 * Service for aggregating and processing cryptocurrency trading metrics.
 */
export class CryptoDataService {
  /**
   * Calculates Volume-Weighted Average Price (VWAP) for a given trade list.
   */
  public calculateVWAP(symbol: string, trades: Trade[]): VWAPResult | null {
    if (!trades || trades.length === 0) {
      return null;
    }

    let totalPriceVolume = 0;
    let totalVolume = 0;
    let minTime = Infinity;
    let maxTime = -Infinity;

    for (const trade of trades) {
      if (trade.price <= 0 || trade.amount <= 0) {
        continue;
      }

      totalPriceVolume += trade.price * trade.amount;
      totalVolume += trade.amount;

      if (trade.timestamp < minTime) minTime = trade.timestamp;
      if (trade.timestamp > maxTime) maxTime = trade.timestamp;
    }

    if (totalVolume === 0) {
      return null;
    }

    return {
      symbol,
      vwap: Number((totalPriceVolume / totalVolume).toFixed(8)),
      totalVolume: Number(totalVolume.toFixed(8)),
      tradeCount: trades.length,
      startTime: minTime === Infinity ? Date.now() : minTime,
      endTime: maxTime === -Infinity ? Date.now() : maxTime,
    };
  }

  /**
   * Filters trade history within a rolling time window.
   */
  public filterTradesByWindow(trades: Trade[], windowMs: number): Trade[] {
    const cutoff = Date.now() - windowMs;
    return trades.filter((trade) => trade.timestamp >= cutoff);
  }
}