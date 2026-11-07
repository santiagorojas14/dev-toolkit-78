/**
 * Core interface for crypto exchange asset balances
 */
export interface AssetBalance {
  asset: string;
  free: string;
  locked: string;
}

/**
 * Configuration for API request signing
 */
export interface RequestSignature {
  timestamp: number;
  signature: string;
  apiKey: string;
}

/**
 * Normalized market order structure for dev-toolkit-78
 */
export interface MarketOrder {
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT';
  quantity: number;
  price?: number;
  nonce: bigint;
}

/**
 * Standardized response wrapper for service operations
 */
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Type alias for supported order execution statuses
 */
export type OrderStatus = 'PENDING' | 'FILLED' | 'CANCELED' | 'REJECTED';

/**
 * Container for cryptographic keys used in transaction signing
 */
export type KeyPair = {
  publicKey: string;
  privateKey: string;
  curve: 'ed25519' | 'secp256k1';
};