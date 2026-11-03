/**
 * Supported cryptocurrency network identifiers.
 */
export type NetworkId = 'mainnet' | 'testnet' | 'devnet';

/**
 * Configuration options for a crypto network node connection.
 */
export interface NetworkConfig {
  /** The unique identifier for the blockchain network */
  networkId: NetworkId;
  /** Chain ID associated with the network */
  chainId: number;
  /** Primary RPC endpoint URL */
  rpcUrl: string;
  /** Optional fallback RPC endpoint URLs */
  fallbackRpcUrls?: string[];
  /** Default gas price limit in Gwei */
  defaultGasPriceGwei: number;
  /** Connection timeout in milliseconds */
  timeoutMs: number;
}

/**
 * Default network configurations for supported crypto environments.
 */
export const DEFAULT_NETWORKS: Record<NetworkId, NetworkConfig> = {
  mainnet: {
    networkId: 'mainnet',
    chainId: 1,
    rpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/demo',
    fallbackRpcUrls: ['https://cloudflare-eth.com'],
    defaultGasPriceGwei: 30,
    timeoutMs: 10000,
  },
  testnet: {
    networkId: 'testnet',
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.org',
    defaultGasPriceGwei: 10,
    timeoutMs: 8000,
  },
  devnet: {
    networkId: 'devnet',
    chainId: 1337,
    rpcUrl: 'http://127.0.0.1:8545',
    defaultGasPriceGwei: 2,
    timeoutMs: 5000,
  },
};

/**
 * Retrieves the network configuration for a given network identifier.
 *
 * @param network - Target network identifier
 * @param customOverrides - Optional configuration fields to override defaults
 * @returns Fully populated NetworkConfig object
 */
export function getNetworkConfig(
  network: NetworkId,
  customOverrides?: Partial<NetworkConfig>
): NetworkConfig {
  const defaultConfig = DEFAULT_NETWORKS[network];
  if (!defaultConfig) {
    throw new Error(`Unsupported network identifier: ${network}`);
  }

  return {
    ...defaultConfig,
    ...customOverrides,
  };
}

/**
 * Validates whether an RPC URL string uses an acceptable http/https/wss protocol.
 *
 * @param url - RPC URL string to validate
 * @returns True if URL protocol is valid, false otherwise
 */
export function isValidRpcUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'ws:', 'wss:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}