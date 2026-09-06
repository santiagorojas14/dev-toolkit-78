export interface CryptoConfig {
  rpcUrl: string;
  chainId: number;
  maxRetries: number;
  timeoutMs: number;
  gasMultiplier: number;
  apiKey?: string;
}

export const DEFAULT_CONFIG: CryptoConfig = {
  rpcUrl: 'https://cloudflare-eth.com',
  chainId: 1,
  maxRetries: 3,
  timeoutMs: 10000,
  gasMultiplier: 1.15,
};

/**
 * Merges runtime overrides and environment variables with default config settings.
 */
export function loadConfig(userOptions: Partial<CryptoConfig> = {}): CryptoConfig {
  const envOverrides: Partial<CryptoConfig> = {};

  if (typeof process !== 'undefined' && process.env) {
    if (process.env.CRYPTO_RPC_URL) envOverrides.rpcUrl = process.env.CRYPTO_RPC_URL;
    if (process.env.CRYPTO_CHAIN_ID) envOverrides.chainId = Number(process.env.CRYPTO_CHAIN_ID);
    if (process.env.CRYPTO_API_KEY) envOverrides.apiKey = process.env.CRYPTO_API_KEY;
  }

  const finalConfig: CryptoConfig = {
    ...DEFAULT_CONFIG,
    ...envOverrides,
    ...userOptions,
  };

  validateConfig(finalConfig);
  return finalConfig;
}

/**
 * Ensures key properties meet basic sanity requirements.
 */
function validateConfig(config: CryptoConfig): void {
  if (!config.rpcUrl || !config.rpcUrl.startsWith('http')) {
    throw new Error('Invalid RPC URL: must begin with http or https');
  }
  if (Number.isNaN(config.chainId) || config.chainId <= 0) {
    throw new Error('Invalid chain ID: must be a positive integer');
  }
}
