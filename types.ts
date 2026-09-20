/**
 * Core interface for cryptocurrency asset identification
 */
export interface CryptoAsset {
  symbol: string;
  name: string;
  decimals: number;
  contractAddress?: string;
}

/**
 * Price data structure for exchange tickers
 */
export interface PriceUpdate {
  pair: string;
  price: number;
  timestamp: number;
  source: 'binance' | 'kraken' | 'coinbase';
}

/**
 * Transaction status enumeration for network operations
 */
export enum TxStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED'
}

/**
 * Represents a standard wallet interaction response
 */
export interface WalletResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status: TxStatus;
}

/**
 * Configuration settings for network providers
 */
export type NetworkConfig = {
  rpcUrl: string;
  chainId: number;
  timeoutMs: number;
  retryAttempts: number;
};