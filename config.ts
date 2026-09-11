export interface CryptoConfig {
  rpcUrl: string;
  chainId: number;
  retryAttempts: number;
  timeoutMs: number;
}

const defaults: CryptoConfig = {
  rpcUrl: 'https://api.mainnet-beta.solana.com',
  chainId: 101,
  retryAttempts: 3,
  timeoutMs: 5000
};

/**
 * Merges partial user config with established defaults
 */
export function loadConfig(userConfig: Partial<CryptoConfig> = {}): CryptoConfig {
  return {
    ...defaults,
    ...userConfig,
  };
}

/**
 * Validate required environment connectivity settings
 */
export function validateConfig(config: CryptoConfig): void {
  if (!config.rpcUrl.startsWith('https://')) {
    throw new Error('Invalid RPC URL: must be HTTPS');
  }
  if (config.chainId <= 0) {
    throw new Error('Invalid chain ID');
  }
}