export interface CryptoConfig {
  network: 'mainnet' | 'testnet' | 'localhost';
  rpcUrl: string;
  chainId: number;
  defaultGasLimit: bigint;
  requestTimeoutMs: number;
  retryAttempts: number;
  enableWebSocket: boolean;
}

const DEFAULT_CONFIG: CryptoConfig = {
  network: 'mainnet',
  rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
  chainId: 1,
  defaultGasLimit: 21000n,
  requestTimeoutMs: 10000,
  retryAttempts: 3,
  enableWebSocket: false,
};

/**
 * Loads and merges crypto toolkit configuration with environment variables and custom overrides.
 */
export function loadConfig(overrides: Partial<CryptoConfig> = {}): CryptoConfig {
  const envNetwork = process.env.CRYPTO_NETWORK as CryptoConfig['network'] | undefined;
  const envRpcUrl = process.env.CRYPTO_RPC_URL;
  const envChainId = process.env.CRYPTO_CHAIN_ID ? parseInt(process.env.CRYPTO_CHAIN_ID, 10) : undefined;

  const envConfig: Partial<CryptoConfig> = {};
  if (envNetwork) envConfig.network = envNetwork;
  if (envRpcUrl) envConfig.rpcUrl = envRpcUrl;
  if (envChainId && !isNaN(envChainId)) envConfig.chainId = envChainId;

  return {
    ...DEFAULT_CONFIG,
    ...envConfig,
    ...overrides,
  };
}