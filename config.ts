export type NetworkType = 'mainnet' | 'testnet' | 'devnet';

export interface CryptoConfig {
  network: NetworkType;
  rpcUrl: string;
  timeoutMs: number;
  maxRetries: number;
  gasLimitMultiplier: number;
  enableLogging: boolean;
}

export type PartialCryptoConfig = Partial<CryptoConfig>;

const DEFAULT_CONFIG: CryptoConfig = {
  network: 'mainnet',
  rpcUrl: 'https://rpc.mainnet.eth.internal',
  timeoutMs: 10000,
  maxRetries: 3,
  gasLimitMultiplier: 1.15,
  enableLogging: false,
};

/**
 * Merges partial user configuration with default crypto network settings.
 */
export function loadConfig(userConfig?: PartialCryptoConfig): CryptoConfig {
  if (!userConfig) {
    return { ...DEFAULT_CONFIG };
  }

  const mergedConfig: CryptoConfig = {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };

  if (mergedConfig.timeoutMs <= 0) {
    throw new Error('Timeout must be a positive integer');
  }

  if (mergedConfig.maxRetries < 0) {
    throw new Error('Max retries cannot be negative');
  }

  if (mergedConfig.gasLimitMultiplier < 1.0) {
    throw new Error('Gas limit multiplier must be at least 1.0');
  }

  return mergedConfig;
}