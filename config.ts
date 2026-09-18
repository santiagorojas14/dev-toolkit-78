/**
 * Configuration constants for dev-toolkit-78 crypto utilities
 */

export interface NetworkConfig {
  chainId: number;
  rpcUrl: string;
  retryAttempts: number;
  timeoutMs: number;
}

export const SUPPORTED_NETWORKS: Record<string, NetworkConfig> = {
  mainnet: {
    chainId: 1,
    rpcUrl: 'https://cloudflare-eth.com',
    retryAttempts: 3,
    timeoutMs: 5000,
  },
  goerli: {
    chainId: 5,
    rpcUrl: 'https://goerli.infura.io/v3/public',
    retryAttempts: 5,
    timeoutMs: 10000,
  },
};

export const DEFAULT_GAS_LIMIT: bigint = BigInt(21000);

export const VALID_TOKEN_STANDARDS: string[] = ['ERC-20', 'ERC-721', 'ERC-1155'];

export const getNetworkConfig = (networkName: string): NetworkConfig => {
  const config = SUPPORTED_NETWORKS[networkName];
  if (!config) {
    throw new Error(`Unsupported network: ${networkName}`);
  }
  return config;
};