import { readFileSync } from 'fs';

interface CryptoConfig {
  rpcUrl: string;
  chainId: number;
  timeoutMs: number;
}

const DEFAULT_CONFIG: CryptoConfig = {
  rpcUrl: 'https://mainnet.infura.io/v3/default',
  chainId: 1,
  timeoutMs: 5000,
};

/**
 * Merges local file config with environment defaults
 */
export function loadConfig(path?: string): CryptoConfig {
  try {
    if (!path) return DEFAULT_CONFIG;
    
    const fileContent = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(fileContent);
    
    return {
      ...DEFAULT_CONFIG,
      ...parsed
    };
  } catch (error) {
    console.warn('Failed to load config, falling back to defaults');
    return DEFAULT_CONFIG;
  }
}

export type { CryptoConfig };