export interface CryptoNetworkConfig {
  rpcUrl: string;
  chainId: number;
  timeoutMs: number;
  maxRetries: number;
}

export interface AppConfig {
  network: CryptoNetworkConfig;
  defaultSlippage: number;
  enableGasOptimization: boolean;
  apiSecretKey?: string;
}

const DEFAULT_CONFIG: AppConfig = {
  network: {
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
    chainId: 1,
    timeoutMs: 10000,
    maxRetries: 3,
  },
  defaultSlippage: 0.5,
  enableGasOptimization: true,
};

/**
 * Loads and merges user configuration with crypto toolkit defaults.
 */
export class ConfigLoader {
  private currentConfig: AppConfig;

  constructor(overrides: Partial<AppConfig> = {}) {
    this.currentConfig = this.mergeConfig(DEFAULT_CONFIG, overrides);
  }

  private mergeConfig(base: AppConfig, overrides: Partial<AppConfig>): AppConfig {
    return {
      ...base,
      ...overrides,
      network: {
        ...base.network,
        ...(overrides.network || {}),
      },
    };
  }

  public getConfig(): Readonly<AppConfig> {
    return Object.freeze({ ...this.currentConfig });
  }

  public updateConfig(overrides: Partial<AppConfig>): AppConfig {
    this.currentConfig = this.mergeConfig(this.currentConfig, overrides);
    return this.getConfig();
  }

  public getRpcUrl(): string {
    return this.currentConfig.network.rpcUrl;
  }
}

export const defaultConfigLoader = new ConfigLoader();