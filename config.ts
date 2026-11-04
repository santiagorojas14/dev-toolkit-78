import { readFileSync } from 'fs';

interface AppConfig {
  rpcUrl: string;
  chainId: number;
  timeout: number;
}

const DEFAULT_CONFIG: AppConfig = {
  rpcUrl: 'https://mainnet.infura.io/v3/default',
  chainId: 1,
  timeout: 5000
};

/**
 * loads configuration from json file with defaults
 */
export function loadConfig(path?: string): AppConfig {
  if (!path) return DEFAULT_CONFIG;

  try {
    const rawData = readFileSync(path, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(rawData);
    
    return {
      ...DEFAULT_CONFIG,
      ...parsed
    };
  } catch (err) {
    console.error('failed to load config, using defaults');
    return DEFAULT_CONFIG;
  }
}