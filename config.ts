export interface CryptoConfig {
  network: 'mainnet' | 'testnet' | 'devnet';
  rpcUrl: string;
  chainId: number;
  gasPriceGwei: number;
  maxRetries: number;
  timeoutMs: number;
  enableLogging: boolean;
}

const DEFAULT_CONFIG: CryptoConfig = {
  network: 'mainnet',
  rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
  chainId: 1,
  gasPriceGwei: 20,
  maxRetries: 3,
  timeoutMs: 10000,
  enableLogging: false,
};

/**
 * Loads crypto toolkit configuration by merging environment variables,
 * default values, and optional explicit overrides.
 */
export function loadConfig(overrides: Partial<CryptoConfig> = {}): CryptoConfig {
  const envConfig: Partial<CryptoConfig> = {};

  if (typeof process !== 'undefined' && process.env) {
    if (process.env.CRYPTO_RPC_URL) {
      envConfig.rpcUrl = process.env.CRYPTO_RPC_URL;
    }
    if (process.env.CRYPTO_CHAIN_ID) {
      const parsedId = parseInt(process.env.CRYPTO_CHAIN_ID, 10);
      if (!isNaN(parsedId)) {
        envConfig.chainId = parsedId;
      }
    }
    if (process.env.CRYPTO_NETWORK) {
      const net = process.env.CRYPTO_NETWORK.toLowerCase();
      if (net === 'mainnet' || net === 'testnet' || net === 'devnet') {
        envConfig.network = net;
      }
    }
  }

  return {
    ...DEFAULT_CONFIG,
    ...envConfig,
    ...overrides,
  };
}