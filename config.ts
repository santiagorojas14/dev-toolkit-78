export interface AppConfig {
  rpcUrl: string;
  chainId: number;
  retryAttempts: number;
  timeoutMs: number;
}

const DEFAULT_CONFIG: AppConfig = {
  rpcUrl: 'https://mainnet.infura.io/v3/default',
  chainId: 1,
  retryAttempts: 3,
  timeoutMs: 5000,
};

/**
 * Merges user-provided overrides with system defaults
 * ensuring type safety for crypto-related constants
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...overrides,
  };
}

// Usage example:
// const config = loadConfig({ chainId: 137 });
// console.log(`Initialized with chain: ${config.chainId}`);