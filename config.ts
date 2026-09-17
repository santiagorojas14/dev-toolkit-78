export interface CryptoConfig {
  network: 'mainnet' | 'testnet' | 'devnet';
  rpcUrl: string;
  chainId: number;
  gasLimitMultiplier: number;
  maxRetries: number;
  requestTimeoutMs: number;
}

const DEFAULT_CONFIG: CryptoConfig = {
  network: 'mainnet',
  rpcUrl: 'https://eth.llamarpc.com',
  chainId: 1,
  gasLimitMultiplier: 1.15,
  maxRetries: 3,
  requestTimeoutMs: 10000,
};

/**
 * Loads and merges custom options with default crypto network configuration.
 * Sanitizes RPC URL and enforces valid boundaries for numbers.
 */
export function loadConfig(options: Partial<CryptoConfig> = {}): CryptoConfig {
  const merged: CryptoConfig = {
    ...DEFAULT_CONFIG,
    ...options,
  };

  // Ensure gas multiplier is at least 1.0
  if (merged.gasLimitMultiplier < 1.0) {
    merged.gasLimitMultiplier = 1.0;
  }

  // Ensure retries are non-negative
  if (merged.maxRetries < 0) {
    merged.maxRetries = 0;
  }

  // Trim trailing slashes or whitespace from RPC endpoint
  merged.rpcUrl = merged.rpcUrl.trim().replace(/\/+$/, '');

  return merged;
}
