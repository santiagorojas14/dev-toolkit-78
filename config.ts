export interface AppConfig {
  network: 'mainnet' | 'testnet' | 'devnet';
  rpcUrl: string;
  timeoutMs: number;
  retryAttempts: number;
  gasMultiplier: number;
  apiKey?: string;
}

const DEFAULT_CONFIG: AppConfig = {
  network: 'mainnet',
  rpcUrl: 'https://cloudflare-eth.com',
  timeoutMs: 15000,
  retryAttempts: 3,
  gasMultiplier: 1.15,
};

/**
 * Loads, merges, and validates configuration from defaults, environment variables, and manual overrides.
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  const processEnv = typeof process !== 'undefined' ? process.env : {};

  const envNetwork = processEnv['CRYPTO_NETWORK'] as AppConfig['network'] | undefined;
  const validNetwork = envNetwork === 'mainnet' || envNetwork === 'testnet' || envNetwork === 'devnet' ? envNetwork : undefined;

  const envConfig: Partial<AppConfig> = {
    network: validNetwork,
    rpcUrl: processEnv['CRYPTO_RPC_URL'],
    timeoutMs: processEnv['CRYPTO_TIMEOUT'] ? parseInt(processEnv['CRYPTO_TIMEOUT'], 10) : undefined,
    retryAttempts: processEnv['CRYPTO_RETRIES'] ? parseInt(processEnv['CRYPTO_RETRIES'], 10) : undefined,
    gasMultiplier: processEnv['CRYPTO_GAS_MULTIPLIER'] ? parseFloat(processEnv['CRYPTO_GAS_MULTIPLIER']) : undefined,
    apiKey: processEnv['CRYPTO_API_KEY'],
  };

  // Filter out undefined keys to prevent overwriting valid configurations
  const activeEnvConfig = Object.fromEntries(
    Object.entries(envConfig).filter(([_, val]) => val !== undefined)
  );

  const mergedConfig = {
    ...DEFAULT_CONFIG,
    ...activeEnvConfig,
    ...overrides,
  } as AppConfig;

  // Validation checks for safe execution
  if (mergedConfig.gasMultiplier <= 0) {
    throw new Error('Configuration validation failed: gasMultiplier must be greater than 0');
  }
  if (mergedConfig.timeoutMs <= 0) {
    throw new Error('Configuration validation failed: timeoutMs must be greater than 0');
  }
  if (mergedConfig.retryAttempts < 0) {
    throw new Error('Configuration validation failed: retryAttempts cannot be negative');
  }

  return mergedConfig;
}