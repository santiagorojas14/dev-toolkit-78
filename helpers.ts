export interface AppConfig {
  rpcUrl: string;
  chainId: number;
  timeout: number;
}

const DEFAULT_CONFIG: AppConfig = {
  rpcUrl: 'https://mainnet.infura.io/v3/default',
  chainId: 1,
  timeout: 5000
};

/**
 * Merges environment variables with default configuration values
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return {
    rpcUrl: process.env.RPC_URL || overrides.rpcUrl || DEFAULT_CONFIG.rpcUrl,
    chainId: Number(process.env.CHAIN_ID) || overrides.chainId || DEFAULT_CONFIG.chainId,
    timeout: Number(process.env.TIMEOUT) || overrides.timeout || DEFAULT_CONFIG.timeout
  };
}

/**
 * Validates that critical configuration fields are present
 */
export function validateConfig(config: AppConfig): void {
  if (!config.rpcUrl.startsWith('https://')) {
    throw new Error('Invalid RPC URL format');
  }
  if (config.chainId <= 0) {
    throw new Error('Chain ID must be positive');
  }
}