export interface ChainConfig {
  chainId: number;
  rpcUrl: string;
  explorer: string;
}

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  mainnet: {
    chainId: 1,
    rpcUrl: 'https://cloudflare-eth.com',
    explorer: 'https://etherscan.io'
  },
  arbitrum: {
    chainId: 42161,
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io'
  }
};

export const DEFAULT_TIMEOUT_MS = 5000;
export const MAX_RETRY_ATTEMPTS = 3;

export function getProviderConfig(network: string): ChainConfig {
  const config = SUPPORTED_CHAINS[network];
  if (!config) {
    throw new Error(`Unsupported network configuration: ${network}`);
  }
  return config;
}