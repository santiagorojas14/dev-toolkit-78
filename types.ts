/**
 * Core interface for crypto exchange asset balances
 */
export interface AssetBalance {
  asset: string;
  free: string;
  locked: string;
}

/**
 * Represents a standard order execution event
 */
export interface OrderExecution {
  orderId: number;
  symbol: string;
  price: number;
  quantity: number;
  side: 'BUY' | 'SELL';
  timestamp: number;
}

/**
 * WebSocket event structure for market data
 */
export type MarketEvent = {
  type: 'ticker' | 'trade';
  payload: Record<string, unknown>;
  sequence: number;
};

/**
 * Generic configuration for API rate limiting
 */
export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

/**
 * Error type for standardized API responses
 */
export interface CryptoApiError {
  code: number;
  message: string;
  retryable: boolean;
}