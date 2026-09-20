/**
 * Configuration constants for dev-toolkit-78 crypto modules
 */

export interface NetworkConfig {
  readonly chainId: number;
  readonly rpcUrl: string;
  readonly timeoutMs: number;
}

export interface CryptoConfig {
  readonly networks: Record<string, NetworkConfig>;
  readonly defaultGasLimit: bigint;
}

/**
 * Core configuration schema for blockchain connectivity
 */
export const config: CryptoConfig = {
  networks: {
    mainnet: {
      chainId: 1,
      rpcUrl: 'https://cloudflare-eth.com',
      timeoutMs: 30000,
    },
    sepolia: {
      chainId: 11155111,
      rpcUrl: 'https://rpc.sepolia.org',
      timeoutMs: 15000,
    }
  },
  defaultGasLimit: 21000n,
};

/**
 * Validates network connectivity parameters
 * @param networkKey Unique identifier for the blockchain network
 * @returns NetworkConfig configuration object
 */
export const getNetworkConfig = (networkKey: string): NetworkConfig => {
  const net = config.networks[networkKey];
  if (!net) {
    throw new Error(`Unsupported network: ${networkKey}`);
  }
  return net;
};