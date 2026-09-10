export interface AppConfig {
  rpcUrl: string;
  chainId: number;
  retryAttempts: number;
}

const DEFAULT_CONFIG: AppConfig = {
  rpcUrl: 'https://mainnet.infura.io/v3/default',
  chainId: 1,
  retryAttempts: 3
};

/**
 * Merges environment variables with default configuration
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  const envConfig: Partial<AppConfig> = {
    rpcUrl: process.env.RPC_URL,
    chainId: process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID, 10) : undefined,
    retryAttempts: process.env.RETRY_ATTEMPTS ? parseInt(process.env.RETRY_ATTEMPTS, 10) : undefined
  };

  // Remove undefined env values to prevent overwriting with undefined
  Object.keys(envConfig).forEach((key) => {
    if ((envConfig as any)[key] === undefined) {
      delete (envConfig as any)[key];
    }
  });

  return { ...DEFAULT_CONFIG, ...envConfig, ...overrides };
}