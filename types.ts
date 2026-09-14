/**
 * Core interface for cryptographic exchange interactions
 */
export interface CryptoPair {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  precision: number;
}

/**
 * Standardized order parameters for exchange execution
 */
export interface TradeOrder {
  pair: string;
  side: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: number;
}

/**
 * API response structure for wallet balance tracking
 */
export interface WalletBalance {
  asset: string;
  total: string;
  locked: string;
  available: string;
}

/**
 * Status reporting for execution engine loops
 */
export type EngineStatus = 'idle' | 'running' | 'error' | 'stopped';

/**
 * Unified result type for trade processing operations
 */
export interface TradeResult {
  success: boolean;
  orderId?: string;
  error?: string;
  latencyMs: number;
}