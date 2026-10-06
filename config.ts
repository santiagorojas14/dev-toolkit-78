export interface CryptoConfig {
  network: 'mainnet' | 'testnet' | 'localhost';
  rpcUrl: string;
  gasLimitDefault: number;
  retryAttempts: number;
  enableCache: boolean;
}

const DEFAULT_CONFIG: CryptoConfig = {
  network: 'mainnet',
  rpcUrl: 'https://eth.llamarpc.com',
  gasLimitDefault: 21000,
  retryAttempts: 3,
  enableCache: true,
};

/**
 * Loads and validates configuration variables for decentralized operations
 * Merges user-defined environment settings with standard safe fallbacks
 */
export function loadConfig(env: Record<string, string | undefined> = {}): CryptoConfig {
  const network = (env.CRYPTO_NETWORK || DEFAULT_CONFIG.network) as CryptoConfig['network'];
  
  const rawGasLimit = env.CRYPTO_GAS_LIMIT 
    ? parseInt(env.CRYPTO_GAS_LIMIT, 10) 
    : DEFAULT_CONFIG.gasLimitDefault;

  const rawRetries = env.CRYPTO_RETRY_ATTEMPTS 
    ? parseInt(env.CRYPTO_RETRY_ATTEMPTS, 10) 
    : DEFAULT_CONFIG.retryAttempts;

  return {
    network: ['mainnet', 'testnet', 'localhost'].includes(network) ? network : DEFAULT_CONFIG.network,
    rpcUrl: env.CRYPTO_RPC_URL || DEFAULT_CONFIG.rpcUrl,
    gasLimitDefault: isNaN(rawGasLimit) ? DEFAULT_CONFIG.gasLimitDefault : rawGasLimit,
    retryAttempts: isNaN(rawRetries) ? DEFAULT_CONFIG.retryAttempts : rawRetries,
    enableCache: env.CRYPTO_ENABLE_CACHE !== 'false',
  };
}