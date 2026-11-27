import { readFileSync } from 'fs';

interface AppConfig {
  rpcUrl: string;
  chainId: number;
  retryAttempts: number;
}

const DEFAULT_CONFIG: AppConfig = {
  rpcUrl: 'https://mainnet.infura.io/v3/default',
  chainId: 1,
  retryAttempts: 3,
};

/**
 * loads configuration from json file with defaults
 */
export function loadConfig(path: string): AppConfig {
  try {
    const fileContent = readFileSync(path, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(fileContent);
    
    return {
      ...DEFAULT_CONFIG,
      ...parsed
    };
  } catch (error) {
    console.warn('config file not found, using defaults');
    return { ...DEFAULT_CONFIG };
  }
}
