export class CryptoConfigError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'CryptoConfigError';
  }
}

export interface NetworkConfig {
  rpcUrl: string;
  chainId: number;
}

const DEFAULT_RPC = 'https://mainnet.infura.io/v3/';

/**
 * Validates environment variables for blockchain connectivity
 */
export function getNetworkConfig(): NetworkConfig {
  const rpcUrl = process.env.RPC_URL || DEFAULT_RPC;
  const chainId = process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID, 10) : 1;

  if (!rpcUrl.startsWith('https://')) {
    throw new CryptoConfigError('Invalid RPC URL scheme', 'INVALID_SCHEME');
  }

  if (isNaN(chainId) || chainId <= 0) {
    throw new CryptoConfigError('Chain ID must be a positive integer', 'INVALID_CHAIN_ID');
  }

  return { rpcUrl, chainId };
}

/**
 * Safely loads application configuration with fallbacks
 */
export function loadSafeConfig(): NetworkConfig {
  try {
    return getNetworkConfig();
  } catch (error) {
    if (error instanceof CryptoConfigError) {
      console.error(`[ConfigError] ${error.code}: ${error.message}`);
    }
    return { rpcUrl: DEFAULT_RPC, chainId: 1 };
  }
}