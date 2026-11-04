export interface TradeData {
  price: number;
  amount: number;
  timestamp: number;
}

export interface MarketSummary {
  volumeWeightedAveragePrice: number;
  totalVolume: number;
  highestPrice: number;
  lowestPrice: number;
  tradeCount: number;
}

/**
 * Calculates the Volume-Weighted Average Price (VWAP) and market summary statistics
 * for a given set of crypto trade data points.
 */
export function calculateMarketSummary(trades: TradeData[]): MarketSummary {
  if (!trades || trades.length === 0) {
    return {
      volumeWeightedAveragePrice: 0,
      totalVolume: 0,
      highestPrice: 0,
      lowestPrice: 0,
      tradeCount: 0,
    };
  }

  let totalVolume = 0;
  let cumulativePriceVolume = 0;
  let highestPrice = -Infinity;
  let lowestPrice = Infinity;

  for (const trade of trades) {
    if (trade.price <= 0 || trade.amount <= 0) {
      continue;
    }

    totalVolume += trade.amount;
    cumulativePriceVolume += trade.price * trade.amount;

    if (trade.price > highestPrice) {
      highestPrice = trade.price;
    }
    if (trade.price < lowestPrice) {
      lowestPrice = trade.price;
    }
  }

  const vwap = totalVolume > 0 ? cumulativePriceVolume / totalVolume : 0;

  return {
    volumeWeightedAveragePrice: Number(vwap.toFixed(8)),
    totalVolume: Number(totalVolume.toFixed(8)),
    highestPrice: highestPrice === -Infinity ? 0 : highestPrice,
    lowestPrice: lowestPrice === Infinity ? 0 : lowestPrice,
    tradeCount: trades.length,
  };
}