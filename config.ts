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
 * Loads configuration from disk or returns defaults
 */
export function loadConfig(path?: string): AppConfig {
  try {
    if (!path) return DEFAULT_CONFIG;
    
    const fileContent = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(fileContent);
    
    return {
      ...DEFAULT_CONFIG,
      ...parsed,
    };
  } catch (error) {
    console.warn('Config load failed, using fallback values');
    return DEFAULT_CONFIG;
  }
}

export const config = loadConfig(process.env.CONFIG_PATH);