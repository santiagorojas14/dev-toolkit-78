/**
 * Configuration constants for dev-toolkit-78 crypto operations.
 */

export interface NetworkConfig {
  chainId: number;
  rpcUrl: string;
  maxRetries: number;
  timeoutMs: number;
}

export const MAINNET_CONFIG: NetworkConfig = {
  chainId: 1,
  rpcUrl: 'https://api.mainnet.dev-toolkit.io',
  maxRetries: 3,
  timeoutMs: 5000,
};

export const SUPPORTED_ASSETS: string[] = ['BTC', 'ETH', 'SOL', 'USDT'];

/**
 * Validates the network configuration integrity.
 * @param config - The network configuration object to validate
 * @returns boolean indicating if config is valid
 */
export function isValidConfig(config: NetworkConfig): boolean {
  return config.chainId > 0 && config.rpcUrl.startsWith('https://');
}

export default {
  network: MAINNET_CONFIG,
  assets: SUPPORTED_ASSETS,
  validator: isValidConfig,
};