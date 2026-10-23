import { readFileSync } from 'fs';

interface AppConfig {
  rpcUrl: string;
  chainId: number;
  maxRetries: number;
}

const DEFAULT_CONFIG: AppConfig = {
  rpcUrl: 'https://mainnet.infura.io/v3/default',
  chainId: 1,
  maxRetries: 3
};

/**
 * Loads configuration from file or returns environment defaults
 */
export function loadConfig(path?: string): AppConfig {
  try {
    if (!path) return DEFAULT_CONFIG;
    const fileData = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(fileData);
    
    return {
      ...DEFAULT_CONFIG,
      ...parsed
    };
  } catch (error) {
    console.error('Failed to load config, falling back to defaults:', error);
    return DEFAULT_CONFIG;
  }
}