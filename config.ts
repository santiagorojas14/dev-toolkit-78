export interface ChainConfig {
  rpcUrl: string;
  chainId: number;
  confirmationBlocks: number;
}

export const NETWORKS: Record<string, ChainConfig> = {
  mainnet: {
    rpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/default',
    chainId: 1,
    confirmationBlocks: 12,
  },
  sepolia: {
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/default',
    chainId: 11155111,
    confirmationBlocks: 2,
  }
};

/**
 * Configuration validation for network environment
 */
export const getChainConfig = (network: string): ChainConfig => {
  const config = NETWORKS[network];
  if (!config) {
    throw new Error(`Unsupported network configuration: ${network}`);
  }
  return config;
};

export const DEFAULT_TIMEOUT_MS = 30000;
export const GAS_BUFFER_MULTIPLIER = 1.2;