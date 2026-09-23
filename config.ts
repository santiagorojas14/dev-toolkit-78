/**
 * Configuration constants for dev-toolkit-78 crypto service.
 * Defines chain IDs and standard network endpoints.
 */

export interface NetworkConfig {
  readonly chainId: number;
  readonly rpcUrl: string;
  readonly explorer: string;
  readonly timeoutMs: number;
}

export const SUPPORTED_CHAINS: Record<string, NetworkConfig> = {
  mainnet: {
    chainId: 1,
    rpcUrl: 'https://eth-mainnet.public.blastapi.io',
    explorer: 'https://etherscan.io',
    timeoutMs: 30000,
  },
  sepolia: {
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.org',
    explorer: 'https://sepolia.etherscan.io',
    timeoutMs: 15000,
  },
};

/**
 * Gas settings for transaction estimation.
 */
export const GAS_DEFAULTS = {
  bufferMultiplier: 1.2,
  maxPriorityFeePerGas: BigInt(2000000000),
  defaultGasLimit: BigInt(21000),
};

export const getChainConfig = (network: string): NetworkConfig => {
  const config = SUPPORTED_CHAINS[network];
  if (!config) {
    throw new Error(`Unsupported network configuration: ${network}`);
  }
  return config;
};