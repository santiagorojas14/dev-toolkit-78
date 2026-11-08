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
 * Loads environment-based configuration with fallbacks
 */
export function loadConfig(path: string = './config.json'): AppConfig {
  try {
    const fileContent = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(fileContent);
    
    return {
      ...DEFAULT_CONFIG,
      ...parsed,
    };
  } catch (error) {
    console.warn('Configuration file not found, using default values');
    return { ...DEFAULT_CONFIG };
  }
}

export const config = loadConfig();