/**
 * Configuration constants for dev-toolkit-78 crypto service.
 * Defines chain IDs, RPC endpoints, and rate limits.
 */

export interface NetworkConfig {
  chainId: number;
  rpcUrl: string;
  maxRetries: number;
  timeoutMs: number;
}

export const NETWORKS: Record<string, NetworkConfig> = {
  mainnet: {
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/default',
    maxRetries: 3,
    timeoutMs: 5000,
  },
  sepolia: {
    chainId: 11155111,
    rpcUrl: 'https://sepolia.infura.io/v3/default',
    maxRetries: 5,
    timeoutMs: 10000,
  },
};

/**
 * Environment settings for the dev-toolkit
 */
export const APP_CONFIG = {
  version: '0.7.8',
  isProduction: process.env.NODE_ENV === 'production',
  defaultGasLimit: 21000n,
} as const;

export type NetworkKey = keyof typeof NETWORKS;

/**
 * Helper to retrieve network config by key
 */
export function getNetworkConfig(key: NetworkKey): NetworkConfig {
  const config = NETWORKS[key];
  if (!config) {
    throw new Error(`Configuration for network ${key} not found`);
  }
  return config;
}