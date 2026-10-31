export interface ChainConfig {
  rpcUrl: string;
  chainId: number;
  retryAttempts: number;
  timeoutMs: number;
}

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  mainnet: {
    rpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/json-rpc',
    chainId: 1,
    retryAttempts: 3,
    timeoutMs: 5000,
  },
  polygon: {
    rpcUrl: 'https://polygon-rpc.com',
    chainId: 137,
    retryAttempts: 5,
    timeoutMs: 8000,
  },
};

/**
 * Environment variable validation for runtime safety
 */
export const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`missing required environment variable: ${key}`);
  }
  return value;
};

export const DEFAULT_GAS_MULTIPLIER = 1.2;
export const MAX_BLOCK_LOOKBACK = 1000;
