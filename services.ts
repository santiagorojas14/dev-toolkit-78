export interface TokenBalance {
  symbol: string;
  amount: number;
  priceUsd: number;
}

export interface PortfolioSummary {
  totalValueUsd: number;
  topAsset: string;
  allocations: Record<string, number>;
}

export class CryptoPortfolioService {
  /**
   * Calculates portfolio metrics and percentage allocation per asset.
   */
  public calculateMetrics(balances: TokenBalance[]): PortfolioSummary {
    if (!balances || balances.length === 0) {
      return {
        totalValueUsd: 0,
        topAsset: 'NONE',
        allocations: {},
      };
    }

    let totalValueUsd = 0;
    let topAsset = balances[0].symbol;
    let maxAssetValue = -1;

    const assetValues: Record<string, number> = {};

    // Aggregate values per symbol
    for (const token of balances) {
      const tokenValue = token.amount * token.priceUsd;
      assetValues[token.symbol] = (assetValues[token.symbol] || 0) + tokenValue;
      totalValueUsd += tokenValue;

      if (assetValues[token.symbol] > maxAssetValue) {
        maxAssetValue = assetValues[token.symbol];
        topAsset = token.symbol;
      }
    }

    // Calculate percentage allocations
    const allocations: Record<string, number> = {};
    if (totalValueUsd > 0) {
      for (const [symbol, val] of Object.entries(assetValues)) {
        allocations[symbol] = Number(((val / totalValueUsd) * 100).toFixed(2));
      }
    }

    return {
      totalValueUsd: Number(totalValueUsd.toFixed(2)),
      topAsset,
      allocations,
    };
  }
}
