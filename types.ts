/**
 * Represents the core asset configuration for dev-toolkit-78
 */
export interface CryptoAsset {
  symbol: string;
  decimals: number;
  contractAddress: string | null;
  isStablecoin: boolean;
}

/**
 * Standardized response for blockchain RPC calls
 */
export interface RpcResponse<T> {
  result: T;
  error: string | null;
  id: number;
  timestamp: number;
}

/**
 * Transaction metadata for cross-chain bridging
 */
export interface BridgeTransaction {
  txHash: string;
  fromChainId: number;
  toChainId: number;
  amount: bigint;
  status: 'pending' | 'confirmed' | 'failed';
}

/**
 * Configuration for network connection parameters
 */
export interface NetworkConfig {
  rpcUrl: string;
  chainId: number;
  priorityFee: number;
  timeoutMs: number;
}

export type AssetMap = Record<string, CryptoAsset>;

export const DEFAULT_ASSETS: AssetMap = {
  ETH: { symbol: 'ETH', decimals: 18, contractAddress: null, isStablecoin: false },
  USDC: { symbol: 'USDC', decimals: 6, contractAddress: '0xa0b8...', isStablecoin: true }
};