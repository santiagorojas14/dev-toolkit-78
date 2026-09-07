export class BlockchainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'BlockchainError';
  }
}

export interface TokenPrice {
  usd: number;
  lastUpdated: number;
}

export class CryptoPriceService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private readonly apiKey?: string) {}

  /**
   * Fetches USD price for a given coin ID, handling API errors, missing tokens, and rate limits.
   */
  async fetchTokenPrice(tokenId: string): Promise<TokenPrice> {
    if (!tokenId || typeof tokenId !== 'string' || tokenId.trim() === '') {
      throw new BlockchainError('Invalid token identifier provided', 'INVALID_TOKEN_ID');
    }

    const cleanTokenId = tokenId.toLowerCase().trim();
    const url = `${this.baseUrl}/simple/price?ids=${cleanTokenId}&vs_currencies=usd`;

    try {
      const headers: HeadersInit = this.apiKey ? { 'x-cg-demo-api-key': this.apiKey } : {};
      const response = await fetch(url, { headers });

      if (!response.ok) {
        if (response.status === 429) {
          throw new BlockchainError('Crypto API rate limit exceeded', 'RATE_LIMIT_EXCEEDED', 429);
        }
        throw new BlockchainError(`API responded with status ${response.status}`, 'API_ERROR', response.status);
      }

      const data = await response.json() as Record<string, { usd?: number }>;

      // Handle edge case where token exists but has no market valuation or invalid name
      if (!data || !data[cleanTokenId] || data[cleanTokenId].usd === undefined) {
        throw new BlockchainError(`Token '${cleanTokenId}' not found or has no price data`, 'TOKEN_NOT_FOUND', 404);
      }

      return {
        usd: data[cleanTokenId].usd!,
        lastUpdated: Date.now(),
      };
    } catch (error) {
      if (error instanceof BlockchainError) {
        throw error;
      }
      const message = error instanceof Error ? error.message : 'Unknown network failure';
      throw new BlockchainError(`Failed to fetch crypto price: ${message}`, 'NETWORK_FAILURE');
    }
  }
}