export interface CryptoConfig {
  network: 'mainnet' | 'testnet' | 'devnet';
  rpcUrl: string;
  chainId: number;
  maxGasLimit: number;
  retryAttempts: number;
  timeoutMs: number;
}

const DEFAULT_CONFIG: CryptoConfig = {
  network: 'mainnet',
  rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
  chainId: 1,
  maxGasLimit: 5_000_000,
  retryAttempts: 3,
  timeoutMs: 10_000,
};

/**
 * Configuration manager for crypto network connections and settings.
 */
export class ConfigLoader {
  private currentConfig: CryptoConfig;

  constructor(overrides: Partial<CryptoConfig> = {}) {
    this.currentConfig = this.loadConfig(overrides);
  }

  private loadConfig(overrides: Partial<CryptoConfig>): CryptoConfig {
    const envConfig: Partial<CryptoConfig> = {
      rpcUrl: process.env.CRYPTO_RPC_URL,
      chainId: process.env.CRYPTO_CHAIN_ID ? parseInt(process.env.CRYPTO_CHAIN_ID, 10) : undefined,
      network: process.env.CRYPTO_NETWORK as CryptoConfig['network'],
    };

    const cleanEnvConfig = Object.fromEntries(
      Object.entries(envConfig).filter(([_, value]) => value !== undefined)
    );

    return {
      ...DEFAULT_CONFIG,
      ...cleanEnvConfig,
      ...overrides,
    };
  }

  public getConfig(): Readonly<CryptoConfig> {
    return Object.freeze({ ...this.currentConfig });
  }

  public updateConfig(updates: Partial<CryptoConfig>): CryptoConfig {
    this.currentConfig = {
      ...this.currentConfig,
      ...updates,
    };
    return this.getConfig();
  }
}

export const defaultConfigLoader = new ConfigLoader();