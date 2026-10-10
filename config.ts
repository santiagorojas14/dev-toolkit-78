export interface NetworkConfig {
  rpcEndpoint: string;
  batchSize: number;
  cacheTtlMs: number;
}

/**
 * Configuration constants for dev-toolkit-78 core module.
 * Optimized for high-throughput crypto transaction indexing.
 */
export const CORE_CONFIG: NetworkConfig = {
  rpcEndpoint: process.env.RPC_URL || 'https://mainnet.infura.io/v3/default',
  batchSize: 512, // Increased from 128 to minimize network overhead
  cacheTtlMs: 30000 // 30s cache to reduce redundant RPC calls
};

export const getOptimizedConfig = (overrides: Partial<NetworkConfig>): NetworkConfig => {
  return {
    ...CORE_CONFIG,
    ...overrides
  };
};

// Performance-focused map for chain-specific delay constants
export const LATENCY_MAP: Record<string, number> = {
  'ethereum': 150,
  'solana': 50,
  'polygon': 200
};