/**
 * Configuration constants for dev-toolkit-78 crypto utilities
 */

export interface NetworkConfig {
  readonly chainId: number;
  readonly rpcUrl: string;
  readonly retryAttempts: number;
}

/**
 * Supported crypto networks and their settings
 */
export const NETWORKS: Record<string, NetworkConfig> = {
  MAINNET: {
    chainId: 1,
    rpcUrl: 'https://eth.llamarpc.com',
    retryAttempts: 3,
  },
  GOERLI: {
    chainId: 5,
    rpcUrl: 'https://eth-goerli.public.blastapi.io',
    retryAttempts: 5,
  }
};

export const DEFAULT_TIMEOUT_MS: number = 30000;

/**
 * Validation for configuration values
 */
export const validateNetwork = (name: string): boolean => {
  return Object.prototype.hasOwnProperty.call(NETWORKS, name);
};

export const getNetworkConfig = (name: string): NetworkConfig | undefined => {
  return NETWORKS[name];
};