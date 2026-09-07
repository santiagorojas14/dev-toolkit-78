export interface ChainConfig {
  chainId: number;
  rpcUrl: string;
  explorer: string;
}

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  mainnet: {
    chainId: 1,
    rpcUrl: 'https://rpc.ankr.com/eth',
    explorer: 'https://etherscan.io'
  },
  polygon: {
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com'
  }
};

export const DEFAULT_TIMEOUT_MS = 30000;
export const MAX_RETRY_ATTEMPTS = 3;

/**
 * Resolves RPC URL for a given network
 */
export function getRpcUrl(network: string): string {
  const config = SUPPORTED_CHAINS[network];
  if (!config) {
    throw new Error(`Unsupported network: ${network}`);
  }
  return config.rpcUrl;
}

/**
 * Validates environment integrity for critical services
 */
export function validateConfig(): void {
  if (!process.env.PRIVATE_KEY) {
    throw new Error('Missing required environment variable: PRIVATE_KEY');
  }
}